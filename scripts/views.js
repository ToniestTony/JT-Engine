var views={
	views:["Start"],
	viewsOpened:[true],
	updateButtons:false,
	offset:0,
	hoverScroll:false,
	taken:0,
	takenMax:120,
	nameError:"",
	lastOpenedOffset:0,
	buttonSelected:false,
	buttonText:"",
	btn1:undefined,
	btn2:undefined,
	btn3:undefined,
	viewsCam:{

	},

	setup:function(){
		this.updateButtons=true;

		this.viewsCam["Start"]={};

		this.viewsCam["Start"].x=view.camDefault.x
		this.viewsCam["Start"].y=view.camDefault.y
		this.viewsCam["Start"].w=view.camDefault.w
		this.viewsCam["Start"].h=view.camDefault.h
	},
	saveViewCam:function(){
		var name=view.view;

		this.viewsCam[name]={
			x:jt.cam().x,
			y:jt.cam().y,
			w:jt.cam().w,
			h:jt.cam().h
		}
	},
	update:function(){
		this.views.push("");
		if(jt.mX()<jt.pX(20) && jt.mY()>jt.pY(15)){
			if(jt.mS()<0){
				this.updateButtons=true;
				this.offset+=jt.pY(2);
			}
			if(jt.mS()>0){
				this.updateButtons=true;
				this.offset-=jt.pY(2);
			}

			//click to scroll
			if(jt.mX()>jt.pX(18) && (jt.mPress() || jt.mCheck())){
				var maxY=Math.abs(-(this.views.length-1)*jt.pY(4)+this.lastOpenedOffset)
				if(maxY!=0){
					var startY=jt.pY(18)
					var totalHeight=jt.pY(100)-startY;
					var totalBlocks=this.views.length-1
					var maxY1=Math.abs(-(this.views.length)*jt.pY(4)+this.lastOpenedOffset)
					var second=Math.abs((-jt.pY(2))/(maxY1-jt.pY(2)));
					var h=totalHeight*second;

					var percent=(jt.mY()-startY)/(totalHeight);

					var finalHeight=((totalBlocks)*jt.pY(4))-this.lastOpenedOffset;

					var finalY=percent*(finalHeight);

					this.offset=-finalY;

					this.updateButtons=true;
				}
			}

		}
		this.offset=jt.stay(this.offset,-(this.views.length-1)*jt.pY(4)+this.lastOpenedOffset,0)

		var currOffset=this.offset;
		for(var i=0;i<this.views.length;i++){
			var m={x:jt.mX(),y:jt.mY(),w:2,h:2};
			var v={x:jt.pX(0),y:jt.pY(18)+(jt.pY(4)*i)+currOffset,w:jt.pX(1.5),h:jt.pY(2)};
			if(jt.cRect(m,v)){
				if(jt.mPress() && jt.mY()>jt.pY(15)){
					this.viewsOpened[i]=!this.viewsOpened[i];
					this.updateButtons=true;
				}
			}
			if(this.viewsOpened[i]){
				var list=view.getObjects(this.views[i]);
				if(this.buttonText!=""){
					list=view.getObjects(this.views[i],this.buttonText,!this.buttonSelected);
				}
				currOffset+=list.length*jt.pY(2);
			}
		}
		this.lastOpenedOffset=(this.offset-currOffset);

		var currOffset=this.offset;
		for(var i=0;i<this.views.length;i++){
			if(this.viewsOpened[i]){
				var list=view.getObjects(this.views[i]);
				if(this.buttonText!=""){
					list=view.getObjects(this.views[i],this.buttonText,!this.buttonSelected);
				}
				var totalHeight=list.length*jt.pY(2);
				for(var j=0;j<list.length;j++){
					currOffset+=jt.pY(2);

					var obj={x:jt.pX(1.5),y:jt.pY(18)+(jt.pY(4)*i)+currOffset,w:jt.pX(16.5),h:jt.pY(2)}
					if(jt.kCheck("shift") && jt.mPress(obj.x,jt.pY(18)+(jt.pY(4)*i)+jt.pY(2),obj.w,totalHeight) && jt.mY()>jt.pY(15)){
						var allSelected=true;
						for(var k=0;k<list.length;k++){
							if(!view.objects[list[k]].selected){
								allSelected=false;
							}
						}
						
						if(allSelected){
							for(var k=0;k<list.length;k++){
								view.objects[list[k]].selected=false;
							}
						}else{
							for(var k=0;k<list.length;k++){
								view.objects[list[k]].selected=true;
							}
						}

						if(this.views[i]!=view.view){
							//open
							views.saveViewCam();
							if(view.tabs.indexOf(this.views[i])==-1){
								view.addTab(this.views[i]);
								view.currTab=this.views[i];
								view.view=this.views[i];
							}else{
								view.currTab=this.views[i];
								view.view=this.views[i];
							}
							view.resetView(this.views[i]);
						}
						break;
						this.updateButtons=true;
					}

					if(jt.mPress(obj.x,obj.y,obj.w,obj.h) && jt.mY()>jt.pY(15) && !jt.kCheck("shift")){
						if(jt.mX()>=jt.pX(16.5)){
							view.objects[list[j]].locked=!view.objects[list[j]].locked;
								
							var arr=[];
							var l1=!view.objects[list[j]].locked;
							var l2=view.objects[list[j]].locked;
							var id=view.objects[list[j]];
							arr.push({l1:l1,l2:l2,i:list[j]})

							view.actionsCurr[this.views[i]]++;
							view.actions[this.views[i]].splice(view.actionsCurr[this.views[i]]);
							view.actions[this.views[i]].push({
								action:"lock",
								objects:arr
							})
						}
						if(this.views[i]!=view.view){
							//open
							views.saveViewCam();
							if(view.tabs.indexOf(this.views[i])==-1){
								view.addTab(this.views[i]);
								view.currTab=this.views[i];
								view.view=this.views[i];
							}else{
								view.currTab=this.views[i];
								view.view=this.views[i];
							}
							view.resetView(this.views[i]);
						}
						if(!jt.kCheck("ctrl")){
							//unselected all the others
							for(var k=0;k<list.length;k++){
								if(k!=j){
									view.objects[list[k]].selected=false;
								}
							}
						}
						if(jt.mX()<jt.pX(16)){
							view.objects[list[j]].selected=!view.objects[list[j]].selected;
						}
					}
				}
			}
		}

		//update views
		if(this.updateButtons){
			this.updateButtons=false;

			//remove all views buttons
			for(var i=0;i<menu.buttons.length;i++){
				if(menu.buttons[i].action.substr(0,5)=="views"){
					menu.buttons.splice(i,1);
					i--;
				}
			}

			for(var i=0;i<menu.fields.length;i++){
				if(menu.fields[i].id.substr(0,5)=="views"){
					menu.fields.splice(i,1);
					i--;
				}
			}

			var currOffset=this.offset;
			for(var i=0;i<this.views.length;i++){
				if(i!=0 && i!=this.views.length-1){
					menu.fields.push(new Field(jt.pX(1.5),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(5.5),jt.pY(2),"views"+i,"",this.views[i]));

					menu.buttons.push(new Button(jt.pX(12.5),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(2.5),jt.pY(2),"viewsOpen"+i,false,"Open",""));
					menu.buttons.push(new Button(jt.pX(15),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(3),jt.pY(2),"viewsDel"+i,false,"Delete",""));
				}

				if(this.viewsOpened[i]){
					var list=view.getObjects(this.views[i]);
					if(this.buttonText!=""){
						list=view.getObjects(this.views[i],this.buttonText,!this.buttonSelected);
					}
					currOffset+=list.length*jt.pY(2);
					//jt.rect(jt.pX(2.5),jt.pY(18)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(15.5),jt.pY(2),bgRect);

				}
				if(i!=this.views.length-1){
					menu.buttons.push(new Button(jt.pX(0),jt.pY(20.25)+(jt.pY(4)*i)+currOffset,jt.pX(8),jt.pY(1.5),"viewsAdd"+(i+1),false,"Add view here",""));
				}
			}

		}
		
		var obj={x:jt.pX(4.5),y:jt.pY(15.37),w:jt.pX(4),h:jt.pY(2),select:true};
		if(jt.cRect(m,obj)){
			if(jt.mPress()){
				jt.mRelease();
				this.buttonSelected=!this.buttonSelected;
				this.updateButtons=true;
			}
		}
		
		this.btn1=obj;
		
		var obj2={x:jt.pX(9),y:jt.pY(15.37),w:jt.pX(8.5),h:jt.pY(2),select:false};
		
		if(jt.cRect(m,obj2)){
			if(jt.mPress()){
				jt.mRelease();
				var end="excluded";
				if(this.buttonSelected){
					end="included";
				}
				var text=prompt("Enter a tag to be "+end);
				if(text!=null){
					this.buttonText=text;
					this.updateButtons=true;
				}
			}
		}
		
		this.btn2=obj2;
		
		var obj3={x:jt.pX(18),y:jt.pY(15.37),w:jt.pX(1.5),h:jt.pY(2),select:false,text:"X"};
		
		if(jt.cRect(m,obj3)){
			if(jt.mPress()){
				jt.mRelease();
				this.buttonText="";
				this.updateButtons=true;
			}
		}
		
		this.btn3=obj3;
		
		this.views.splice(this.views.length-1,1);
	},
	drawButton:function(obj){
		//draw button
		this.buttonC="lightgrey";
		this.buttonCHover="lightblue";
		this.buttonCDown="DodgerBlue";
		this.buttonCSelected="blue";
		this.buttonCBg="grey";
		if(app.dark){
			this.buttonC="#444";
			this.buttonCHover="grey";
			this.buttonCDown="lightgrey";
			this.buttonCSelected="white";
			this.buttonCBg="black";
		}
		
		var c=this.buttonC;
		var m={x:jt.mX(),y:jt.mY(),w:2,h:2}
		if(jt.cRect(m,obj)){
			if(jt.mCheck()){
				c=this.buttonCDown;
			}else{
				c=this.buttonCHover;
			}
		}
		var bgC=this.buttonCBg;
		if(this.buttonSelected && obj.select){
			bgC=this.buttonCSelected
			if(c==this.buttonC){c=this.buttonCHover;}

		}
		
		jt.rect(obj.x,obj.y,obj.w,obj.h,c);
		jt.alpha(0.75);
		jt.rectB(obj.x,obj.y,obj.w,obj.h,bgC,0,2);
		jt.alpha(1);
		
		jt.font("Consolas",app.fontSize*0.75);
		
		jt.baseline("top");
		var y=obj.y+Math.ceil((obj.h-(app.fontSize*0.75))/2);
		
		var text="Exclude:";
		if(obj.text===undefined){
			if(obj.select){
				if(this.buttonSelected){
					text="Only:";
				}
			}else{
				if(this.buttonText===""){
					text="(Enter tag here)"
				}else{
					text=this.buttonText;
				}
				
			}
		}else{
			text=obj.text;
		}
		
		var cText="black";
		if(app.dark){cText="white";}
		jt.text(text,obj.x+obj.w/2,y,cText,"center");
	},
	draw:function(){
		this.views.push("");
		var cBg="lightgrey";
		var cBg2="white"
		var cText="black";
		if(app.dark){cBg="#444";cText="white";cBg2="black"}
		jt.font("Consolas",app.fontSize);
		jt.rect(0,jt.pY(15),jt.pX(20),jt.pY(85),cBg,0);
		jt.font("Consolas",app.fontSize*0.75);

		var currOffset=this.offset;
		for(var i=0;i<this.views.length;i++){
			jt.rect(jt.pX(0),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(18),jt.pY(2),cBg2);
			jt.rect(jt.pX(1.5),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(0.1),jt.pY(2),cText);
			var str="+";
			if(this.viewsOpened[i]){
				str="-";
			}
			var len=view.getObjects(this.views[i]).length;
			if(i==0 || i==this.views.length-1){
				if(i==this.views.length-1){
					jt.text(str+" \xa0(Objs in all views) ("+len+" objs)",jt.pX(0.5),jt.pY(18.25)+(jt.pY(4)*i)+currOffset,cText,"left")
				}else{
					jt.text(str+" \xa0"+this.views[i]+" ("+len+" objs)",jt.pX(0.5),jt.pY(18.25)+(jt.pY(4)*i)+currOffset,cText,"left")
				}
				
			}else{
				jt.text(str,jt.pX(0.5),jt.pY(18.25)+(jt.pY(4)*i)+currOffset,cText,"left")
				jt.text("("+len+" objs)",jt.pX(12.5),jt.pY(18.25)+(jt.pY(4)*i)+currOffset,cText,"right")
			}


			if(this.viewsOpened[i]){
				var list=view.getObjects(this.views[i]);
				if(this.buttonText!=""){
					list=view.getObjects(this.views[i],this.buttonText,!this.buttonSelected);
				}
				for(var j=0;j<list.length;j++){
					var objOffset=jt.pY(2)*(j+1);

					var type="Rect";
					var obj=view.objects[list[j]];
					if(obj.attr!=undefined){
						if(obj.attr.text!=undefined){
							type="Text";
						}else if(obj.attr.img!=undefined){
							type="Img ";
						}else if(obj.attr.anim!=undefined){
							type="Anim";
						}else if(obj.attr.shape!=undefined){
							if(obj.attr.shape=="circle"){type="Circ"};
							if(obj.attr.shape=="ellipse"){type="Elli"};
							if(obj.attr.shape=="line"){type="Line"};
						}
					}
					var bgRect="white";
					if(app.dark){bgRect="black"}
					if(view.objectHasScript(list[j])){
						bgRect="lightgreen";
						if(app.dark){bgRect="darkgreen"}
					}
					if(view.objects[list[j]].last){
						bgRect="gold";
						if(app.dark){bgRect="darkkhaki"}
					}
					if(inspector.selected.indexOf(list[j])!=-1){
						bgRect="lightblue";
						if(app.dark){bgRect="darkblue"}
					}
					jt.rect(jt.pX(1.5),jt.pY(18)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(16.5),jt.pY(2),bgRect);
					jt.text("("+type+")"+view.objects[list[j]].name,jt.pX(3),jt.pY(18.25)+(jt.pY(4)*i)+currOffset+objOffset,cText,"left")
					//Lock
					/*var str="Unlock";
					var cLock=cBg;
					if(view.objects[list[j]].locked){str="Lock";cLock=cText}
					if(jt.mIn(jt.pX(16),jt.pY(18.25)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(2),jt.pY(2))){
						cLock=cText;
						if(view.objects[list[j]].locked){cLock=cBg}
					}
					jt.text(str,jt.pX(18),jt.pY(18.25)+(jt.pY(4)*i)+currOffset+objOffset,cLock,"right")*/
					var img="JTElock";
					var alpha=false;
					if(!view.objects[list[j]].locked){
						img="JTEunlock";
						alpha=true;
					}
					if(jt.mIn(jt.pX(16.5),jt.pY(18)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(1.5),jt.pY(2))){
						alpha=false;
						if(view.objects[list[j]].locked){alpha=true}
					}
					if(alpha){
						jt.alpha(0.5);
					}
					jt.image(img,jt.pX(16.5),jt.pY(18)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(1.5),jt.pY(2));
					
					jt.alpha(1);
				}
				currOffset+=list.length*jt.pY(2);
			}
		}
		var startY=jt.pY(18)
		var totalHeight=jt.pY(100)-startY;

		//bg scroll bar
		if(jt.mX()>=jt.pX(18) && jt.mX()<=jt.pX(20) && jt.mY()>startY){
			jt.rect(jt.pX(18),startY,jt.pX(2),totalHeight,"darkgrey")
		}

		//scroll bar
		var totalBlocks=(this.views.length*2)+view.getObjects(this.views[i]).length;
		var maxY=Math.abs(-(this.views.length-1)*jt.pY(4)+this.lastOpenedOffset)
		var maxY1=Math.abs(-(this.views.length)*jt.pY(4)+this.lastOpenedOffset)
		if(maxY==0){
			jt.rect(jt.pX(18),jt.pY(18),jt.pX(2),jt.pY(82),"grey")
		}else{
			var scroll=Math.abs((this.offset)/(maxY1-jt.pY(2)));
			var second=Math.abs((-jt.pY(2))/(maxY1-jt.pY(2)));
			var h=totalHeight*second;

			jt.rect(jt.pX(18),jt.pY(18)+(totalHeight*scroll),jt.pX(2),h,"grey")
		}


		this.views.splice(this.views.length-1,1);
	},
};
