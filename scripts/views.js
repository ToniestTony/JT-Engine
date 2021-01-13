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
	
	setup:function(){
		this.updateButtons=true;
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
			var v={x:jt.pX(1),y:jt.pY(18)+(jt.pY(4)*i)+currOffset,w:jt.pX(1.5),h:jt.pY(2)};
			if(jt.cRect(m,v)){
				if(jt.mPress() && jt.mY()>jt.pY(15)){
					this.viewsOpened[i]=!this.viewsOpened[i];
					this.updateButtons=true;
				}
			}
			if(this.viewsOpened[i]){
				var list=view.getObjects(this.views[i]);
				currOffset+=list.length*jt.pY(2);
			}
		}
		this.lastOpenedOffset=(this.offset-currOffset);
		
		var currOffset=this.offset;
		for(var i=0;i<this.views.length;i++){
			if(this.viewsOpened[i]){
				var list=view.getObjects(this.views[i]);
				var totalHeight=list.length*jt.pY(2);
				for(var j=0;j<list.length;j++){
					currOffset+=jt.pY(2);
					
					var obj={x:jt.pX(2.5),y:jt.pY(18)+(jt.pY(4)*i)+currOffset,w:jt.pX(15.5),h:jt.pY(2)}
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
							if(view.tabs.indexOf(this.views[i])==-1){
								view.addTab(this.views[i]);
								view.currTab=this.views[i];
								view.view=this.views[i];
							}else{
								view.currTab=this.views[i];
								view.view=this.views[i];
							}
							view.resetView();
						}
					}
					
					if(jt.mPress(obj.x,obj.y,obj.w,obj.h) && jt.mY()>jt.pY(15) && !jt.kCheck("shift")){
						
						if(this.views[i]!=view.view){
							//open
							if(view.tabs.indexOf(this.views[i])==-1){
								view.addTab(this.views[i]);
								view.currTab=this.views[i];
								view.view=this.views[i];
							}else{
								view.currTab=this.views[i];
								view.view=this.views[i];
							}
							view.resetView();
						}
						if(!jt.kCheck("ctrl")){
							//unselected all the others
							for(var k=0;k<list.length;k++){
								if(k!=j){
									view.objects[list[k]].selected=false;
								}
							}
						}
						view.objects[list[j]].selected=!view.objects[list[j]].selected;
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
					menu.fields.push(new Field(jt.pX(2.5),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(9.5),jt.pY(2),"views"+i,"",this.views[i]));
					
					menu.buttons.push(new Button(jt.pX(12),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(3),jt.pY(2),"viewsOpen"+i,false,"Open",""));
					menu.buttons.push(new Button(jt.pX(15),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(3),jt.pY(2),"viewsDel"+i,false,"Delete",""));
				}
				
				if(this.viewsOpened[i]){
					var list=view.getObjects(this.views[i]);
					currOffset+=list.length*jt.pY(2);
					//jt.rect(jt.pX(2.5),jt.pY(18)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(15.5),jt.pY(2),bgRect);
					
				}
				if(i!=this.views.length-1){
					menu.buttons.push(new Button(jt.pX(1),jt.pY(20.25)+(jt.pY(4)*i)+currOffset,jt.pX(9),jt.pY(1.5),"viewsAdd"+(i+1),false,"Add view here",""));
				}
			}
		
		}
		this.views.splice(this.views.length-1,1);
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
			jt.rect(jt.pX(1),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(17),jt.pY(2),cBg2);
			jt.rect(jt.pX(2.5),jt.pY(18)+(jt.pY(4)*i)+currOffset,jt.pX(0.1),jt.pY(2),cText);
			var str="+";
			if(this.viewsOpened[i]){
				str="-";
			}
			if(i==0 || i==this.views.length-1){
				if(i==this.views.length-1){
					str+=" \xa0(Objects in all views)"
				}
				jt.text(str+" \xa0"+this.views[i],jt.pX(1.5),jt.pY(18.25)+(jt.pY(4)*i)+currOffset,cText,"left")
			}else{
				jt.text(str,jt.pX(1.5),jt.pY(18.25)+(jt.pY(4)*i)+currOffset,cText,"left")
			}
			
			
			if(this.viewsOpened[i]){
				var list=view.getObjects(this.views[i]);
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
						}
					}
					var bgRect="white";
					if(app.dark){bgRect="black"}
					if(view.objectHasScript(list[j])){
						bgRect="lightgreen";
						if(app.dark){bgRect="darkgreen"}
					}
					if(inspector.selected.indexOf(list[j])!=-1){
						bgRect="lightblue";
						if(app.dark){bgRect="darkblue"}
					}
					jt.rect(jt.pX(2.5),jt.pY(18)+(jt.pY(4)*i)+currOffset+objOffset,jt.pX(15.5),jt.pY(2),bgRect);
					jt.text("("+type+")"+view.objects[list[j]].name,jt.pX(4),jt.pY(18.25)+(jt.pY(4)*i)+currOffset+objOffset,cText,"left")
				}
				currOffset+=list.length*jt.pY(2);
			}
		}
		var startY=jt.pY(18)
		var totalHeight=jt.pY(100)-startY;
		
		//bg scroll bar
		if(jt.mX()>=jt.pX(19) && jt.mX()<=jt.pX(20) && jt.mY()>startY){
			jt.rect(jt.pX(19),startY,jt.pX(1),totalHeight,"darkgrey")
		}
		
		//scroll bar
		var totalBlocks=(this.views.length*2)+view.getObjects(this.views[i]).length;
		var maxY=Math.abs(-(this.views.length-1)*jt.pY(4)+this.lastOpenedOffset)
		var maxY1=Math.abs(-(this.views.length)*jt.pY(4)+this.lastOpenedOffset)
		if(maxY==0){
			jt.rect(jt.pX(19),jt.pY(18),jt.pX(1),jt.pY(82),"grey")
		}else{
			var scroll=Math.abs((this.offset)/(maxY1-jt.pY(2)));
			var second=Math.abs((-jt.pY(2))/(maxY1-jt.pY(2)));
			var h=totalHeight*second;
			
			jt.rect(jt.pX(19),jt.pY(18)+(totalHeight*scroll),jt.pX(1),h,"grey")
		}
		
		
		this.views.splice(this.views.length-1,1);
	},

};
