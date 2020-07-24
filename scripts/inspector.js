var inspector={
	lastSelected:0,
	selected:[],
	taken:0,
	takenMax:120,
	nameError:"",
	fields:{
		insName:0,
		insX:0,
		insY:0,
		insW:0,
		insH:0,
		insA:0,
		insR:0,
		insText:0,
		insSize:0,
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
		insText:"text",
		insSize:"size",
		insOrder:"x",
		insTags:"tags",
		insView:"view",
		insCam:"cam"
	},
	color:undefined,
	picker:[0,0,0,1],
	pickerY:-2,
	rgba:[255,0,0,1],
	bgBlack:false,
	setup:function(){
		menu.fields.push(new Field(jt.pX(84),jt.pY(18),jt.pX(15),jt.pY(2),"insName","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(42),jt.pX(5),jt.pY(2),"insX","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(42),jt.pX(5),jt.pY(2),"insY","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(45),jt.pX(5),jt.pY(2),"insW","",""));
		menu.fields.push(new Field(jt.pX(94),jt.pY(45),jt.pX(5),jt.pY(2),"insH","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(53),jt.pX(2),jt.pY(2),"insA","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(56),jt.pX(2),jt.pY(2),"insR","",""));
		
		
		menu.fields.push(new Field(jt.pX(84),jt.pY(60),jt.pX(5),jt.pY(2),"insOrder","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(63),jt.pX(15),jt.pY(2),"insView","",""));
		//menu.fields.push(new Field(jt.pX(94),jt.pY(60),jt.pX(4),jt.pY(2),"insCam","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(66),jt.pX(15),jt.pY(2),"insTags","",""));
		
		
		menu.fields.push(new Field(jt.pX(84),jt.pY(85),jt.pX(15),jt.pY(2),"insText","",""));
		menu.fields.push(new Field(jt.pX(84),jt.pY(91),jt.pX(5),jt.pY(2),"insSize","",""));
		//menu.fields.push(new Field(jt.pX(84),jt.pY(60),jt.pX(2),jt.pY(2),"insAlign","",""));
		
		for(var i=0;i<menu.fields.length;i++){
			if(this.fields.hasOwnProperty(menu.fields[i].id)){
				this.fields[menu.fields[i].id]=i;
			}
		}
		
		//x,y,w,h,action,trigger,text,tab,key,key2
		menu.buttons.push(new Button(jt.pX(97),jt.pY(18),jt.pX(2),jt.pY(2),"insClear",false,"X",""))
		menu.buttons.push(new Button(jt.pX(96),jt.pY(60),jt.pX(3),jt.pY(2),"insCam",false,"False",""))
		menu.buttons.push(new Button(jt.pX(81),jt.pY(96),jt.pX(18),jt.pY(3),"insEditor",false,"Open code editor",""))
		menu.buttons.push(new Button(jt.pX(84),jt.pY(88),jt.pX(5),jt.pY(2),"insAlignLeft",false,"Left",""))
		menu.buttons.push(new Button(jt.pX(89),jt.pY(88),jt.pX(5),jt.pY(2),"insAlignCenter",false,"Center",""))
		menu.buttons.push(new Button(jt.pX(94),jt.pY(88),jt.pX(5),jt.pY(2),"insAlignRight",false,"Right",""))
		
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
		
		
		if(jt.mPress()){
			var show={x:jt.pX(80),y:jt.pY(21),w:jt.pX(20),h:jt.pY(20)}
			if(jt.cRect(show,{x:jt.mX(),y:jt.mY(),w:2,h:2})){
				this.bgBlack=!this.bgBlack;
			}
		}
		
		
		//color picker
		this.picker=undefined;
		if(jt.mX()>=jt.pX(87) && jt.mX()<=jt.pX(99) && jt.mY()>=jt.pY(49) && jt.mY()<=jt.pY(49+9)){
			menu.onColor=true;
			if(jt.mCheck()){
				if(jt.mX()<=jt.pX(96)){
					var img=jt.canvas.ctx.getImageData(jt.mX()*app.pR,jt.mY()*app.pR,1,1).data;
					this.picker=[img[0],img[1],img[2],1];
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
			menu.onColor=false
		}
	},
	draw:function(){
		var ratioCam=jt.w()/jt.cam().w;
		
		var cBg="white";
		var cText="black";
		if(app.dark){cBg="#444";cText="white"}
		jt.rect(jt.pX(80),jt.pY(15),jt.pX(20),jt.pY(85),cBg);
		jt.rectB(jt.pX(80),jt.pY(15),jt.pX(20),jt.pY(85),"black",0,2);
		jt.font("Consolas",app.fontSize);
		jt.text("Inspector",jt.pX(100-20+0.5),jt.pY(15.5),cText,"left");
		
		if(this.bgBlack){
			jt.rect(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cBg)
			jt.rectB(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cText,0,2)
		}else{
			jt.rect(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cBg)
			jt.rectB(jt.pX(80),jt.pY(21),jt.pX(20),jt.pY(20),cText,0,2)
		}
		
		var inspectorWH=jt.pX(20)/jt.pY(20);
		
		if(this.selected.length!=1){
			jt.text("Select 1 object to inspect it",jt.pX(90),jt.pY(30),cText,"center");
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
							
						}else if(field=="insOrder"){
							menu.fields[this.fields[field]].text=inspector.selected[0].toString();
							
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
				if(text){resized.w=jt.pX(20)}
				resized.x=jt.pX(80)+((jt.pX(20)-resized.w)/2);
				resized.y=jt.pY(21)+((jt.pY(20)-resized.h)/2);
			}
			
			view.objects[this.selected[0]].x=resized.x;
			view.objects[this.selected[0]].y=resized.y;
			view.objects[this.selected[0]].w=resized.w;
			view.objects[this.selected[0]].h=resized.h;
			
			view.drawObject(view.objects[this.selected[0]],false);
			
			view.objects[this.selected[0]].x=old.x;
			view.objects[this.selected[0]].y=old.y;
			view.objects[this.selected[0]].w=old.w;
			view.objects[this.selected[0]].h=old.h;
			
			
			jt.rect(jt.pX(80)+1,jt.pY(15),jt.pX(20)-2,jt.pY(6)-1,cBg)
			jt.font("Consolas",app.fontSize);
			jt.text("Inspector",jt.pX(100-20+0.5),jt.pY(15.5),cText,"left");
			jt.rect(jt.pX(80)+1,jt.pY(41)+1,jt.pX(20)-2,jt.pY(59)-2,cBg)
			
			
			
			//draw labels
			jt.font("Consolas",app.fontSize*0.75);
			jt.text("Name: ",jt.pX(84),jt.pY(18),cText,"right");
			if(this.taken>0){
				this.taken--;
				if(this.taken<this.takenMax/2){
					jt.alpha(this.taken/(this.takenMax/2));
					jt.text("Name is "+this.nameError,jt.pX(90),jt.pY(16.5),"red","center");
					jt.alpha(1);
				}else{
					jt.text("Name is "+this.nameError,jt.pX(90),jt.pY(16.5),"red","center");
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
			
			jt.text("Order: ",jt.pX(84),jt.pY(60),cText,"right");
			jt.text("In Camera: ",jt.pX(96),jt.pY(60),cText,"right");
			jt.text("View: ",jt.pX(84),jt.pY(63),cText,"right");
			jt.text("Tags: ",jt.pX(84),jt.pY(66),cText,"right");
			
			if(view.objects[this.selected[0]].attr!=undefined){
				if(view.objects[this.selected[0]].attr.text!=undefined){
					jt.text("Text: ",jt.pX(84),jt.pY(85),cText,"right");
					jt.text("Align: ",jt.pX(84),jt.pY(88),cText,"right");
					jt.text("Size: ",jt.pX(84),jt.pY(91),cText,"right");
				}
			}
			
			
		}
		
	},

};
