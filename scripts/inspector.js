var inspector={
	lastSelected:0,
	selected:[],
	taken:0,
	takenMax:120,
	closeEditor:0,
	closeEditorMax:120,
	nameError:"",
	fields:{
		insName:0,
		insX:0,
		insY:0,
		insW:0,
		insH:0,
		insA:0,
		insR:0,
		insRR:0,
		insGG:0,
		insBB:0,
		insLineW:0,
		insImg:0,
		insSX:0,
		insSY:0,
		insSW:0,
		insSH:0,
		insAnim:0,
		insText:0,
		insSize:0,
		insFont:0,
		insOrder:0,
		insTags:0,
		insView:0,
	},
	insToVal:{
		insName:"name",
		insX:"x",
		insY:"y",
		insW:"w",
		insH:"h",
		insA:"alpha",
		insR:"r",
		insRR:"rr",
		insGG:"gg",
		insBB:"bb",
		insLineW:"lineW",
		insImg:"img",
		insSX:"sX",
		insSY:"sY",
		insSW:"sW",
		insSH:"sH",
		insAnim:"anim",
		insText:"text",
		insSize:"size",
		insFont:"font",
		insOrder:"x",
		insTags:"tags",
		insView:"view",
		insCam:"cam",
		insLast:"last"
	},
	color:undefined,
    onColor:false,
	picker:[0,0,0,1],
	pickerY:-2,
	rgba:[255,0,0,1],
	bgBlack:false,
	
	tileset:false,
	tileOffX:0,
	tileOffY:0,
	tileW:8,
	tileH:8,
	tileTags:[""],
	tileX:0,
	tileY:0,
	tileSize:1,
	tileDiv:4,
	tileLock:false,
	tileFields:[
		"tileOffX",
		"tileOffY",
		"tileW",
		"tileH",
		"tileX",
		"tileY",
		"tileSize",
	],
	
	tileTimer:60,
	
	tileReset:function(){
		if(menu.uploadsImage.length>0){
			var img=jt.images()[menu.uploadsImage[menu.uploadImageNum].name];
			var w=img.img.naturalWidth;
			var h=img.img.naturalHeight;
			this.tileW=jt.floor(w/this.tileDiv);
			this.tileH=jt.floor(h/this.tileDiv);
		}
	},
	
	setup:function(){
		menu.fields.push(new Field(jt.pX(84),jt.pY(18),jt.pX(15),jt.pY(2),"insName","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(42),jt.pX(5),jt.pY(2),"insX","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(42),jt.pX(5),jt.pY(2),"insY","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(45),jt.pX(5),jt.pY(2),"insW","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(45),jt.pX(5),jt.pY(2),"insH","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(53),jt.pX(2),jt.pY(2),"insA","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(56),jt.pX(2),jt.pY(2),"insR","",""));

		//rgb
		menu.fields.push(new Field(jt.pX(84),jt.pY(60),jt.pX(5),jt.pY(2),"insRR","",""));
		menu.fields.push(new Field(jt.pX(89),jt.pY(60),jt.pX(5),jt.pY(2),"insGG","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(60),jt.pX(5),jt.pY(2),"insBB","",""));

		menu.fields.push(new Field(jt.pX(84),jt.pY(63),jt.pX(3),jt.pY(2),"insOrder","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(66),jt.pX(15),jt.pY(2),"insView","",""));
		//menu.fields.push(new Field(jt.pX(94),jt.pY(60),jt.pX(4),jt.pY(2),"insCam","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(69),jt.pX(15),jt.pY(2),"insTags","",""));


		menu.fields.push(new Field(jt.pX(84),jt.pY(72),jt.pX(15),jt.pY(10),"insText","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(86),jt.pX(5),jt.pY(2),"insSize","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(86),jt.pX(5),jt.pY(2),"insFont","",""));
		//menu.fields.push(new Field(jt.pX(84),jt.pY(60),jt.pX(2),jt.pY(2),"insAlign","",""));
        
        menu.fields.push(new Field(jt.pX(84),jt.pY(72),jt.pX(15),jt.pY(2),"insLineW","",""));
        
        menu.fields.push(new Field(jt.pX(84),jt.pY(72),jt.pX(8),jt.pY(2),"insImg","",""));
		
        menu.fields.push(new Field(jt.pX(84),jt.pY(76),jt.pX(2.5),jt.pY(2),"insSX","",""));
        menu.fields.push(new Field(jt.pX(84),jt.pY(79),jt.pX(2.5),jt.pY(2),"insSY","",""));
        menu.fields.push(new Field(jt.pX(84),jt.pY(82),jt.pX(2.5),jt.pY(2),"insSW","",""));
        menu.fields.push(new Field(jt.pX(84),jt.pY(85),jt.pX(2.5),jt.pY(2),"insSH","",""));
		
        menu.fields.push(new Field(jt.pX(84),jt.pY(72),jt.pX(15),jt.pY(2),"insAnim","",""));

		for(var i=0;i<menu.fields.length;i++){
			if(this.fields.hasOwnProperty(menu.fields[i].id)){
				this.fields[menu.fields[i].id]=i;
			}
		}

		//x,y,w,h,action,trigger,text,tab,key,key2
		menu.buttons.push(new Button(jt.pX(97),jt.pY(18),jt.pX(2),jt.pY(2),"insClear",false,"X",""))
		menu.buttons.push(new Button(jt.pX(81),jt.pY(80),jt.pX(2),jt.pY(2),"insClearText",false,"X",""))
		menu.buttons.push(new Button(jt.pX(90.5),jt.pY(63),jt.pX(2.5),jt.pY(2),"insLast",false,"false",""))
		menu.buttons.push(new Button(jt.pX(96.5),jt.pY(63),jt.pX(2.5),jt.pY(2),"insCam",false,"False",""))
		menu.buttons.push(new Button(jt.pX(81),jt.pY(91),jt.pX(18),jt.pY(8),"insEditor",false,"Open code editor",""))
		menu.buttons.push(new Button(jt.pX(84),jt.pY(83),jt.pX(5),jt.pY(2),"insAlignLeft",false,"Left",""))
		menu.buttons.push(new Button(jt.pX(89),jt.pY(83),jt.pX(5),jt.pY(2),"insAlignCenter",false,"Center",""))
		menu.buttons.push(new Button(jt.pX(94),jt.pY(83),jt.pX(5),jt.pY(2),"insAlignRight",false,"Right",""))
		
		menu.fields.push(new Field(jt.pX(84),jt.pY(63),jt.pX(5),jt.pY(2),"tileSize","",""));
		menu.buttons.push(new Button(jt.pX(94),jt.pY(63),jt.pX(5),jt.pY(2),"tileLock",false,"False",""))
		menu.fields.push(new Field(jt.pX(84),jt.pY(66),jt.pX(5),jt.pY(2),"tileOffX","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(66),jt.pX(5),jt.pY(2),"tileOffY","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(69),jt.pX(5),jt.pY(2),"tileW","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(69),jt.pX(5),jt.pY(2),"tileH","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(72),jt.pX(15),jt.pY(2),"tileTags","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(75),jt.pX(5),jt.pY(2),"tileX","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(75),jt.pX(5),jt.pY(2),"tileY","",""));
		

		this.grad=jt.canvas.ctx.createLinearGradient(0,jt.pY(49),0,jt.pY(9+49));
		this.grad.addColorStop(0, 'rgba(255, 0, 0, 1)');
		this.grad.addColorStop(0.05, 'rgba(255, 0, 0, 1)');
		this.grad.addColorStop(0.20, 'rgba(255, 255, 0, 1)');
		this.grad.addColorStop(0.35, 'rgba(0, 255, 0, 1)');
		this.grad.addColorStop(0.50, 'rgba(0, 255, 255, 1)');
		this.grad.addColorStop(0.65, 'rgba(0, 0, 255, 1)');
		this.grad.addColorStop(0.80, 'rgba(255, 0, 255, 1)');
		this.grad.addColorStop(0.95, 'rgba(255, 0, 0, 1)');
		this.grad.addColorStop(1, 'rgba(255, 0, 0, 1)');
		this.pickerY=jt.pY(49);

		this.gradW=jt.canvas.ctx.createLinearGradient(jt.pX(87),0,jt.pX(87+9),0);
		this.gradW.addColorStop(0, 'rgba(255, 255, 255, 1)');
		this.gradW.addColorStop(0.1, 'rgba(255, 255, 255, 1)');
		this.gradW.addColorStop(0.9, 'rgba(255, 255, 255, 0)');
		this.gradW.addColorStop(1, 'rgba(255, 255, 255, 0)');

		this.gradB=jt.canvas.ctx.createLinearGradient(0,jt.pY(49),0,jt.pY(9+49));
		this.gradB.addColorStop(0, 'rgba(0, 0, 0, 0)');
		this.gradB.addColorStop(0.1, 'rgba(0, 0, 0, 0)');
		this.gradB.addColorStop(0.9, 'rgba(0, 0, 0, 1)');
		this.gradB.addColorStop(1, 'rgba(0, 0, 0, 1)');
	},
	update:function(){

		this.selected=[]
		for(var i=0;i<view.objects.length;i++){
			if(view.objects[i].view==view.view || view.objects[i].view==""){
				if(view.objects[i].selected){
					this.selected.push(i);
				}
			}
		}

		var show={x:jt.pX(80),y:jt.pY(21),w:jt.pX(20),h:jt.pY(20),cam:false}
		if(jt.mPress(show)){
			this.bgBlack=!this.bgBlack;
		}
		
		if(this.selected.length>=1){
			if(jt.kCheck("ctrl") && jt.kPress("l")){
				for(var i=0;i<this.selected.length;i++){
					view.objects[this.selected[i]].locked=!view.objects[this.selected[i]].locked;
				}
			}
			views.updateButtons=true;
		}

		if(this.selected.length==1 && !this.tileset){
			//color picker
			this.picker=undefined;
			if(jt.mX()>=jt.pX(87) && jt.mX()<=jt.pX(99) && jt.mY()>=jt.pY(49) && jt.mY()<=jt.pY(49+9)){
				this.onColor=true;
				if(jt.mCheck()){
					if(jt.mX()<=jt.pX(96)){
						var img=jt.canvas.ctx.getImageData(jt.mX()*app.pR,jt.mY()*app.pR,1,1).data;
						this.picker=[img[0],img[1],img[2],1];
						
						//add color event
						if(JSON.stringify(view.objects[inspector.selected[0]].c)!=JSON.stringify(this.picker)){
							var arr=[];
							var c1=view.objects[inspector.selected[0]].c;
							var c2=this.picker;
							var id=inspector.selected[0];
							arr.push({c1:c1,c2:c2,i:id})

							view.actionsCurr[view.view]++;
							view.actions[view.view].splice(view.actionsCurr[view.view]);
							view.actions[view.view].push({
								action:"color",
								objects:arr
							}) 
						}
						
						if(this.selected.length==1){
							view.objects[inspector.selected[0]].c=this.picker;
						}
					}else if(jt.mX()>=jt.pX(97)){
						var img=jt.canvas.ctx.getImageData(jt.mX()*app.pR,jt.mY()*app.pR,1,1).data;
						this.rgba=[img[0],img[1],img[2],1];
						this.pickerY=jt.mY();
					}
				}
			}else{
				this.onColor=false;
			}
		}else{
			this.onColor=false;
			
		}
		
		jt.checkAlarm("tile",true);
		jt.checkAlarm("tileBoth",true);
		if(this.tileset){
			if(menu.uploadsImage.length>0){
				if(menu.writing==-1){
					for(var i=1;i<=9;i++){
						if(jt.kPress(i)){
							if(jt.isAlarm("tile")){
								this.tileY=i-1;
								jt.delAlarm("tile",this.tileTimer);
								jt.alarm("tileBoth",this.tileTimer);
							}else{
								this.tileX=i-1;
								jt.alarm("tile",this.tileTimer);
							}
							
						}
					}
				}
				
				
				
				var name=menu.uploadsImage[menu.uploadImageNum].name;
				var img=jt.images()[name];
				
				if(this.tileSize<=0){this.tileSize=1}
				
				if(this.tileOffX>img.img.naturalWidth){this.tileOffX=img.img.naturalWidth}
				if(this.tileOffY>img.img.naturalHeight){this.tileOffY=img.img.naturalHeight}
				
				if(this.tileW<1){this.tileW=1}
				if(this.tileH<1){this.tileH=1}
				if(this.tileW>img.img.naturalWidth){this.tileW=img.img.naturalWidth}
				if(this.tileH>img.img.naturalHeight){this.tileH=img.img.naturalHeight}
				
				if(this.tileX<0){this.tileX=0;}
				if(this.tileX*this.tileW+this.tileOffX>=img.img.naturalWidth){
					while(this.tileX*this.tileW+this.tileOffX>=img.img.naturalWidth){
						if((this.tileX/2)*this.tileW+this.tileOffX>=img.img.naturalWidth){
							this.tileX=jt.floor(this.tileX/2);
						}
						this.tileX--;
					}
				}
				
				if(this.tileY<0){this.tileY=0;}
				if(this.tileY*this.tileH+this.tileOffY>=img.img.naturalHeight){
					while(this.tileY*this.tileH+this.tileOffY>=img.img.naturalHeight){
						if((this.tileY/2)*this.tileH+this.tileOffY>=img.img.naturalHeight){
							this.tileY=jt.floor(this.tileY/2);
						}
						this.tileY--;
					}
				}
				
				if(menu.writing==-1){
					for(var i=0;i<this.tileFields.length;i++){
						menu.getField(this.tileFields[i]).text=this[this.tileFields[i]].toString();
					}
					menu.getField("tileTags").text=JSON.stringify(this.tileTags);
				}
				
			}
		}
	},
	draw:function(){
		
		var ratioCam=jt.w()/jt.cam().w;

		var cBg="white";
		var cText="black";
		var cGrey="lightGrey";
		if(app.dark){cBg="#444";cGrey="black";cText="white"}
		jt.rect(jt.pX(80),jt.pY(15),jt.pX(20),jt.pY(85),cBg);
		jt.rectB(jt.pX(80),jt.pY(15),jt.pX(20),jt.pY(85),"black",0,2);
		jt.font("Consolas",app.fontSize);
		
		var rect={x:jt.pX(90)+1,y:jt.pY(15),w:jt.pX(10)-2,h:jt.pY(3),c:cGrey};
		if(this.tileset){rect.x=jt.pX(80)+1}
		if(jt.mIn(rect)){
			rect.c=cBg;
			if(jt.mPress()){
				this.tileset=!this.tileset;
				if(this.tileset){
					view.mouseState="";
					view.mouseNew="";
					var removeActions=["newRect","newText","newCircle","newEllipse","newLine","newImg","newAnim"];
					for(var j=0;j<menu.buttons.length;j++){
						if(removeActions.indexOf(menu.buttons[j].action)!=-1){
							menu.buttons[j].selected=false;
						}
					}
				}
			}
		}
		if(this.tileset){rect.x=jt.pX(80)+1}
		jt.rect(rect.x,rect.y,rect.w,rect.h,rect.c)
		jt.text("Inspector",jt.pX(100-15),jt.pY(15.5),cText,"center");
		jt.rect(jt.pX(90),jt.pY(15),jt.pX(0.1),jt.pY(3))
		jt.text("Tileset",jt.pX(100-5),jt.pY(15.5),cText,"center");
		
		if(this.bgBlack){
			jt.rect(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cText)
			jt.rectB(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cText,0,2)
		}else{
			jt.rect(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cBg)
			jt.rectB(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cText,0,2)
		}
		
		var inspectorWH=jt.pX(20)/jt.pY(20);
		
		if(!this.tileset){

			if(this.selected.length!=1){
				if(this.bgBlack){
					jt.text("Select 1 object to inspect it",jt.pX(90),jt.pY(30),cBg,"center");
				}else{
					jt.text("Select 1 object to inspect it",jt.pX(90),jt.pY(30),cText,"center");
				}
				
				jt.text("Once selected, hold Ctrl",jt.pX(90),jt.pY(42),cText,"center");
				jt.text("and press L to lock/unlock",jt.pX(90),jt.pY(44),cText,"center");
				
				
				
				for (var field in this.fields) {
					if (Object.prototype.hasOwnProperty.call(this.fields, field)) {
						menu.fields[this.fields[field]].text="";
					}
				}
				this.color=undefined;
			}else{
				if(this.lastSelected!=this.selected[0]){
					for (var field in this.fields) {
						if (Object.prototype.hasOwnProperty.call(this.fields, field)) {
							menu.fields[this.fields[field]].text="";
						}
					}
					this.color=undefined;
				}
				this.lastSelected=this.selected[0];
				for (var field in this.fields) {
					if (Object.prototype.hasOwnProperty.call(this.fields, field)) {
						if(menu.writing!=this.fields[field]){
							var toString=true;
							if(field=="insName" || field=="insView"){toString=false;}
							if(field=="insText"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.text!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["text"];
									}

								}

							}else if(field=="insSize"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.size!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["size"].toString();
									}
								}
								
							}else if(field=="insFont"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.font!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["font"];
									}
								}

							}else if(field=="insLineW"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.lineW!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["lineW"].toString();
									}
								}

							}else if(field=="insImg"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.img!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["img"];
									}
								}
								
							}else if(field=="insSX"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.sX!=undefined){
										
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["sX"].toString();
									}
								}
							}else if(field=="insSY"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.sY!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["sY"].toString();
									}
								}
							}else if(field=="insSW"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.sW!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["sW"].toString();
									}
								}
							}else if(field=="insSH"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.sH!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["sH"].toString();
									}
								}

							}else if(field=="insAnim"){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.anim!=undefined){
										menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["attr"]["anim"];
									}
								}

							}else if(field=="insOrder"){
								menu.fields[this.fields[field]].text=inspector.selected[0].toString();

							}else if(field=="insRR"){
								menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["c"][0].toString();

							}else if(field=="insGG"){
								menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["c"][1].toString();

							}else if(field=="insBB"){
								menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]]["c"][2].toString();

							}else if(field=="insTags"){
								menu.fields[this.fields[field]].text=JSON.stringify(view.objects[inspector.selected[0]].tags);

							}else{
								if(toString){
									menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]][this.insToVal[field]].toString();
								}else{
									menu.fields[this.fields[field]].text=view.objects[inspector.selected[0]][this.insToVal[field]].toString();
								}
							}

						}
					}
				}
				if(this.color==undefined){this.color=view.objects[inspector.selected[0]].c}
				if(this.picker!=undefined){this.color=this.picker}
				var c=this.color;
				var inv="black";
				if(Array.isArray(c)){
					inv=[255-c[0],255-c[1],255-c[2],1]
					if(inv[0]>=200 && inv[1]>=200 && inv[2]>=200){
						inv=[255,0,0,1];
					}
				}

				//draw the objects inside preview
				var obj=view.objects[this.selected[0]];
				var old={x:obj.x,y:obj.y,w:obj.w,h:obj.h};
				var resized={x:jt.pX(80),y:jt.pY(21),w:obj.w,h:obj.h};
				var ratioW=obj.w/(obj.h);
				var text=false;
				if(obj.attr!=undefined){
					if(obj.attr.text!=undefined){
						text=true;
					}
				}
				
				if(ratioW/inspectorWH>1){
					resized.w=jt.pX(20);
					resized.h=resized.w/ratioW;
					if(text){resized.h=jt.pY(20)}
					resized.x=jt.pX(80)+((jt.pX(20)-resized.w)/2);
					resized.y=jt.pY(21)+((jt.pY(20)-resized.h)/2);
				}else{
					resized.h=jt.pY(20);
					resized.w=resized.h*ratioW;
					if(text){
						resized.w=jt.pX(20);
					}
					resized.x=jt.pX(80)+((jt.pX(20)-resized.w)/2);
					resized.y=jt.pY(21)+((jt.pY(20)-resized.h)/2);
				}

				view.objects[this.selected[0]].x=resized.x;
				view.objects[this.selected[0]].y=resized.y;
				view.objects[this.selected[0]].w=resized.w;
				view.objects[this.selected[0]].h=resized.h;
				
				if(text){
					var obj=view.objects[this.selected[0]]
					var textX=jt.pX(80);
					if(obj.attr.align=="center"){
						textX=jt.pX(90)
					}else if(obj.attr.align=="right"){
						textX=jt.pX(100)
					}
					jt.text(obj.attr.text,textX,jt.pY(21),obj.c,obj.attr.align,jt.fontSize(20),0,30,20);
				}else{
					view.drawObject(view.objects[this.selected[0]],false);
				}
				

				view.objects[this.selected[0]].x=old.x;
				view.objects[this.selected[0]].y=old.y;
				view.objects[this.selected[0]].w=old.w;
				view.objects[this.selected[0]].h=old.h;



				//draw labels
				jt.font("Consolas",app.fontSize*0.75);
				jt.text("Name: ",jt.pX(84),jt.pY(18),cText,"right");
				if(this.taken>0){
					this.taken--;
					var text="Name is "+this.nameError;
					if(this.nameError=="editor"){
						text="Close editor first"
					}
					if(this.taken<this.takenMax/2){
						jt.alpha(this.taken/(this.takenMax/2));
						jt.text(text,jt.pX(90),jt.pY(16.5),"red","center");
						jt.alpha(1);
					}else{
						jt.text(text,jt.pX(90),jt.pY(16.5),"red","center");
					}
				}

				if(this.closeEditor>0){
					this.closeEditor--;
					if(this.closeEditor<this.closeEditorMax/2){
						jt.alpha(this.closeEditor/(this.closeEditorMax/2));
						jt.text("Close code editor",jt.pX(84),jt.pY(58.5),"red","left");
						jt.alpha(1);
					}else{
						jt.text("Close code editor",jt.pX(84),jt.pY(58.5),"red","left");
					}
				}

				jt.text("X: ",jt.pX(84),jt.pY(42),cText,"right");
				jt.text("Y: ",jt.pX(94),jt.pY(42),cText,"right");
				jt.text("Width: ",jt.pX(84),jt.pY(45),cText,"right");
				jt.text("Height: ",jt.pX(94),jt.pY(45),cText,"right");

				//color
				jt.text("Color: ",jt.pX(84),jt.pY(49.5),cText,"right");
				jt.text("Alpha: ",jt.pX(84),jt.pY(53),cText,"right");
				jt.text("Rotate: ",jt.pX(84),jt.pY(56),cText,"right");

				jt.rect(jt.pX(84),jt.pY(49),jt.pX(2)-2,jt.pY(3)-1,this.color)
				jt.rectB(jt.pX(84),jt.pY(49),jt.pX(2)-2,jt.pY(3)-1,inv,0,2)

				jt.rect(jt.pX(87),jt.pY(49),jt.pX(9),jt.pY(9),this.rgba)
				jt.rect(jt.pX(87),jt.pY(49),jt.pX(9),jt.pY(9),this.gradW)
				jt.rect(jt.pX(87),jt.pY(49),jt.pX(9),jt.pY(9),this.gradB)
				jt.rectB(jt.pX(87),jt.pY(49),jt.pX(9),jt.pY(9),cText,0,1)

				jt.rect(jt.pX(96.5),this.pickerY-jt.pY(0.25),jt.pX(3),jt.pY(0.5),"black")
				jt.rect(jt.pX(97),jt.pY(49),jt.pX(2),jt.pY(9),this.grad)
				jt.rectB(jt.pX(97),jt.pY(49),jt.pX(2),jt.pY(9),cText,0,1)

				jt.text("RGB: ",jt.pX(84),jt.pY(60),cText,"right");


				jt.text("Order: ",jt.pX(84),jt.pY(63),cText,"right");
				jt.text("Last: ",jt.pX(90.5),jt.pY(63),cText,"right");
				jt.text("Cam: ",jt.pX(96.5),jt.pY(63),cText,"right");
				jt.text("View: ",jt.pX(84),jt.pY(66),cText,"right");
				jt.text("Tags: ",jt.pX(84),jt.pY(69),cText,"right");

				if(view.objects[this.selected[0]].attr!=undefined){
					if(view.objects[this.selected[0]].attr.text!=undefined){
						jt.text("Text: ",jt.pX(84),jt.pY(72),cText,"right");
						jt.text("Align: ",jt.pX(84),jt.pY(83),cText,"right");
						jt.text("Size: ",jt.pX(84),jt.pY(86),cText,"right");
						jt.text("Font: ",jt.pX(94),jt.pY(86),cText,"right");
					}
				}
				
				if(view.objects[this.selected[0]].attr!=undefined){
					if(view.objects[this.selected[0]].attr.lineW!=undefined){
						jt.text("LineW: ",jt.pX(84),jt.pY(72),cText,"right");
					}
				}
				
				if(view.objects[this.selected[0]].attr!=undefined){
					if(view.objects[this.selected[0]].attr.img!=undefined){
						jt.text("Img: ",jt.pX(84),jt.pY(72),cText,"right");
						jt.text("Src X: ",jt.pX(84),jt.pY(76.25),cText,"right");
						jt.text("Src Y: ",jt.pX(84),jt.pY(79.25),cText,"right");
						jt.text("Src W: ",jt.pX(84),jt.pY(82.25),cText,"right");
						jt.text("Src H: ",jt.pX(84),jt.pY(85.25),cText,"right");
						var img=jt.images()[view.objects[this.selected[0]].attr.img];
						if(img!=undefined){
							var w=img.img.naturalWidth;
							var h=img.img.naturalHeight;
							jt.text(w+"/"+h+" px",jt.pX(92.5),jt.pY(72),cText,"left");
							
							jt.text("/"+w,jt.pX(87),jt.pY(76.25),cText,"left");
							jt.text("/"+h,jt.pX(87),jt.pY(79.25),cText,"left");
							jt.text("/"+w,jt.pX(87),jt.pY(82.25),cText,"left");
							jt.text("/"+h,jt.pX(87),jt.pY(85.25),cText,"left");
							
							var attr=view.objects[this.selected[0]].attr;
							
							var actualW=jt.pX(8);
							var actualH=jt.pY(13.5);
							
							var newX=(attr.sX/w)*actualW;
							var newY=(attr.sY/h)*actualH;
							var newW=(attr.sW/w)*actualW;
							var newH=(attr.sH/h)*actualH;
							
							//draw image and source cutoff
							jt.image(attr.img,jt.pX(90.5),jt.pY(75),actualW,actualH)
							
							jt.rect(jt.pX(90.5),jt.pY(75),actualW,actualH,[0,0,0,0.5])
							
							jt.clipRect(jt.pX(90.5),jt.pY(75),actualW,actualH);
							jt.rect(jt.pX(90.5)+newX,jt.pY(75)+newY,newW,newH,[255,255,255])
							jt.unclip();
							
							jt.image(attr.img,jt.pX(90.5)+newX,jt.pY(75)+newY,newW,newH,0,attr.sX,attr.sY,attr.sW,attr.sH)
						}
						
					}
				}
				
				if(view.objects[this.selected[0]].attr!=undefined){
					if(view.objects[this.selected[0]].attr.anim!=undefined){
						jt.text("Anim: ",jt.pX(84),jt.pY(72),cText,"right");
					}
				}

			}
		}else{
			if(menu.uploadsImage.length==0){
				if(this.bgBlack){
					jt.text("Upload an image",jt.pX(90),jt.pY(30),cBg,"center");
				}else{
					jt.text("Upload an image",jt.pX(90),jt.pY(30),cText,"center");
				}
			}else{
				jt.camActive(false);
				var name=menu.uploadsImage[menu.uploadImageNum].name;
				var img=jt.images()[name];
				var w=img.img.naturalWidth;
				var h=img.img.naturalHeight;
				
				var obj={x:0,y:0,w:w,h:h};
				var old={x:obj.x,y:obj.y,w:obj.w,h:obj.h};
				var resized={x:jt.pX(80),y:jt.pY(21),w:obj.w,h:obj.h};
				var ratioW=obj.w/(obj.h);
				
				if(ratioW/inspectorWH>1){
					resized.w=jt.pX(20);
					resized.h=resized.w/ratioW;
					
					resized.x=jt.pX(80)+((jt.pX(20)-resized.w)/2);
					resized.y=jt.pY(21)+((jt.pY(20)-resized.h)/2);
				}else{
					resized.h=jt.pY(20);
					resized.w=resized.h*ratioW;
					
					resized.x=jt.pX(80)+((jt.pX(20)-resized.w)/2);
					resized.y=jt.pY(21)+((jt.pY(20)-resized.h)/2);
				}
				resized.img=name;
				
				jt.camActive(false);
				
				//Show labels
				jt.font("Consolas",app.fontSize*0.75);
				
				jt.text("Left click to draw the current tile",jt.pX(80.5),jt.pY(42),cText,"left");
				jt.text("Right click to delete the current tile",jt.pX(80.5),jt.pY(45),cText,"left");
				jt.text("You can use 1-9 to choose the tile (0-8)",jt.pX(80.5),jt.pY(48),cText,"left");
				jt.text("Press once for X and twice for Y",jt.pX(80.5),jt.pY(51),cText,"left");
				if(jt.isAlarm("tile")){
					jt.text("X: "+this.tileX+" (Press again for Y)",jt.pX(80.5),jt.pY(54),cText,"left");
				}else if(jt.isAlarm("tileBoth")){
					jt.text("X: "+this.tileX+" | Y: "+this.tileY,jt.pX(80.5),jt.pY(54),cText,"left");
				}
				
				
				
				jt.text("Size: ",jt.pX(84),jt.pY(63),cText,"right");
				jt.text("Lock: ",jt.pX(94),jt.pY(63),cText,"right");
				
				jt.text("Off X: ",jt.pX(84),jt.pY(66),cText,"right");
				jt.text("Off Y: ",jt.pX(94),jt.pY(66),cText,"right");
				
				jt.text("Grid W: ",jt.pX(84),jt.pY(69),cText,"right");
				jt.text("Grid H: ",jt.pX(94),jt.pY(69),cText,"right");
				
				jt.text("Tags: ",jt.pX(84),jt.pY(72),cText,"right");
				
				jt.text("Tile X: ",jt.pX(84),jt.pY(75),cText,"right");
				jt.text("Tile Y: ",jt.pX(94),jt.pY(75),cText,"right");
				
				
				
				//Show whole tileset with grid
				if(this.bgBlack){
					jt.rect(jt.pX(80),jt.pY(79),jt.pX(20),jt.pY(20),cBg)
					jt.rectB(jt.pX(80),jt.pY(79),jt.pX(20),jt.pY(20),cText,0,2)
				}else{
					jt.rect(jt.pX(80),jt.pY(79),jt.pX(20),jt.pY(20),cBg)
					jt.rectB(jt.pX(80),jt.pY(79),jt.pX(20),jt.pY(20),cText,0,2)
				}
				resized.y=jt.pY(79)
				jt.image(resized);
				
				//Show grid
				var numX=jt.ceil(w/this.tileW);
				var numY=jt.ceil(h/this.tileH);
				
				var rW=resized.w/w;
				var rH=resized.h/h;
				
				var clicked=false;
				if(jt.mPress(jt.pX(80),jt.pY(79),jt.pX(20),jt.pY(20))){
					clicked=true;
				}
				
				for(var y=0;y<numY;y++){
					for(var x=0;x<numX;x++){
						var xx=resized.x+(this.tileOffX*rW)+x*(this.tileW*rW);
						var yy=resized.y+(this.tileOffY*rH)+y*(this.tileH*rH);
						var rect={x:xx,y:yy,w:this.tileW*rW,h:this.tileH*rH,c:[0,0,0,0.5],o:1}
						
						if(clicked){
							if(jt.mPress(rect)){
								this.tileX=x;
								this.tileY=y;
							}
						}
						
						if(x==this.tileX && y==this.tileY){
							jt.rect(rect.x,rect.y,rect.w,rect.h,rect.c);
							jt.rectB(rect.x,rect.y,rect.w,rect.h,[255,255,255],0,2);
						}else{
							jt.rectB(rect.x,rect.y,rect.w,rect.h,rect.c,0,rect.o);
						}
						
					}
				}
				
				resized.y=jt.pY(21);
				resized.sX=this.tileOffX+(this.tileX*this.tileW)
				resized.sY=this.tileOffY+(this.tileY*this.tileH)
				resized.sW=this.tileW;
				resized.sH=this.tileH;
				jt.image(resized);
			}
		}
		

	},

};
