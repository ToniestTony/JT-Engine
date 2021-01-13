var view={
	tabs:["Start"],
	tabMax:6,
	view:"Start",
	tabHover:-1,
	
	bg:"white",
	
	viewDefaultW:800,
	viewDefaultH:600,
	camDefault:{x:0,y:0,w:0,h:0},
	
	scrollSpeed:100,
	lastMX:0,
	lastMCX:0,
	lastMY:0,
	lastMCY:0,
	translate:false,
	translateWithMouseDown:true,
	selectRect:undefined,
	selectedRect:undefined,
	//selectAll:false,
	
	fontSize:20,
	
	mouseState:"",
	mouseNew:"",
	mouseDir:-1,
	mouseX:undefined,
	mouseY:undefined,
	mouseMoveX:0,
	mouseMoveY:0,
	transformDir:-1,
	tempDir:-1,
	transformStart:[],
	transformRect:undefined,
	translateOffset:[],
	
	copyArr:[],
	copyOffsetFirst:0,
	copyOffset:0,
	
	actions:{"":[],},
	actionsCurr:{"":0,},
	
	objects:[],
	buttons:[],
	setup:function(){
		//jt.fullscreen(false);
		
		var ratioW=this.viewDefaultW/jt.pX(60);
		var ratioWH=jt.w()/jt.h();
		//var ratioH=this.viewDefaultH/jt.pY(85);
		
		this.camDefault.x=-jt.pX(50)+(this.viewDefaultW/2)
		this.camDefault .y=-jt.pY(15)+(-jt.pY(85/2)+(this.viewDefaultH/2))
		this.camDefault.w=jt.w();
		this.camDefault.h=jt.h();
		
		for(var i=0;i<views.views.length;i++){
			this.actions[views.views[i]]=[];
			this.actionsCurr[views.views[i]]=-1;
		}
		
		/*this.objects.push(new Object(0,0,10,10,[255,0,0],undefined,true,"Main"));
		this.objects.push(new Object(100,100,20,10,[0,255,0],undefined,true,"Main"));
		this.objects.push(new Object(300,75,10,100,[0,0,255],undefined,true,"Main"));
		this.objects.push(new Object(75,75,100,10,[255,0,255],undefined,true,"Main"));
		this.objects.push(new Object(300,200,100,100,[255,127,0],undefined,true,"Level 1"));
		this.objects.push(new Object(300,200,50,25,[255,127,0],{text:"Test",align:"left"},true,"Main"));*/
		
		if(this.viewDefaultW>jt.pX(60)){
			
			var speed=this.scrollSpeed;
			this.camDefault.x-=speed*1.5;
			this.camDefault.y-=speed*1.5/ratioWH;
			this.camDefault.w+=speed;
			this.camDefault.h+=speed/ratioWH;
		}
		
		jt.cam().x=this.camDefault.x;
		jt.cam().y=this.camDefault.y;
		jt.cam().w=this.camDefault.w;
		jt.cam().h=this.camDefault.h;
		
		
		
		this.lastMX=jt.w()/2
		this.lastMCX=0;
		this.lastMY=jt.h()/2
		this.lastMCY=0;
	},
	addTab:function(name){
		this.tabs.push(name);
		if(this.tabs.length>this.tabMax){
			this.tabs.splice(1,1);
		}
	},
	getObjects:function(view){
		var found=[];
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].view==view){
				found.push(i);
			}
		}
		return found;
	},
	getOrder:function(name){
		var found=-1;
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].name==name){
				found=i;
				break;
			}
		}
		return found;
	},
	objectHasScript:function(id){
		var modified=false;
		var obj=this.objects[id];
		if(obj.code!=undefined){
			if(obj.code.length==defaultCode.length){
				for(var i=0;i<obj.code.length;i++){
					if(obj.code[i]!=defaultCode[i]){
						modified=true;
						break;
					}
				}
			}
		}else{
			this.objects[id].code=jt.copyArr(defaultCode)
		}
		
		if(obj.setup!=undefined){
			if(obj.setup.length==defaultSetup.length){
				for(var i=0;i<obj.setup.length;i++){
					if(obj.setup[i]!=defaultSetup[i]){
						modified=true;
						break;
					}
				}
			}
		}else{
			this.objects[id].setup=jt.copyArr(defaultSetup)
		}
		
		if(obj.update!=undefined){
			if(obj.update.length==defaultUpdate.length){
				for(var i=0;i<obj.update.length;i++){
					if(obj.update[i]!=defaultUpdate[i]){
						modified=true;
						break;
					}
				}
			}
		}else{
			this.objects[id].update=jt.copyArr(defaultUpdate)
		}
		
		return modified;
		
	},
	update:function(){
		//LOGIC
		var ratioCam=jt.w()/jt.cam().w;
		var ratioW=jt.w()/jt.cam().w; 
		
		this.mouseMoveX=jt.mX()-this.lastMX;
		this.mouseMoveY=jt.mY()-this.lastMY;
		
		this.tabHover=-1;
		for(var i=0;i<this.tabs.length;i++){
			var m={x:jt.mX(),y:jt.mY(),w:2,h:2}; 
			var t={x:jt.pX(20)+jt.pX(10)*i,y:jt.pY(15),w:jt.pX(10),h:jt.pY(2)};
			var x={x:jt.pX(28)+jt.pX(10)*i,y:jt.pY(15),w:jt.pX(2),h:jt.pY(2)};
			if(jt.cRect(m,x) && i!=0){
				this.tabHover=i;
				if(jt.mPress()){
					if(this.view==this.tabs[i]){
						if(this.tabs.length-1>=i+1){
							this.view=this.tabs[i+1]
						}else{
							this.view=this.tabs[i-1]
						}
					}
					this.tabs.splice(i,1);
					
				}
			}else if(jt.cRect(m,t)){
				this.tabHover=i;
				if(jt.mPress()){
					for(var j=0;j<this.objects.length;j++){
						if(this.objects[j].view==this.view || this.objects[j].view==""){
							this.objects[j].selected=false;
						}
					}
					this.selectRect=undefined;
					this.view=this.tabs[i];
					this.resetView();
				}
			}
			
		}
			
		if(jt.mX()>=jt.pX(20) && jt.mX()<=jt.pX(80) && jt.mY()>=jt.pY(15)){
			//scroll
			if(jt.mS()!=0){
				var ratioMouseX=(jt.mX()/app.pR)/jt.w();
				var ratioMouseY=(jt.mY()/app.pR)/jt.h();
				var speed=this.scrollSpeed;
				var ratioWH=jt.w()/jt.h();
				var maxZoom=10;
				var minZoom=0.1;
				if(jt.mS()<0 && ratioCam<=maxZoom){
			
					jt.cam().x+=speed*ratioMouseX;
					jt.cam().y+=speed*ratioMouseY/ratioWH;
					jt.cam().w-=speed;
					jt.cam().h-=speed/ratioWH;
					if(jt.w()/jt.cam().w>maxZoom){
						jt.cam().x-=speed*ratioMouseX;
						jt.cam().y-=speed*ratioMouseY/ratioWH;
						jt.cam().w+=speed;
						jt.cam().h+=speed/ratioWH;
					}
				}
				if(jt.mS()>0 && ratioCam>=minZoom){
					jt.cam().x-=speed*ratioMouseX;
					jt.cam().y-=speed*ratioMouseY/ratioWH;
					jt.cam().w+=speed;
					jt.cam().h+=speed/ratioWH;
					if(jt.w()/jt.cam().w<minZoom){
						jt.cam().x+=speed*ratioMouseX;
						jt.cam().y+=speed*ratioMouseY/ratioWH;
						jt.cam().w-=speed;
						jt.cam().h-=speed/ratioWH;
					}
				}
			}
			var check=jt.mCheck(0,0,jt.w(),jt.h(),false);
			var press=jt.mPress(0,0,jt.w(),jt.h(),false);
			if(jt.kCheck("space")){
				if(this.translateWithMouseDown){
					if(check){
						this.translate=true;
						this.selectRect=undefined;
					}
				}else{
					this.translate=true;
					this.selectRect=undefined;
				}
			}
			
			if(check){
				if(this.translate){
					//this.translate=true;
					//this.selectRect=undefined;
				}else{
					if(this.selectRect==undefined){
						this.selectRect={x:jt.mCX(),y:jt.mCY()}
					}else{
						
					}
				}
			}else{
				
				if(this.selectRect!=undefined){
					//select
					var x=this.selectRect.x;
					var y=this.selectRect.y;
					var w= Math.abs(jt.mCX()-x)
					var h= Math.abs(jt.mCY()-y)
					
					if(jt.mCX()<this.selectRect.x){x=jt.mCX()}
					if(jt.mCY()<this.selectRect.y){y=jt.mCY()}
					var rect={x:x,y:y,w:w,h:h};
					var once=false;
					for(var i=this.objects.length-1;i>=0;i--){
						if(this.objects[i].view==this.view || this.objects[i].view==""){
							var obj={x:this.objects[i].x,y:this.objects[i].y,w:this.objects[i].w,h:this.objects[i].h};
							if(jt.cRect(rect,obj) && !once && !(jt.kCheck("ctrlL") || jt.kCheck("ctrlR"))){
								if(rect.w==0 && rect.h==0){
									once=true;
								}
								if(this.objects[i].selectedOnce){
									this.objects[i].selectedOnce=false;
								}else{
									this.objects[i].selected=true;
								}
								
								
							}else if(!(jt.kCheck("ctrlL") || jt.kCheck("ctrlR"))){
								this.objects[i].selected=false;
							}
						}
					}
					this.selectRect=undefined;
				}
			}
			if(press){
					//select
					var x=jt.mCX()
					var y=jt.mCY();
					var w= 1;
					var h= 1;
					
					var rect={x:x,y:y,w:w,h:h};
					
					//show selection before releasing
					for(var i=0;i<this.objects.length;i++){
						if(this.objects[i].view==this.view || this.objects[i].view==""){
							var obj={x:this.objects[i].x,y:this.objects[i].y,w:this.objects[i].w,h:this.objects[i].h};
							if(jt.cRect(rect,obj)){
								if(jt.kCheck("ctrlL") || jt.kCheck("ctrlR")){
									this.objects[i].selected=!this.objects[i].selected;
								}
							}
						}
					}
			}
			if(jt.kCheck("space") && jt.mPress(0,0,jt.w(),jt.h(),false,2)){
				this.resetView();
			}
		}else{
			if(!jt.mCheck(0,0,jt.w(),jt.h(),false)){
				this.selectRect=undefined;
			}
		}
		
		if(this.translate){
			if(jt.kCheck("space")){
				if(this.translateWithMouseDown){
					if(jt.mCheck(0,0,jt.w(),jt.h(),false)){
						this.translate=true;
						jt.cam().x-=this.mouseMoveX/app.pR*(jt.cam().w/jt.w());
						jt.cam().y-=this.mouseMoveY/app.pR*(jt.cam().h/jt.h());
					}else{
						this.translate=false;
					}
				}else{
					this.translate=true;
					jt.cam().x-=this.mouseMoveX/app.pR*(jt.cam().w/jt.w());
					jt.cam().y-=this.mouseMoveY/app.pR*(jt.cam().h/jt.h());
				}
				
			}else{
				this.translate=false;
			}
		}
		
		//selected zone
		//objects
		
		var selectAll=false;
		if((jt.kCheck("ctrlL") || jt.kCheck("ctrlR")) && jt.kPress("a")){
			selectAll=true;
		}
		
		var selectObj=[];
		this.selectedRect={x:undefined,y:undefined,w:undefined,h:undefined,ww:undefined,hh:undefined};
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].view==this.view || this.objects[i].view==""){
				var obj={x:this.objects[i].x,y:this.objects[i].y,w:this.objects[i].w,h:this.objects[i].h,i:i,c:this.objects[i].c,attr:this.objects[i].attr,tags:this.objects[i].tags};
				if(selectAll){this.objects[i].selected=true;}
				if(this.objects[i].selected){
					selectObj.push(obj);
				}
			}
		}
		
		this.tempDir=-1;
		
		if(selectObj.length>0){
			for(var i=0;i<selectObj.length;i++){
				var obj=selectObj[i];
				if(this.selectedRect.x==undefined){
					this.selectedRect.x=obj.x;
					this.selectedRect.y=obj.y;
					this.selectedRect.w=obj.w;
					this.selectedRect.h=obj.h;
					this.selectedRect.ww=obj.w;
					this.selectedRect.hh=obj.h;
				}else{
					if(obj.x<this.selectedRect.x){
						var dist=(this.selectedRect.x+this.selectedRect.w)-obj.x;
						if(dist<=obj.w){
							this.selectedRect.w=obj.w;
						}else{
							this.selectedRect.w=dist;
						}
						this.selectedRect.x=obj.x
					}else if(obj.x+obj.w>this.selectedRect.x+this.selectedRect.w){
						this.selectedRect.w=(obj.x+obj.w)-(this.selectedRect.x);
					}
					if(obj.y<this.selectedRect.y){
						var dist=(this.selectedRect.y+this.selectedRect.h)-obj.y;
						if(dist<=obj.h){
							this.selectedRect.h=obj.h;
						}else{
							this.selectedRect.h=dist;
						}
						this.selectedRect.y=obj.y
					}else if(obj.y+obj.h>this.selectedRect.y+this.selectedRect.h){
						this.selectedRect.h=(obj.y+obj.h)-(this.selectedRect.y);
					}
				}
			}
			
			//transform add condition so you can't selectedRect
			if(this.mouseState=="" && (!jt.mDown() || (jt.mDown() && jt.mPress()))){
				var u=1/ratioW
				var m={x:jt.mCX()-u*2,y:jt.mCY()-u*2,w:u*4,h:u*4}; 
				
				
				for(var yy=0;yy<=2;yy++){
					for(var xx=0;xx<=2;xx++){
						if(xx==1 && yy==1){
						
						}else{
							
							var rect={}
							rect.x=this.selectedRect.x+(xx*this.selectedRect.w/2)-u*4;
							rect.y=this.selectedRect.y+(yy*this.selectedRect.h/2)-u*4;
							rect.w=u*8;
							rect.h=u*8;
							
							if(jt.cRect(m,rect)){
								if(xx==0 && yy==0){this.tempDir=0;}
								if(xx==1 && yy==0){this.tempDir=1;}
								if(xx==2 && yy==0){this.tempDir=2;}
								if(xx==2 && yy==1){this.tempDir=3;}
								if(xx==2 && yy==2){this.tempDir=4;}
								if(xx==1 && yy==2){this.tempDir=5;}
								if(xx==0 && yy==2){this.tempDir=6;}
								if(xx==0 && yy==1){this.tempDir=7;}
								if(jt.mPress()){
									this.mouseState="transform";
									this.transformDir=this.tempDir;
									
									if(this.transformStart.length==0){
										for(var i=0;i<selectObj.length;i++){
											var transformStart={};
											transformStart.x=selectObj[i].x;
											transformStart.y=selectObj[i].y;
											transformStart.w=selectObj[i].w;
											transformStart.h=selectObj[i].h;
											transformStart.ratio=selectObj[i].w/selectObj[i].h;
											this.transformStart.push(transformStart)
										}
									}
									if(this.transformRect==undefined){
										this.transformRect={};
										this.transformRect.x=this.selectedRect.x;
										this.transformRect.y=this.selectedRect.y;
										this.transformRect.w=this.selectedRect.w;
										this.transformRect.h=this.selectedRect.h;
									}
									if(this.mouseX==undefined){
										this.mouseX=jt.mCX()-this.selectedRect.x;
										this.mouseY=jt.mCY()-this.selectedRect.y;
									}
								}
							}
						}
					}
				}
				
				if(this.tempDir==-1){
					
					if(jt.cRect(m,this.selectedRect)){this.tempDir=8}
					
					if(this.tempDir==8){
						if(jt.mPress()){
							this.mouseState="translate";
							this.transformDir=this.tempDir;
							if(this.mouseX==undefined){
								this.mouseX=jt.mCX()-this.selectedRect.x;
								this.mouseY=jt.mCY()-this.selectedRect.y;
							}
							if(jt.mPress()){
								if(this.translateOffset.length==0){
									for(var i=0;i<selectObj.length;i++){
										var translateOffset={};
										var transformStart={};
										translateOffset.x=selectObj[i].x-this.selectedRect.x;
										translateOffset.y=selectObj[i].y-this.selectedRect.y;
										transformStart.x=selectObj[i].x;
										transformStart.y=selectObj[i].y;
										this.translateOffset.push(translateOffset)
										this.transformStart.push(transformStart)
									}
								}
							}
						}
					}
				}
			}
		}
		
		if(jt.mPress(jt.pX(20),jt.pY(15),jt.pX(60),jt.pY(85),false,2)){
			this.mouseState="";
		}
		
		if(jt.mPress()){
			if(jt.mX()>=jt.pX(20) && jt.mX()<=jt.pX(80) && jt.mY()>=jt.pY(15)){
				if(this.mouseState=="new"){
					this.mouseState="creating";
					//this.mouseNew="rect";
					this.transformRect={};
					this.transformRect.x=jt.mCX();
					this.transformRect.y=jt.mCY();
					this.transformRect.w=0;
					this.transformRect.h=0;
					this.mouseX=jt.mCX();
					this.mouseY=jt.mCY();
					if(this.mouseNew=="text"){
						this.transformRect.attr={};
						this.transformRect.attr.text="Aa";
						this.transformRect.attr.size=app.fontSize;
					}
					if(this.mouseNew=="img"){
						this.transformRect.attr={};
						this.transformRect.attr.img=menu.uploadsImage[menu.uploadImageNum].name;
					}
					if(this.mouseNew=="anim"){
						this.transformRect.attr={};
						this.transformRect.attr.anim=menu.uploadsAnim[menu.uploadAnimNum].name;
						this.transformRect.attr.frames=menu.uploadsAnim[menu.uploadAnimNum].frames;
						this.transformRect.attr.speed=menu.uploadsAnim[menu.uploadAnimNum].speed;
					}
				}
			}
		}
		
		var minWH=0.1;
		
		if(jt.mCheck()){
			if(jt.mX()>=jt.pX(20) && jt.mX()<=jt.pX(80) && jt.mY()>=jt.pY(15)){
				if(this.mouseState=="translate"){
					var selectRect={};
					selectRect.x=this.selectRect.x;
					selectRect.y=this.selectRect.y;
					selectRect.w=this.selectRect.w;
					selectRect.h=this.selectRect.h;
					this.selectRect=undefined;
					if(this.transformDir==8){	
						for(var i=0;i<selectObj.length;i++){
							this.objects[selectObj[i].i].x=jt.mCX()-this.mouseX+this.translateOffset[i].x;
							this.objects[selectObj[i].i].y=jt.mCY()-this.mouseY+this.translateOffset[i].y;
							if(menu.snapGrid){
								this.objects[selectObj[i].i].x=Math.round(this.objects[selectObj[i].i].x/menu.gridUnit)*menu.gridUnit;
								this.objects[selectObj[i].i].y=Math.round(this.objects[selectObj[i].i].y/menu.gridUnit)*menu.gridUnit;
							}else{
								this.objects[selectObj[i].i].x=Math.round(this.objects[selectObj[i].i].x*100)/100;
								this.objects[selectObj[i].i].y=Math.round(this.objects[selectObj[i].i].y*100)/100;
							}
						}
					}
				}else if(this.mouseState=="creating"){
					this.selectRect=undefined;
					if(jt.mCX()<this.mouseX){
						this.transformRect.x=jt.mCX();
						this.transformRect.w=this.mouseX-jt.mCX();			
					}else{
						this.transformRect.x=this.mouseX;
						this.transformRect.w=(jt.mCX())-this.transformRect.x;
					}
					if(jt.mCY()<this.mouseY){
						this.transformRect.y=jt.mCY();
						this.transformRect.h=this.mouseY-jt.mCY();
					}else{
						this.transformRect.y=this.mouseY;
						this.transformRect.h=(jt.mCY())-this.transformRect.y;
					}
					if(menu.snapGrid){
						this.transformRect.x=Math.round(this.transformRect.x/menu.gridUnit)*menu.gridUnit;
						this.transformRect.w=Math.round(this.transformRect.w/menu.gridUnit)*menu.gridUnit;
						this.transformRect.y=Math.round(this.transformRect.y/menu.gridUnit)*menu.gridUnit;
						this.transformRect.h=Math.round(this.transformRect.h/menu.gridUnit)*menu.gridUnit;
					}else{
						this.transformRect.x=Math.round(this.transformRect.x*100)/100;
						this.transformRect.w=Math.round(this.transformRect.w*100)/100;
						this.transformRect.y=Math.round(this.transformRect.y*100)/100;
						this.transformRect.h=Math.round(this.transformRect.h*100)/100;
					}
				}else if(this.mouseState=="transform"){
					var selectRect={};
					selectRect.x=this.selectRect.x;
					selectRect.y=this.selectRect.y;
					selectRect.w=this.selectRect.w;
					selectRect.h=this.selectRect.h;
					this.selectRect=undefined;
					var xx=0;
					var yy=0;
					var shift=false;
					
					
					for(var i=0;i<selectObj.length;i++){
						var ratio=this.transformRect.w/this.transformRect.h;
						if(this.transformDir==0){xx--;yy--;}
						else if(this.transformDir==1){yy--;}
						else if(this.transformDir==2){xx++;yy--;}
						else if(this.transformDir==3){xx++;}
						else if(this.transformDir==4){xx++;yy++;}
						else if(this.transformDir==5){yy++;}
						else if(this.transformDir==6){xx--;yy++;}
						else if(this.transformDir==7){xx--;}
						if((xx!=0 && yy!=0) && jt.kCheck("shift")){
							shift=true;
						}
						
						var ratioW=1;
						var ratioH=1;
						
						var tX=this.objects[selectObj[i].i].x;
						var tY=this.objects[selectObj[i].i].y;
						var tW=this.objects[selectObj[i].i].w;
						var tH=this.objects[selectObj[i].i].h;
						
						var mCX=jt.mCX();
						var mCY=jt.mCY();
						
						/*var offsetX=this.transformStart[i].x-selectRect.x;
						var offsetY=this.transformStart[i].y-selectRect.y;
						var offsetW=this.transformStart[i].w-selectRect.w;
						var offsetH=this.transformStart[i].h-selectRect.h;*/
						
						
					
						if(xx<0){
							var oldW=this.transformRect.w;
							var newW=this.transformRect.w+(this.transformRect.x-mCX);
							ratioW=newW/oldW;
							
							
							this.objects[selectObj[i].i].x=(mCX-this.transformRect.x)+((this.transformStart[i].x-this.transformRect.x)*ratioW)+this.transformRect.x
							this.objects[selectObj[i].i].w=this.transformStart[i].w*ratioW;
							if(this.objects[selectObj[i].i].x>this.transformRect.x+this.transformRect.w-minWH){
								this.objects[selectObj[i].i].x=this.transformRect.x+this.transformRect.w-minWH;
							}
							if(this.objects[selectObj[i].i].w<minWH){
								this.objects[selectObj[i].i].w=minWH;
							}
						}else if(xx>0){
							var oldW=this.transformRect.w;
							var newW=this.transformRect.w+(mCX-(this.transformRect.x+this.transformRect.w));
							ratioW=newW/oldW;
							
							this.objects[selectObj[i].i].x=((this.transformStart[i].x-this.transformRect.x)*ratioW)+this.transformRect.x
							this.objects[selectObj[i].i].w=this.transformStart[i].w*ratioW;
							if(this.objects[selectObj[i].i].x<this.transformRect.x+minWH){
								this.objects[selectObj[i].i].x=this.transformRect.x+minWH;
							}
							if(this.objects[selectObj[i].i].w<minWH){
								this.objects[selectObj[i].i].w=minWH;
							}
						}
						if(yy<0){
							var oldH=this.transformRect.h;
							var newH=this.transformRect.h+(this.transformRect.y-mCY);
							ratioH=newH/oldH;
							
							
							this.objects[selectObj[i].i].y=(mCY-this.transformRect.y)+((this.transformStart[i].y-this.transformRect.y)*ratioH)+this.transformRect.y;
							this.objects[selectObj[i].i].h=this.transformStart[i].h*ratioH;
							
							/*if(shift){
								this.objects[selectObj[i].i].h=this.objects[selectObj[i].i].w/ratio;
								this.objects[selectObj[i].i].y=(this.transformStart[i].y+this.transformStart[i].h)-this.objects[selectObj[i].i].h;
							}*/
							if(this.objects[selectObj[i].i].y>this.transformRect.y+this.transformRect.h-minWH){
								this.objects[selectObj[i].i].y=this.transformRect.y+this.transformRect.h-minWH;
							}
							if(this.objects[selectObj[i].i].h<minWH){
								this.objects[selectObj[i].i].h=minWH;
							}
						}else if(yy>0){
							var oldH=this.transformRect.h;
							var newH=this.transformRect.h+(jt.mCY()-(this.transformRect.y+this.transformRect.h));
							ratioH=newH/oldH;
							
							this.objects[selectObj[i].i].y=((this.transformStart[i].y-this.transformRect.y)*ratioH)+this.transformRect.y;
							this.objects[selectObj[i].i].h=this.transformStart[i].h*ratioH;
							/*if(shift){
								this.objects[selectObj[i].i].h=this.objects[selectObj[i].i].w/ratio;
							}*/
							if(this.objects[selectObj[i].i].y<this.transformRect.y+minWH){
								this.objects[selectObj[i].i].y=this.transformRect.y+minWH;
							}
							if(this.objects[selectObj[i].i].h<minWH){
								//this.objects[selectObj[i].i].y=tY;
								this.objects[selectObj[i].i].h=minWH;
							}
						}
						if(menu.snapGrid){
							this.objects[selectObj[i].i].x=Math.round(this.objects[selectObj[i].i].x/menu.gridUnit)*menu.gridUnit;
							this.objects[selectObj[i].i].w=Math.round(this.objects[selectObj[i].i].w/menu.gridUnit)*menu.gridUnit;
							this.objects[selectObj[i].i].y=Math.round(this.objects[selectObj[i].i].y/menu.gridUnit)*menu.gridUnit;
							this.objects[selectObj[i].i].h=Math.round(this.objects[selectObj[i].i].h/menu.gridUnit)*menu.gridUnit;
						}else{
							this.objects[selectObj[i].i].x=Math.round(this.objects[selectObj[i].i].x*100)/100;
							this.objects[selectObj[i].i].w=Math.round(this.objects[selectObj[i].i].w*100)/100;
							this.objects[selectObj[i].i].y=Math.round(this.objects[selectObj[i].i].y*100)/100;
							this.objects[selectObj[i].i].h=Math.round(this.objects[selectObj[i].i].h*100)/100;
						}
					}
				}
			}
		}else if(this.mouseState!="new"){
			if(this.mouseState=="translate"){
				var arr=[];
				for(var i=0;i<selectObj.length;i++){
					var data={x1:0,y1:0,x2:0,y2:0,i:0}
					data.x1=this.transformStart[i].x;
					data.y1=this.transformStart[i].y;
					data.x2=this.objects[selectObj[i].i].x;
					data.y2=this.objects[selectObj[i].i].y;
					data.i=selectObj[i].i;
					arr.push(data);
				}
				
				this.actionsCurr[this.view]++;
				this.actions[this.view].splice(this.actionsCurr[this.view]);
				this.actions[this.view].push({
					action:"translate",
					objects:arr
				})
			}else if(this.mouseState=="transform"){
				var arr=[];
				for(var i=0;i<selectObj.length;i++){
					var data={x1:0,y1:0,w1:0,h1:0,x2:0,y2:0,w2:0,h2:0,i:0}
					data.x1=this.transformStart[i].x;
					data.y1=this.transformStart[i].y;
					data.w1=this.transformStart[i].w;
					data.h1=this.transformStart[i].h;
					data.x2=this.objects[selectObj[i].i].x;
					data.y2=this.objects[selectObj[i].i].y;
					data.w2=this.objects[selectObj[i].i].w;
					data.h2=this.objects[selectObj[i].i].h;
					data.i=selectObj[i].i;
					arr.push(data);
				}
				
				this.actionsCurr[this.view]++;
				this.actions[this.view].splice(this.actionsCurr[this.view]);
				this.actions[this.view].push({
					action:"transform",
					objects:arr
				})
			}
			if(this.mouseState=="creating"){
				var objectsView=0;
				for(var i=0;i<this.objects.length;i++){objectsView++;}
				views.updateButtons=true;
				var attr=undefined;
				if(this.mouseNew=="rect"){
					this.objects.push(new Object(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr],0,undefined,true,this.view));
				}
				if(this.mouseNew=="text"){
					attr={};
					attr.text="Aa";
					attr.size=Math.round(app.fontSize);
					jt.font("Consolas",app.fontSize*ratioCam);
					var w=jt.textW(attr.text)/ratioCam;
					var h=jt.textH(attr.text)/ratioCam;
					if(this.transformRect.w<w){this.transformRect.w=w;}
					if(this.transformRect.h<h){this.transformRect.h=h;}
					this.objects.push(new Object(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr],0,attr,true,this.view));
				}
				if(this.mouseNew=="img"){
					attr={};
					attr.img=this.transformRect.attr.img;
					this.objects.push(new Object(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr],0,attr,true,this.view));
				}
				if(this.mouseNew=="anim"){
					attr={};
					attr.anim=this.transformRect.attr.anim;
					attr.frames=this.transformRect.attr.frames;
					attr.speed=this.transformRect.attr.speed;
					this.objects.push(new Object(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr],0,attr,true,this.view));
				}
				
				
				var arr=[];
				
				var data={
					x:this.transformRect.x,
					y:this.transformRect.y,
					w:this.transformRect.w,
					h:this.transformRect.h,
					i:objectsView,
					c:menu.colors[menu.colorCurr],
					r:0,
					attr:attr,
					cam:true,
					view:this.view
					}
					
				arr.push(data);
				
				this.actionsCurr[this.view]++;
				this.actions[this.view].splice(this.actionsCurr[this.view]);
				this.actions[this.view].push({
					action:"create",
					objects:arr
				})
			}else{
				if((jt.kPress("delete") || jt.kPress("backspace")) && selectObj.length>0 && this.selectedRect.x!=undefined && menu.writing==-1){
					views.updateButtons=true;
					//delete
					var arr=[];
					
					for(var i=0;i<selectObj.length;i++){
						var data={x:0,y:0,w:0,h:0,i:0,c:0,cam:true,view:this.view}
						data.x=this.objects[selectObj[i].i].x;
						data.y=this.objects[selectObj[i].i].y;
						data.w=this.objects[selectObj[i].i].w;
						data.h=this.objects[selectObj[i].i].h;
						data.i=selectObj[i].i;
						data.attr=this.objects[selectObj[i].i].attr,
						data.c=this.objects[selectObj[i].i].c;
						data.alpha=this.objects[selectObj[i].i].alpha;
						data.r=this.objects[selectObj[i].i].r;
						data.cam=this.objects[selectObj[i].i].cam;
						data.tags=this.objects[selectObj[i].i].tags;
						data.code=this.objects[selectObj[i].i].code;
						data.setup=this.objects[selectObj[i].i].setup;
						data.update=this.objects[selectObj[i].i].update;
						arr.push(data);
					}
					
					this.actionsCurr[this.view]++;
					this.actions[this.view].splice(this.actionsCurr[this.view]);
					this.actions[this.view].push({
						action:"delete",
						objects:arr
					})
					
					for(var i=0;i<this.objects.length;i++){
						if(this.objects[i].selected){
							
							
							this.objects.splice(i,1);
							i--;
						}
					}
				}
			}
			
			//copy
			if(this.selectedRect!=undefined && ( (jt.kCheck("ctrlL") || jt.kCheck("ctrlR")) && (jt.kPress("c") || jt.kPress("x") || jt.kPress("d")) ) ){
				var arr=[];
					
				for(var i=0;i<selectObj.length;i++){
					var data={x:0,y:0,w:0,h:0,i:0,c:0,cam:true,view:this.view,code:undefined,setup:undefined,update:undefined}
					data.x=this.objects[selectObj[i].i].x;
					data.y=this.objects[selectObj[i].i].y;
					data.w=this.objects[selectObj[i].i].w;
					data.h=this.objects[selectObj[i].i].h;
					data.i=selectObj[i].i;
					//if(!jt.kPress("x")){data.i=-1;}
					data.attr=this.objects[selectObj[i].i].attr;
					data.c=this.objects[selectObj[i].i].c;
					data.alpha=this.objects[selectObj[i].i].alpha;
					data.r=this.objects[selectObj[i].i].r;
					data.cam=this.objects[selectObj[i].i].cam;
					data.tags=this.objects[selectObj[i].i].tags;
					data.code=this.objects[selectObj[i].i].code;
					data.setup=this.objects[selectObj[i].i].setup;
					data.update=this.objects[selectObj[i].i].update;
					arr.push(data);
				}
				
				this.copyArr=arr;
				this.copyOffset=this.copyOffsetFirst
				
				if(jt.kPress("x")){
					this.actionsCurr[this.view]++;
					this.actions[this.view].splice(this.actionsCurr[this.view]);
					this.actions[this.view].push({
						action:"delete",
						objects:arr
					})
					
					
					for(var i=0;i<this.objects.length;i++){
						if(this.objects[i].selected){
							
							this.objects.splice(i,1);
							i--;
						}
					}
				}
			}
			
			//paste
			if(this.selectedRect!=undefined && ( (jt.kCheck("ctrlL") || jt.kCheck("ctrlR")) && (jt.kPress("v") || jt.kPress("d")) ) ){
				views.updateButtons=true;
				var arr=[];
				
				var objectsView=1;
				for(var i=0;i<this.objects.length;i++){objectsView++;}
				
				var cpt=1
				
				for(var i=0;i<this.copyArr.length;i++){
					var data={x:0,y:0,w:0,h:0,i:0,c:0,cam:true,view:this.view}
					data.x=this.copyArr[i].x+this.copyOffset;
					data.y=this.copyArr[i].y+this.copyOffset;
					data.w=this.copyArr[i].w;
					data.h=this.copyArr[i].h;
					
					
					data.i=(this.copyArr[i].i+cpt);
					cpt++;
					
					if(data.i==-1){data.i=objectsView-1;objectsView++;}
					
					if(this.copyArr[i].attr==undefined){
						data.attr=undefined;
					}else{
						data.attr=JSON.parse(JSON.stringify(this.copyArr[i].attr));
					}
					data.c=this.copyArr[i].c;
					data.alpha=this.copyArr[i].alpha;
					data.r=this.copyArr[i].r;
					data.cam=this.copyArr[i].cam;
					data.tags=this.copyArr[i].tags;
					arr.push(data);
					this.objects.splice(data.i,0,new Object(data.x,data.y,data.w,data.h,data.c,data.r,data.attr,data.cam,data.view,data.tags));
					if(this.copyArr[i].code!=undefined){this.objects[data.i].code=this.copyArr[i].code;}
					if(this.copyArr[i].setup!=undefined){this.objects[data.i].setup=this.copyArr[i].setup;}
					if(this.copyArr[i].update!=undefined){this.objects[data.i].update=this.copyArr[i].update;}
					this.objects[data.i].alpha=this.copyArr[i].alpha;
				}
				
				this.actionsCurr[this.view]++;
				this.actions[this.view].splice(this.actionsCurr[this.view]);
				this.actions[this.view].push({
					action:"create",
					objects:arr
				})
				
				//select new objects
				inspector.selected=[];
				for(var i=0;i<view.objects.length;i++){
					if(view.objects[i].selected){
						view.objects[i].selected=false;
					}
					for(var j=0;j<arr.length;j++){
						if(i==arr[j].i){
							view.objects[i].selected=true;
						}
					}
				}
				
				this.copyOffset+=this.copyOffsetFirst;
				
			}
			this.mouseState="";
			this.mouseX=undefined;
			this.mouseY=undefined;
			menu.uploadSelected=false;
			this.transformStart=[];
			this.transformRect=undefined;
			this.translateOffset=[];
			this.mouseNew="";
			//remove selected
			var removeActions=["newRect","newText","newImg","newAnim"];
			for(var i=0;i<menu.buttons.length;i++){
				if(removeActions.indexOf(menu.buttons[i].action)!=-1){
					menu.buttons[i].selected=false;
				}
			}
		}
		
		//ctrl actions
		if(jt.kCheck("ctrlL") || jt.kCheck("ctrlR")){
			if(jt.kPress("z") && !jt.kCheck("shift")){
				if(this.actions[this.view].length-1>=this.actionsCurr[this.view] && this.actionsCurr[this.view]>=0){
					var action=this.actions[this.view][this.actionsCurr[this.view]];
					if(action.action=="translate"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].x=action.objects[i].x1;
							this.objects[action.objects[i].i].y=action.objects[i].y1;
						}
					}else if(action.action=="transform"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].x=action.objects[i].x1;
							this.objects[action.objects[i].i].y=action.objects[i].y1;
							this.objects[action.objects[i].i].w=action.objects[i].w1;
							this.objects[action.objects[i].i].h=action.objects[i].h1;
						}
					}else if(action.action=="create"){
						views.updateButtons=true;
						var index=0;
						for(var i=0;i<action.objects.length;i++){
							this.objects.splice(action.objects[i].i+index,1);
							index--;
						}
						
					}else if(action.action=="delete"){
						
						views.updateButtons=true;
						for(var i=0;i<action.objects.length;i++){
							var data={x:0,y:0,w:0,h:0,i:0,c:0,cam:true,view:this.view}
							data.x=action.objects[i].x;
							data.y=action.objects[i].y;
							data.w=action.objects[i].w;
							data.h=action.objects[i].h;
							data.i=action.objects[i].i;
							if(action.objects[i].attr==undefined){
								data.attr=undefined;
							}else{
								data.attr=JSON.parse(JSON.stringify(action.objects[i].attr));
							}
							data.c=action.objects[i].c;
							data.r=action.objects[i].r;
							data.cam=action.objects[i].cam;
							data.view=action.objects[i].view;
							data.tags=action.objects[i].tags;
							this.objects.splice(data.i,0,new Object(data.x,data.y,data.w,data.h,data.c,data.r,data.attr,data.cam,data.view,data.tags));
							if(action.objects[i].code!=undefined){this.objects[data.i].code=action.objects[i].code;}
							if(action.objects[i].setup!=undefined){this.objects[data.i].setup=action.objects[i].setup;}
							if(action.objects[i].update!=undefined){this.objects[data.i].update=action.objects[i].update;}
							this.objects[data.i].alpha=action.objects[i].alpha;
							if(this.objects[data.i].alpha==undefined){this.objects[data.i].alpha=1;}
						}
					}
					this.actionsCurr[this.view]--;
				}
			}
			if(jt.kPress("y") || (jt.kCheck("shift") && jt.kPress("z"))){
				if(this.actions[this.view].length-1>=this.actionsCurr[this.view]+1){
					var action=this.actions[this.view][this.actionsCurr[this.view]+1];
					if(action.action=="translate"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].x=action.objects[i].x2;
							this.objects[action.objects[i].i].y=action.objects[i].y2;
						}
					}else if(action.action=="transform"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].x=action.objects[i].x2;
							this.objects[action.objects[i].i].y=action.objects[i].y2;
							this.objects[action.objects[i].i].w=action.objects[i].w2;
							this.objects[action.objects[i].i].h=action.objects[i].h2;
						}
					}else if(action.action=="create"){
						views.updateButtons=true;
						for(var i=0;i<action.objects.length;i++){
							var arr=[];
							arr[0]=action.objects[i].x;
							arr[1]=action.objects[i].y;
							arr[2]=action.objects[i].w;
							arr[3]=action.objects[i].h;
							arr[4]=action.objects[i].c;
							arr[5]=action.objects[i].r;
							if(action.objects[i].attr==undefined){
								arr[6]=undefined
							}else{
								arr[6]=JSON.parse(JSON.stringify(action.objects[i].attr));
							}
							arr[7]=action.objects[i].cam;
							arr[8]=action.objects[i].view;
							arr[9]=action.objects[i].tags;
							var ii=action.objects[i].i;
							this.objects.splice(ii,0,new Object(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9]));
							if(action.objects[i].code!=undefined){this.objects[ii].code=action.objects[i].code;}
							if(action.objects[i].setup!=undefined){this.objects[ii].setup=action.objects[i].setup;}
							if(action.objects[i].update!=undefined){this.objects[ii].update=action.objects[i].update;}
							this.objects[ii].alpha=action.objects[i].alpha;
							if(this.objects[ii].alpha==undefined){this.objects[ii].alpha=1;}
						}
						
					}else if(action.action=="delete"){
						views.updateButtons=true;
						var index=0;
						for(var i=0;i<action.objects.length;i++){
							this.objects.splice(action.objects[i].i+index,1);
							index--;
						}
					}
					this.actionsCurr[this.view]++;
				}
			}
		}

		
		
		//update last mouse position
		this.lastMX=jt.mX()
		this.lastMCX=jt.mCX()
		this.lastMY=jt.mY()
		this.lastMCY=jt.mCY()
		
	},
	draw:function(){
		var ratioCam=jt.w()/jt.cam().w;
		var ratioW=jt.w()/jt.cam().w; 
		
		//DRAW
		
		
		
		
		//Editor
		if(this.bg=="white"){
			if(!app.dark){
				jt.rect(jt.pX(20),jt.pY(15),jt.pX(60),jt.pY(85),"white",0);
			}else{
				jt.rect(jt.pX(20),jt.pY(15),jt.pX(60),jt.pY(85),"black",0);
			}
		}else{
			jt.rect(jt.pX(20),jt.pY(15),jt.pX(60),jt.pY(85),this.bg,0);
		}
		
		jt.camactive(true);
		
		
		
		//objects
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].view==this.view || this.objects[i].view==""){
				this.drawObject(this.objects[i],true);
			}
		}
		
		//grid
		if(menu.showGrid){

			var a=menu.gridAlpha;
			var c=[0,0,0,a];
			var w=0.25;
			if(app.dark){c=[255,255,255,a];w=0.5}
			for(var y=0;y<this.viewDefaultH;y+=menu.gridUnit){
				jt.rect(0,y,this.viewDefaultW,w,c);
			}
			
			for(var x=0;x<this.viewDefaultW;x+=menu.gridUnit){
				jt.rect(x,0,w,this.viewDefaultH,c);
			}
		}
		
		if(this.selectedRect.x!=undefined){
			jt.rect(this.selectedRect.x,this.selectedRect.y,this.selectedRect.w,this.selectedRect.h,[100,100,255,0.25])
			var c=[0,0,0,0.75];
			if(app.dark){c=[255,255,255,0.75]}
			jt.rectB(this.selectedRect.x,this.selectedRect.y,this.selectedRect.w,this.selectedRect.h,c,0,2)
			
			//8 squares
			for(var yy=0;yy<=2;yy++){
				for(var xx=0;xx<=2;xx++){
					if(xx==1 && yy==1){
					
					}else{
					var u=1/ratioW
						jt.rect(this.selectedRect.x+(xx*this.selectedRect.w/2)-u*4,this.selectedRect.y+(yy*this.selectedRect.h/2)-u*4,u*8,u*8,"black");
						jt.rect(this.selectedRect.x+(xx*this.selectedRect.w/2)-u*3,this.selectedRect.y+(yy*this.selectedRect.h/2)-u*3,u*6,u*6,"white");
					}
					
				}
			}
		}
		
		if(this.selectRect!=undefined){
			var x=this.selectRect.x;
			var y=this.selectRect.y;
			var w= Math.abs(jt.mCX()-x)
			var h= Math.abs(jt.mCY()-y)
			
			if(jt.mCX()<this.selectRect.x){x=jt.mCX()}
			if(jt.mCY()<this.selectRect.y){y=jt.mCY()}
			
			jt.rect(x,y,w,h,[100,100,255,0.25])
			var c=[0,0,0,0.75];
			if(app.dark){c=[255,255,255,0.75]}
			jt.rectB(x,y,w,h,c,0,2)
		}
		if(this.mouseState=="creating" && this.transformRect!=undefined){
			if(this.mouseNew=="rect"){
				jt.rect(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr])
			}
			if(this.mouseNew=="img"){
				jt.image(this.transformRect.attr.img,this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h)
			}
			if(this.mouseNew=="anim"){
				jt.anim(this.transformRect.attr.anim,this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h)
			}
			if(this.mouseNew=="text"){
				var t=this.transformRect.attr.text;
				var fS=Math.round(app.fontSize*ratioCam);
				var font="Consolas";
				var align="left";
				
				jt.font(font,fS);
				//jt.text(t,obj.x+offset,obj.y,c,align);
				jt.rectB(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr])
				//jt.text(t,this.transformRect.x+offset,this.transformRect.y,menu.colors[menu.colorCurr],align);
				this.drawObject({x:this.transformRect.x,y:this.transformRect.y,w:this.transformRect.w,h:this.transformRect.h,c:menu.colors[menu.colorCurr],selected:true,attr:{text:t,align:align,alwaysShow:true}})
			}
			
		}
		
		
		//Editor middle
		jt.font("Consolas",app.fontSize);
		//jt.text("View",jt.pX(20),jt.pY(17),"black","left");
		jt.baseline("bottom");
		jt.camactive(true);
		jt.font("Consolas",app.fontSize*ratioCam);
		jt.rectB(0,0,this.viewDefaultW,this.viewDefaultH,"grey",0,1);
		
		jt.text(this.view,0,0,"grey","left");
		
		
		
		//tabs
		jt.camactive(false);
		jt.font("Consolas",app.fontSize);
		jt.baseline("bottom");
		jt.text(Math.round(jt.mCX())+" "+Math.round(jt.mCY())+" ",jt.pX(80),jt.pY(100),"black","right");
		jt.baseline("top");
		
		jt.font("Consolas",app.fontSize*0.75);
		for(var i=0;i<this.tabs.length;i++){
			var c="lightgrey";
			if(app.dark){c="grey"}
			var str=this.tabs[i].substr(0,12);
			if(this.view==this.tabs[i] || i==this.tabHover){
				c="white";
				if(app.dark){c="lightgrey"}
			}
			var cText="black";
			if(app.dark){cText="black"}
			jt.rect(jt.pX(20)+jt.pX(10)*i,jt.pY(15),jt.pX(10),jt.pY(2),"black");
			jt.rect(jt.pX(20)+jt.pX(10)*i+1,jt.pY(15)+1,jt.pX(10)-2,jt.pY(2)-2,c);
			
			if(i==0){
				jt.text(str,jt.pX(25)+jt.pX(10)*i,jt.pY(15.5),cText,"center");
			}else{
				jt.text(str,jt.pX(24)+jt.pX(10)*i,jt.pY(15.5),cText,"center");
				jt.rect(jt.pX(28)+jt.pX(10)*i+1,jt.pY(15)+1,jt.pX(2)-2,jt.pY(2)-2,"red");
				jt.text("X",jt.pX(29)+jt.pX(10)*i,jt.pY(15.5),c,"center");
			}
			
			
		}
		
		
	},
	drawObject:function(o,outline){
		var c=o.c;
		var r=o.r;
		var obj={x:o.x,y:o.y,w:o.w,h:o.h,attr:o.attr,selected:o.selected,alpha:o.alpha};
		
		//change alpha
		var changeAlpha=false;
		if(obj.alpha!=1){
			changeAlpha=true;
			jt.alpha(o.alpha);
		}
		
		if(obj.attr!=undefined){
			if(obj.attr.text!=undefined){
				var t=obj.attr.text;
				var fS=app.fontSize;
				var font="Consolas";
				var align="left";
				var alwaysShow=true
				var offset=0;
				
				if(obj.attr.size!=undefined){fS=obj.attr.size}
				if(obj.attr.font!=undefined){font=obj.attr.font}
				if(obj.attr.align!=undefined){align=obj.attr.align}
				if(obj.attr.alwaysShow!=undefined){alwaysShow=obj.attr.alwaysShow}
				
				var ratioCam=((jt.w()+jt.h())/2)/((jt.cam().w+jt.cam().h)/2);
				//if(o.cam==true){
				fS*=ratioCam;
				//}
				
				if(align=="center"){
					offset=obj.w/2;
				}
				
				if(align=="right"){
					offset=obj.w;
				}
				alwaysShow=true
				
				jt.font(font,fS);
				var w=jt.textW(t)/ratioCam;
				var w1=jt.textW(".")/ratioCam;
				var h=jt.textH(t)/ratioCam;
				var maxChars=Math.ceil(obj.w/w1)
				
				if((w<=obj.w && h<=obj.h) || alwaysShow){
					jt.text(t,obj.x+offset,obj.y,c,align,fS,r,maxChars,fS/ratioCam);
				}else{
					if(h>obj.h){
						//too small
					}else{
						if(w>obj.w){
							if(w1>obj.w){
								//too small
							}else{
								//line breaks
								var maxLen=1;
								for(var j=1;j<t.length;j++){
									if(w1*j>obj.w){
										break;
									}else{
										maxLen=j;
									}
								}
								var numLines=Math.ceil(t.length/maxLen);
								var maxLines=1;
								for(var j=1;j<=numLines;j++){
									if(h*j>obj.h){
										break;
									}else{
										maxLines=j;
									}
								}
								//draw all lines
								for(var j=0;j<maxLines;j++){
									var str=t.substr(j*maxLen,maxLen);
									jt.text(str,obj.x+offset,obj.y+(h*j),c,align,fS,r);
								}
							}
						}
					}
				}
				
				
			}else if(obj.attr.img!=undefined){
				if(jt.assets.images[obj.attr.img]!=undefined){
					jt.image(obj.attr.img,obj.x,obj.y,obj.w,obj.h,r);
				}else{
					jt.rect(obj.x,obj.y,obj.w,obj.h,"black",r);
				}
			}else if(obj.attr.anim!=undefined){
				if(jt.assets.anims[obj.attr.anim]!=undefined){
					jt.anim(obj.attr.anim,obj.x,obj.y,obj.w,obj.h,r);
				}else{
					jt.rect(obj.x,obj.y,obj.w,obj.h,"black",r);
				}
			}
		}else{
			jt.rect(obj.x,obj.y,obj.w,obj.h,c,r);	
		}
		if(changeAlpha){
			jt.alpha(1)
		}
		if(obj.selected && outline){
			jt.rectB(obj.x,obj.y,obj.w,obj.h,[0,0,0,0.75],r,2);
		}
	},
	resetView:function(){
		jt.cam().x=this.camDefault.x;
		jt.cam().y=this.camDefault.y;
		jt.cam().w=this.camDefault.w;
		jt.cam().h=this.camDefault.h;
		
		jt.cam().w=window.innerWidth*app.pR;
		jt.cam().h=window.innerHeight*app.pR;
	}
};
