function Object(x,y,w,h,c,r,attr,cam,v,tags){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.c=c;
	this.r=r;
	this.attr=attr;
	this.name="Obj"+view.objects.length;
	this.alpha=1;
	
	this.cam=cam;
	this.view=v;
	if(tags==undefined){tags=[""];}
	this.tags=tags;
	
	this.selected=false;
	this.selectedOnce=false;
	this.code=["/*Attributes and methods go here*/",""];
	this.setup=["\t/*Setup runs once when the game starts*/","\t"];
	this.update=["\t/*Update runs at the fps specified*/","\t","\tjte.draw(this);"];
}

var defaultCode=["/*Attributes and methods go here*/",""];
var defaultSetup=["\t/*Setup runs once when the game starts*/","\t"];
var defaultUpdate=["\t/*Update runs at the fps specified*/","\t","\tjte.draw(this);"];

function Button(x,y,w,h,action,trigger,text,tab,key,key2){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	
	this.action=action;
	this.trigger=trigger;
	this.text=text;
	this.tab=tab;
	this.key=key;
	this.key2=key2;
	this.active=false;
	this.selected=false;
}

function Field(x,y,w,h,id,tab,text){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	
	this.id=id;
	this.text="";
	if(text!=undefined){this.text=text;}
	this.cursor=0;
	this.tab=tab;
	this.selected=false;
}

function macro(c){
	return "("+c.toUpperCase()+")";
}

function openFile(e){
	menu.upload(e);
}

var app={
	version:"1.1",
	changes:["-Added quick save (No assets)","-Pasted objects are in order","-Fix editor, text fields, resolution and"," views"],
	w:0,
	h:0,
	fps:60,
	fontSize:20,
	editorLoaded:false,
	editor:undefined,
	editorObject:undefined,
	savedCode:undefined,
	game:undefined,
	gameLoaded:false,
	dark:false,
	pR:1,//window.devicePixelRatio
	//setup is called when the game has finished loading
	setup:function(){
		
		jt.mPrevent(true);
		jt.debug(true);
		view.setup();
		menu.setup();
		inspector.setup();
		views.setup();
		editor.setup();
		
		jt.pixelRate(this.pR);
		
		this.fontSize=jt.w()/85;
		
		var can=document.getElementById("can");
		
		app.w=window.innerWidth;
		app.h=window.innerHeight;
		
		can.width=app.w*this.pR;
		can.height=app.h*this.pR;
		can.style.width=app.w;
		can.style.height=app.h;
		can.getContext("2d").scale(this.pR,this.pR);
		
		jt.cam().w=app.w*this.pR;
		jt.cam().h=app.h*this.pR;
		
		jt.smoothing(false);
		
	},
	//update is called every frame
	update:function(){
		//update
		if(this.gameLoaded){
			this.gameLoaded=false;
			//load
		}
		if(this.editorLoaded && this.editorObject!=undefined){
			this.editorLoaded=false;
			//x,y,w,h,c,attr,cam,v
			var obj=view.objects[app.editorObject];
			var lines=[];
			lines.push({locked:true,text:"var obj=new JTEObject("})
			lines.push({locked:true,text:obj.x+",//x"})
			lines.push({locked:true,text:obj.y+",//y"})
			lines.push({locked:true,text:obj.w+",//width"})
			lines.push({locked:true,text:obj.h+",//height"})
			lines.push({locked:true,text:"["+obj.c[0]+","+obj.c[1]+","+obj.c[2]+"],//color"})
			lines.push({locked:true,text:obj.r+",//rotation"})
			lines.push({locked:true,text:obj.alpha+",//alpha"})
			lines.push({locked:true,text:JSON.stringify(obj.attr)+",//attributes"})
			lines.push({locked:true,text:obj.cam+",//camera"})
			lines.push({locked:true,text:"'"+obj.view+"',//view"})
			lines.push({locked:true,text:JSON.stringify(obj.tags)+",//tags"})
			lines.push({locked:true,text:"'"+obj.name+"'//name"})
			lines.push({locked:true,text:");//End of attributes declaration"})
			
			if(obj.code.length==0){
				lines.push({locked:false,text:""})
			}else{
				for(var i=0;i<obj.code.length;i++){
					lines.push({locked:false,text:obj.code[i]})
				}
			}
			
			lines.push({locked:true,text:";"})
			lines.push({locked:true,text:"obj.setup=function(){"})
			
			if(obj.setup.length==0){
				lines.push({locked:false,text:"\t"})
			}else{
				for(var i=0;i<obj.setup.length;i++){
					lines.push({locked:false,text:obj.setup[i]})
				}
			}
			
			lines.push({locked:true,text:"};"},)
			lines.push({locked:true,text:"obj.update=function(){"})
			
			if(obj.update.length==0){
				lines.push({locked:false,text:"\t"})
			}else{
				for(var i=0;i<obj.update.length;i++){
					lines.push({locked:false,text:obj.update[i]})
				}
			}
			
			lines.push({locked:true,text:"};"})
			lines.push({locked:true,text:"jte.objects.push(obj);"})
			app.editor.addToEditor(lines);
			
		}
		
		if(this.editorObject!=undefined && this.savedCode!=undefined){
			view.objects[this.editorObject].code=jt.copyArr(this.savedCode[0])
			view.objects[this.editorObject].setup=jt.copyArr(this.savedCode[1])
			view.objects[this.editorObject].update=jt.copyArr(this.savedCode[2])
			if(view.objects[this.editorObject].code==undefined){view.objects[this.editorObject].code=jt.copyArr(defaultCode)}
			if(view.objects[this.editorObject].setup==undefined){view.objects[this.editorObject].setup=jt.copyArr(defaultSetup)}
			if(view.objects[this.editorObject].update==undefined){view.objects[this.editorObject].update=jt.copyArr(defaultUpdate)}
			this.savedCode=undefined;
			//this.editorObject=undefined;
			/*for(var i=0;i<this.savedCode.length;i++){
				var l=false;
				if(this.savedCode[i].line["markedSpans"]!=undefined){
					if(this.savedCode[i].line["markedSpans"][0].to!=0){
						l=true;
					}
					
				}
				var o={locked:l,text:this.savedCode[i].line.text};
				view.objects[this.editorObject].code.push(o);
			}
			this.savedCode=undefined;*/
		}
		
		view.update();
		
		inspector.update();
		
		views.update();
		
		menu.update();
		
		
		
		//draw
		jt.bg("white");
			
		view.draw();
		
		inspector.draw();
		
		views.draw();
		
		menu.draw();
		
		//views left
		var cBg="lightgrey";
		var cText="black";
		if(app.dark){cBg="#444";cText="white"}
		jt.font("Consolas",app.fontSize);
		jt.rect(0,jt.pY(15),jt.pX(20),jt.pY(2.5),cBg,0);
		jt.rect(0,jt.pY(17.5),jt.pX(20),jt.pY(0.5),"grey",0);
		jt.rectB(0,jt.pY(15),jt.pX(20),jt.pY(85),"black",0,2);
		jt.text("Views",jt.pX(0.5),jt.pY(15.5),cText,"left");
		

		
		//mouse
		var cursorStyle="default";
		if(jt.kCheck("space")){
			
			cursorStyle="move";
		}else{
			cursorStyle="default";
		}

		if(view.tempDir==0){cursorStyle="nw-resize";}
		if(view.tempDir==1){cursorStyle="n-resize";}
		if(view.tempDir==2){cursorStyle="ne-resize";}
		if(view.tempDir==3){cursorStyle="e-resize";}
		if(view.tempDir==4){cursorStyle="se-resize";}
		if(view.tempDir==5){cursorStyle="s-resize";}
		if(view.tempDir==6){cursorStyle="sw-resize";}
		if(view.tempDir==7){cursorStyle="w-resize";}
		if(view.tempDir==8){cursorStyle="move";}

		if(menu.onColor){
			cursorStyle="crosshair";
		}
		//console.log(cursorStyle)
		document.body.style.cursor=cursorStyle;
	},
	
}

//define the jt object on a global scale
var jt=undefined;

//you can also use $(document).ready(function(){}); with jQuery
window.onload = function(){
	//parameters of the JT object:
	//id of the canvas
	//width
	//height
	//frames per second
	//setup function name
	//update function name
	//object which has the function name
	//mobile audio button size (0 for none)
	//fullScreen button on mobile
	jt=new JT("can",window.innerWidth,window.innerHeight,app.fps,'setup','update','app',0,false);
	
	jt.loadImage("img/cursorPoint.png","cursorPoint");
	jt.loadImage("img/cursorWrite.png","cursorWrite");
	jt.loadImage("img/cursorMove.png","cursorMove");
	
	jt.loadImage("img/cursorVertical.png","cursorVertical");
	jt.loadImage("img/cursorHorizontal.png","cursorHorizontal");
	jt.loadImage("img/cursorDiagonalLeft.png","cursorDiagonalLeft");
	jt.loadImage("img/cursorDiagonalRight.png","cursorDiagonalRight");
	
	//jt.loadImage("img/spy.png","spy");
	//jt.loadImage("image.png","name")
	//jt.loadSound("sound.wav","name")
	//jt.loadAnim("src.png","name",number of frames,fps);
}

//remove editor if exiting page
window.onbeforeunload=function(e){
	if(app.editor!=undefined){
		app.editor.close();
	}
	
	return null;
}
