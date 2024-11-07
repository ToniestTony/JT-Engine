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
    
    showRot:false,
    showActions:false,
    
    actionsView:"",
    actionsLast:-1,
    actionsMsgs:[],
    actionsDur:240,
    
    undo:false,
    redo:false,
	
	zDown:0,
	zMax:20,
	zPer:1,
	yDown:0,
	yMax:20,
	yPer:1,

	copyArr:[],
	copyOffsetFirst:0,
	copyOffset:0,

	actions:{"":[],},
	actionsCurr:{"":-1,},

	objects:[],
	buttons:[],
	setup:function(){
		//jt.fullscreen(false);

		var ratioW=this.viewDefaultW/jt.pX(60);
		var ratioWH=jt.w()/jt.h();
		//var ratioH=this.viewDefaultH/jt.pY(85);

		//this.camDefault.x=-jt.pX(50)+(this.viewDefaultW/2)
		//this.camDefault.y=-jt.pY(15)+(-jt.pY(85/2)+(this.viewDefaultH/2))
		if(this.viewDefaultW/jt.pX(60)>this.viewDefaultH/jt.pY(85)){
			this.camDefault.w=this.viewDefaultW*2;
			this.camDefault.h=(this.viewDefaultW*2)/ratioWH;
			this.camDefault.x=-this.camDefault.w*0.25;
			this.camDefault.y=-this.camDefault.h*0.265;
		}else{
			this.camDefault.h=(this.viewDefaultH*2);
			this.camDefault.w=(this.viewDefaultH*2)*ratioWH;

			this.camDefault.x=-this.camDefault.w*0.34;
			this.camDefault.y=-this.camDefault.h*0.32;
		}


		for(var i=0;i<views.views.length;i++){
			this.actions[views.views[i]]=[];
			this.actionsCurr[views.views[i]]=-1;
		}

		/*if(this.viewDefaultW>jt.pX(60)){
			this.camDefault.w=jt.w()/8;
			this.camDefault.h=jt.h()/8;
			//this.camDefault.h*=4;
			//var speed=this.scrollSpeed;
		//	this.camDefault.x-=
			//this.camDefault.y-=speed*1.5/ratioWH;

		}*/

		jt.cam().x=this.camDefault.x;
		jt.cam().y=this.camDefault.y;
		jt.cam().w=this.camDefault.w;
		jt.cam().h=this.camDefault.h;



		this.lastMX=jt.w()/2
		this.lastMCX=0;
		this.lastMY=jt.h()/2
		this.lastMCY=0;

		jt.cam().x=this.camDefault.x;
		jt.cam().y=this.camDefault.y;
		jt.cam().w=this.camDefault.w;
		jt.cam().h=this.camDefault.h;

		this.resetView();
	},
	addTab:function(name){
		this.tabs.push(name);
		if(this.tabs.length>this.tabMax){
			this.tabs.splice(1,1);
		}
	},
	getObject:function(name){
		var found=undefined;
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].name==name){
				found=i;
				break;
			}
		}
		return found;
	},
	getObjects:function(view,tag,reverse){
		var found=[];
		if(tag!=undefined){
			var rev=false;
			if(reverse!=undefined){
				if(reverse){
					rev=true;
				}
			}
			if(rev){
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].view==view && this.objects[i].tags.indexOf(tag)==-1){
						found.push(i);
					}
				}
			}else{
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].view==view && this.objects[i].tags.indexOf(tag)!=-1){
						found.push(i);
					}
				}
			}
			
		}else{
			for(var i=0;i<this.objects.length;i++){
				if(this.objects[i].view==view){
					found.push(i);
				}
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
			}else{
				modified=true;
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
			}else{
				modified=true;
			}
		}else{
			this.objects[id].setup=jt.copyArr(defaultSetup)
		}

		if(obj.update!=undefined){
			if(obj.update.length==defaultUpdate.length){
				for(var i=0;i<obj.update.length;i++){
					if(obj.update[i]==defaultUpdate[i] || obj.update[i]==defaultUpdate2[i]){
						//good
					}else{
						modified=true;
						break;
					}
				}
			}else{
				modified=true;
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
					jt.mRelease();
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
					views.saveViewCam();
					this.view=this.tabs[i];
					this.resetView(this.view);
					jt.mRelease();
				}
			}

		}

		if(jt.mX()>=jt.pX(20) && jt.mX()<=jt.pX(80) && jt.mY()>=jt.pY(15)){
			//scroll
			if(jt.mS()!=0){
				var ratioMouseX=(jt.mX()/app.pR)/jt.w();
				var ratioMouseY=(jt.mY()/app.pR)/jt.h();
				var speed=this.scrollSpeed*2;
				if(jt.kCheck("space")){speed=this.scrollSpeed*20;}
				var ratioWH=jt.w()/jt.h();
				var maxZoom=10;
				var minZoom=0.01;
				if(jt.mS()<0 && ratioCam<=maxZoom){
					jt.cam().x+=speed*ratioMouseX;
					jt.cam().y+=speed*ratioMouseY/ratioWH;
					jt.cam().w-=speed;
					jt.cam().h-=speed/ratioWH;
                    
					if(jt.w()/jt.cam().w>maxZoom || jt.cam().w<=0 || jt.cam().h<=0){
                        speed=this.scrollSpeed*2;
                        while(jt.cam().w<=0 || jt.cam().h<=0){                             
                            jt.cam().x-=speed*ratioMouseX;
                            jt.cam().y-=speed*ratioMouseY/ratioWH;
                            jt.cam().w+=speed;
                            jt.cam().h+=speed/ratioWH;
                        }
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
			var tileset=false;
			if(inspector.tileset && menu.uploadsImage.length>0){
				tileset=true;
			}
			if(jt.kCheck("space")){
				if(this.translateWithMouseDown){
					if(check && !press){
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
					if(this.selectRect==undefined && !tileset){
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
								}else if(!this.objects[i].locked){
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
			if(press && !tileset){
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
				this.resetView()
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
				if(selectAll && !this.objects[i].locked){this.objects[i].selected=true;}
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

		if(jt.mPress() || (jt.mCheck() && tileset) || (jt.mCheck(0,0,jt.w(),jt.h(),false,2) && tileset)){
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
                    if(this.mouseNew=="circle"){
						this.transformRect.attr={};
						this.transformRect.attr.shape="circle";
					}
                    if(this.mouseNew=="ellipse"){
						this.transformRect.attr={};
						this.transformRect.attr.shape="ellipse";
					}
                    if(this.mouseNew=="line"){
						this.transformRect.attr={};
						this.transformRect.attr.shape="line";
					}
					if(this.mouseNew=="text"){
						this.transformRect.attr={};
						this.transformRect.attr.text="Aa";
						this.transformRect.attr.size=app.fontSize;
						this.transformRect.attr.font=app.fontName;
						this.transformRect.attr.align="left";
					}
					if(this.mouseNew=="img"){
						this.transformRect.attr={};
						this.transformRect.attr.img=menu.uploadsImage[menu.uploadImageNum].name;
						var img=jt.images()[menu.uploadsImage[menu.uploadImageNum].name];
						this.transformRect.attr.sX=0;
						this.transformRect.attr.sY=0;
						this.transformRect.attr.sW=img.img.naturalWidth;
						this.transformRect.attr.sH=img.img.naturalHeight;
					}
					if(this.mouseNew=="anim"){
						this.transformRect.attr={};
						this.transformRect.attr.anim=menu.uploadsAnim[menu.uploadAnimNum].name;
						this.transformRect.attr.frames=menu.uploadsAnim[menu.uploadAnimNum].frames;
						this.transformRect.attr.speed=menu.uploadsAnim[menu.uploadAnimNum].speed;
					}
				}else if(tileset && !jt.kCheck("space")){
					for(var yy=0;yy<inspector.tileSize;yy++){
						for(var xx=0;xx<inspector.tileSize;xx++){
						
						
							var img=menu.uploadsImage[menu.uploadImageNum].name;
							var x=jt.mCX()+(xx*menu.gridUnit)
							var y=jt.mCY()+(yy*menu.gridUnit)
							var w=menu.gridUnit;
							var h=menu.gridUnit;
							if(menu.snapGrid){
								x-=menu.gridX;
								y-=menu.gridY;
								x=jt.floor(x/menu.gridUnit)*menu.gridUnit+menu.gridX;
								y=jt.floor(y/menu.gridUnit)*menu.gridUnit+menu.gridY;
							}
							var sX=inspector.tileX*inspector.tileW+inspector.tileOffX;
							var sY=inspector.tileY*inspector.tileH+inspector.tileOffY;
							var sW=inspector.tileW;
							var sH=inspector.tileH;
							
							var tX=inspector.tileX;
							var tY=inspector.tileY;
							
							var valid=true;
							
							var del=[];
							var add=[];
							
							var ww=view.viewDefaultW;
							var hh=view.viewDefaultH;
							
							var chunkX=Math.floor(x/ww)*ww;
							var chunkY=Math.floor(y/hh)*hh;
							
							/*
							//Check objects and add them to delete arr
							for(var i=0;i<this.objects.length;i++){
								if(x==this.objects[i].x && y==this.objects[i].y){
									if(w==this.objects[i].w && h==this.objects[i].h){
										if(this.objects[i].attr!=undefined){
											if(this.objects[i].attr.img!=undefined){
												if(jt.mCheck(0,0,jt.w(),jt.h(),false,2)){
													//right click
													valid=false;
													del.push(i);
												}else{
													var o=this.objects[i];
													if(o.attr.img==img && o.attr.sX==sX && o.attr.sY==sY &&o.attr.sW==sW &&o.attr.sH==sH){
														valid=false;
														break;
													}
													
													del.push(i);
												}
											}else{continue;}
										}else{continue;}
									}else{continue;}
								}else{continue;}
							}
							*/
							
							if(jt.mCheck(0,0,jt.w(),jt.h(),false,2)){
								valid=false;
							}
							
							//Delete tiles
							if(menu.tiles[this.view]!=undefined && !valid){
								if(menu.tiles[this.view].length>0){
									//All chunks for now
									var arrXY=[];
									/*
									for(var yy=0;yy<inspector.tileSize;yy++){
										for(var xx=0;xx<inspector.tileSize;xx++){
											arrXY.push([x+(xx*menu.gridUnit),y+(yy*menu.gridUnit)]);
										}
									}
									*/
									arrXY.push([x,y]);
									
									for(var chunkIndex in menu.tiles[this.view]){
										var tilesets=menu.tiles[this.view][chunkIndex].tilesets;
										for(var tilesetIndex in tilesets){
											var tiles=tilesets[tilesetIndex].tiles;
											for(var tileIndex in tiles){
												var tile=tiles[tileIndex];
												for(var arrXYIndex in arrXY){
													var xy=arrXY[arrXYIndex];
													if(tile[0]==xy[0] && tile[1]==xy[1]){
														//remove that tile
														del.push({x:xy[0],y:xy[1],tX:tile[2],tY:tile[3],img:tilesets[tilesetIndex].img,chunkIndex:chunkIndex,tilesetIndex:tilesetIndex,tileIndex:parseInt(tileIndex)})
														break;
													}
												}
											}
										}
									}
								}
								
								if(del.length>0){
								
									var arr=[];

									for(var i=0;i<del.length;i++){
										var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
										data.x=del[i].x;
										data.y=del[i].y;
										data.tX=del[i].tX;
										data.tY=del[i].tY;
										data.img=del[i].img;
										arr.push(data);
									}

									this.actionsCurr[this.view]++;
									this.actions[this.view].splice(this.actionsCurr[this.view]);
									this.actions[this.view].push({
										action:"deleteTiles",
										objects:arr
									})
									
									
									//Then delete tiles
									var tileMod=0;
									for(var i=0;i<del.length;i++){
										var d=del[i];
										console.log(menu.tiles[this.view][d.chunkIndex].tilesets[d.tilesetIndex].tiles.length);
										menu.tiles[this.view][d.chunkIndex].tilesets[d.tilesetIndex].tiles.splice(d.tileIndex+tileMod,1);
										console.log(menu.tiles[this.view][d.chunkIndex].tilesets[d.tilesetIndex].tiles.length);
										tileMod--;
									}
									
									
									
									views.updateButtons=true;
								}
							}
							/*
							for(var i=0;i<this.objects.length;i++){
								if(x==this.objects[i].x && y==this.objects[i].y){
									if(w==this.objects[i].w && h==this.objects[i].h){
										if(this.objects[i].attr!=undefined){
											if(this.objects[i].attr.img!=undefined){
												if(jt.mCheck(0,0,jt.w(),jt.h(),false,2)){
													//right click
													valid=false;
													del.push(i);
												}else{
													var o=this.objects[i];
													if(o.attr.img==img && o.attr.sX==sX && o.attr.sY==sY &&o.attr.sW==sW &&o.attr.sH==sH){
														valid=false;
														break;
													}
													
													del.push(i);
												}
											}else{continue;}
										}else{continue;}
									}else{continue;}
								}else{continue;}
							}
							*/
							
							/*
							//Delete del array
							if(del.length>0){
								var arr=[];

								for(var i=0;i<del.length;i++){
									var data={x:0,y:0,w:0,h:0,i:0,c:0,cam:true,view:this.view}
									data.x=this.objects[del[i]].x;
									data.y=this.objects[del[i]].y;
									data.w=this.objects[del[i]].w;
									data.h=this.objects[del[i]].h;
									data.i=del[i];
									data.attr=this.objects[del[i]].attr,
									data.c=this.objects[del[i]].c;
									data.alpha=this.objects[del[i]].alpha;
									data.r=this.objects[del[i]].r;
									data.cam=this.objects[del[i]].cam;
									data.tags=this.objects[del[i]].tags;
									data.locked=this.objects[del[i]].locked;
									data.last=this.objects[del[i]].last;
									data.tags=this.objects[del[i]].tags;
									data.name=this.objects[del[i]].name;
									data.code=this.objects[del[i]].code;
									data.setup=this.objects[del[i]].setup;
									data.update=this.objects[del[i]].update;
									arr.push(data);
								}

								this.actionsCurr[this.view]++;
								this.actions[this.view].splice(this.actionsCurr[this.view]);
								this.actions[this.view].push({
									action:"delete",
									objects:arr
								})

								for(var i=0;i<del.length;i++){
									this.objects.splice(del[i],1);
								}
								views.updateButtons=true;
							}
							*/
							
							/*
							//Add tiles
							if(valid){
								var objectsView=this.objects.length;
								attr={};
								attr.img=img;
								attr.sX=sX;
								attr.sY=sY;
								attr.sW=sW;
								attr.sH=sH;
								this.objects.push(new Object(x,y,w,h,menu.colors[menu.colorCurr],0,attr,true,this.view,JSON.parse(menu.getField("tileTags").text),inspector.tileLock));

								var obj=this.objects[this.objects.length-1];
								
								var arr=[];

								var data={
									x:x,
									y:y,
									w:w,
									h:h,
									i:objectsView,
									c:menu.colors[menu.colorCurr],
									r:0,
									attr:attr,
									cam:true,
									view:this.view,
									tags:obj.tags,
									locked:obj.locked,
									last:false,
									name:obj.name
									}

								arr.push(data);

								this.actionsCurr[this.view]++;
								this.actions[this.view].splice(this.actionsCurr[this.view]);
								this.actions[this.view].push({
									action:"create",
									objects:arr
								})
								views.updateButtons=true;
							}
							*/
							
							//Adding tiles
							if(valid){
								if(menu.tiles[this.view]==undefined){
									menu.tiles[this.view]=[];
								}
								
								var foundChunkIndex=-1;
								var addChunk=false;
								
								if(menu.tiles[this.view].length>0){
									//Find chunk
									for(var chunkIndex in menu.tiles[this.view]){
										var chunk=menu.tiles[this.view][chunkIndex];
										if(chunk.x==chunkX && chunk.y==chunkY){
											foundChunkIndex=chunkIndex;
											break;
										}
									}
									if(foundChunkIndex==-1){
										addChunk=true;
									}
								}else{
									addChunk=true;
								}
								
								if(addChunk){
									var tilesets={img:img,unit:menu.gridUnit,tiles:[]};
									menu.tiles[this.view].push({x:chunkX,y:chunkY,tilesets:[]});
									foundChunkIndex=menu.tiles[this.view].length-1;
									menu.tiles[this.view][foundChunkIndex].tilesets.push(tilesets);
								}
								
								if(foundChunkIndex!=-1){
									var chunk=menu.tiles[this.view][foundChunkIndex];
									
									//Now find tileset
									var foundTilesetIndex=-1;
									var tilesets=chunk.tilesets;
									for(var tilesetIndex in tilesets){
										if(tilesets[tilesetIndex].img==img){
											foundTilesetIndex=tilesetIndex;
											break;
										}
									}
									
									if(foundTilesetIndex==-1){
										//create tileset
										chunk.tilesets.push({img:img,unit:menu.gridUnit,tiles:[]})
										foundTilesetIndex=chunk.tilesets.length-1;
									}
									
									if(foundTilesetIndex!=-1){
										//Add all positions of inspector.tileSize
										
										var arrXY=[];
										/*
										for(var yy=0;yy<inspector.tileSize;yy++){
											for(var xx=0;xx<inspector.tileSize;xx++){
												arrXY.push([x+(xx*menu.gridUnit),y+(yy*menu.gridUnit)]);
											}
										}
										*/
										arrXY.push([x,y])
										
										var del=[];
										
										var add=[];
										
										var same=false;
										
										for(var arrXYIndex in arrXY){
											var xy=arrXY[arrXYIndex];
											
											var img=menu.tiles[this.view][foundChunkIndex].tilesets[foundTilesetIndex].img;
											
											//Check if already exists in another tileset and replace it
											var currChunkTilesets=menu.tiles[this.view][foundChunkIndex].tilesets;
											for(var chunkTilesetsIndex in currChunkTilesets){
												var chunkTileset=currChunkTilesets[chunkTilesetsIndex];
												var currTiles=chunkTileset.tiles;
												for(var tilesIndex in currTiles){
													if(currTiles[tilesIndex][0]==xy[0] && currTiles[tilesIndex][1]==xy[1]){
														//remove that tile
														var tile=currTiles[tilesIndex];
														if(chunkTileset.img==img && tile[0]==xy[0] && tile[1]==xy[1] && tile[2]==tX && tile[3]==tY){
															same=true;
															break;
														}
														del.push({x:tile[0],y:tile[1],tX:tile[2],tY:tile[3],img:chunkTileset.img,chunkIndex:foundChunkIndex,tilesetIndex:chunkTilesetsIndex,tileIndex:tilesIndex})
														break;
													}
												}
											}
											
											//Add to current tileset's tiles
											if(!same){
												menu.tiles[this.view][foundChunkIndex].tilesets[foundTilesetIndex].tiles.push([xy[0],xy[1],tX,tY]);
												var tileIndex=menu.tiles[this.view][foundChunkIndex].tilesets[foundTilesetIndex].tiles.length-1;
												add.push({x:xy[0],y:xy[1],tX:tX,tY:tY,img:img,chunkIndex:foundChunkIndex,tilesetIndex:foundTilesetIndex,tileIndex:tileIndex})
											}
										}
				
										
										if(del.length>0){
											var arr=[];

											for(var i=0;i<del.length;i++){
												var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
												data.x=del[i].x;
												data.y=del[i].y;
												data.tX=del[i].tX;
												data.tY=del[i].tY;
												data.img=del[i].img;
												arr.push(data);
											}

											this.actionsCurr[this.view]++;
											this.actions[this.view].splice(this.actionsCurr[this.view]);
											this.actions[this.view].push({
												action:"deleteTiles",
												objects:arr
											})
											
											
											//Then delete tiles
											for(var i=0;i<del.length;i++){
												var d=del[i];
												menu.tiles[this.view][d.chunkIndex].tilesets[d.tilesetIndex].tiles.splice(d.tileIndex,1);
											}
											
											views.updateButtons=true;
										}
										
										
										if(add.length>0){
											var arr=[];

											for(var i=0;i<add.length;i++){
												var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
												data.x=add[i].x;
												data.y=add[i].y;
												data.tX=add[i].tX;
												data.tY=add[i].tY;
												data.img=add[i].img;
												arr.push(data);
											}

											this.actionsCurr[this.view]++;
											this.actions[this.view].splice(this.actionsCurr[this.view]);
											this.actions[this.view].push({
												action:"createTiles",
												objects:arr
											})
											
											views.updateButtons=true;
										}
									}
								}
							}
						}
					}
					//Do the actions after the fors
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
								this.objects[selectObj[i].i].x=Math.round(this.objects[selectObj[i].i].x/menu.gridUnit)*menu.gridUnit+menu.gridX;
								this.objects[selectObj[i].i].y=Math.round(this.objects[selectObj[i].i].y/menu.gridUnit)*menu.gridUnit+menu.gridY;
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
						this.transformRect.x=Math.round(this.transformRect.x/menu.gridUnit)*menu.gridUnit+menu.gridX;
						this.transformRect.w=Math.round(this.transformRect.w/menu.gridUnit)*menu.gridUnit;
						this.transformRect.y=Math.round(this.transformRect.y/menu.gridUnit)*menu.gridUnit+menu.gridY;
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

							//this.objects[selectObj[i].i].x=((this.transformStart[i].x-this.transformRect.x)*ratioW)+this.transformRect.x
							this.objects[selectObj[i].i].w=this.transformStart[i].w*ratioW;
							/*if(this.objects[selectObj[i].i].x<this.transformRect.x+minWH){
								this.objects[selectObj[i].i].x=this.transformRect.x+minWH;
							}*/
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

							//this.objects[selectObj[i].i].y=((this.transformStart[i].y-this.transformRect.y)*ratioH)+this.transformRect.y;
							this.objects[selectObj[i].i].h=this.transformStart[i].h*ratioH;
							/*if(shift){
								this.objects[selectObj[i].i].h=this.objects[selectObj[i].i].w/ratio;
							}*/
							/*if(this.objects[selectObj[i].i].y<this.transformRect.y+minWH){
								this.objects[selectObj[i].i].y=this.transformRect.y+minWH;
							}*/
							if(this.objects[selectObj[i].i].h<minWH){
								//this.objects[selectObj[i].i].y=tY;
								this.objects[selectObj[i].i].h=minWH;
							}
						}
                        if(this.objects[selectObj[i].i].attr!=undefined){
                             if(this.objects[selectObj[i].i].attr.shape!=undefined){
                                 if(this.objects[selectObj[i].i].attr.shape=="circle"){
                                    if(xx!=0 && yy!=0){
                                       if(this.objects[selectObj[i].i].w>this.objects[selectObj[i].i].h){
                                        this.objects[selectObj[i].i].h=this.objects[selectObj[i].i].w;
                                        }else{
                                            this.objects[selectObj[i].i].w=this.objects[selectObj[i].i].h;
                                        }
                                    }else if(xx!=0){
                                        this.objects[selectObj[i].i].h=this.objects[selectObj[i].i].w;
                                    }else if(yy!=0){
                                        this.objects[selectObj[i].i].w=this.objects[selectObj[i].i].h;
                                    }
                                 }
                             }
                        }
                        
						if(menu.snapGrid){
							var gridX=0;
							var gridY=0;
							if(xx<0){
								gridX=menu.gridX;
								this.objects[selectObj[i].i].x=Math.round(this.objects[selectObj[i].i].x/menu.gridUnit)*menu.gridUnit+gridX;
							}
							if(yy<0){
								gridY=menu.gridY;
								this.objects[selectObj[i].i].y=Math.round(this.objects[selectObj[i].i].y/menu.gridUnit)*menu.gridUnit+gridY;
							}
							
							this.objects[selectObj[i].i].w=Math.round(this.objects[selectObj[i].i].w/menu.gridUnit)*menu.gridUnit+menu.gridX;
							this.objects[selectObj[i].i].h=Math.round(this.objects[selectObj[i].i].h/menu.gridUnit)*menu.gridUnit+menu.gridY;
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
                if((this.transformRect.w>0 && this.transformRect.h>0) || (this.mouseNew=="line" && (this.transformRect.w>0 || this.transformRect.h>0))){
                    var objectsView=this.objects.length;
                    views.updateButtons=true;
                    var attr=undefined;
                    if(this.mouseNew=="rect" || this.mouseNew=="circle" || this.mouseNew=="ellipse" || this.mouseNew=="line"){
                        var attr=undefined;
                        var w=this.transformRect.w;
                        var h=this.transformRect.h;
                        if(this.mouseNew=="circle"){
                            attr={};
                            attr.shape="circle";
                            if(w>h){
                                h=w;
                            }else{
                                w=h;
                            }
                        }
                        if(this.mouseNew=="ellipse"){attr={};attr.shape="ellipse";}
                        if(this.mouseNew=="line"){
                            attr={};attr.shape="line";
                            attr.lineW=1;
                            attr.dirX=1;
                            attr.dirY=1;
                            
                            if(jt.mCX()>this.mouseX){
                                attr.dirX=-1;
                            }
                            if(jt.mCY()>this.mouseY){
                                attr.dirY=-1;
                            }
                        }
                        this.objects.push(new Object(this.transformRect.x,this.transformRect.y,w,h,menu.colors[menu.colorCurr],0,attr,true,this.view));
                    }
                    
                    if(this.mouseNew=="text"){
                        attr={};
                        attr.text="Aa";
                        attr.size=Math.round(app.fontSize);
                        attr.font=app.fontName;
                        attr.align="left"
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
                        attr.sX=this.transformRect.attr.sX;
                        attr.sY=this.transformRect.attr.sY;
                        attr.sW=this.transformRect.attr.sW;
                        attr.sH=this.transformRect.attr.sH;
                        this.objects.push(new Object(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr],0,attr,true,this.view));
                    }
                    if(this.mouseNew=="anim"){
                        attr={};
                        attr.anim=this.transformRect.attr.anim;
                        attr.frames=this.transformRect.attr.frames;
                        attr.speed=this.transformRect.attr.speed;
                        this.objects.push(new Object(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr],0,attr,true,this.view));
                    }
                    
                    var obj=this.objects[this.objects.length-1];


                    var arr=[];

                    var data={
                        x:this.transformRect.x,
                        y:this.transformRect.y,
                        w:this.transformRect.w,
                        h:this.transformRect.h,
                        i:objectsView,
                        c:JSON.parse(JSON.stringify(menu.colors[menu.colorCurr])),
                        r:0,
                        attr:attr,
                        cam:true,
                        view:this.view,
                        tags:obj.tags,
                        locked:false,
						last:false,
                        name:obj.name
                        }

                    arr.push(data);

                    this.actionsCurr[this.view]++;
                    this.actions[this.view].splice(this.actionsCurr[this.view]);
                    this.actions[this.view].push({
                        action:"create",
                        objects:arr
                    })
                }
				
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
						data.c=JSON.parse(JSON.stringify(this.objects[selectObj[i].i].c));
						data.alpha=this.objects[selectObj[i].i].alpha;
						data.r=this.objects[selectObj[i].i].r;
						data.cam=this.objects[selectObj[i].i].cam;
						data.tags=JSON.parse(JSON.stringify(this.objects[selectObj[i].i].tags));
						data.locked=this.objects[selectObj[i].i].locked;
						data.last=this.objects[selectObj[i].i].last;
						data.tags=this.objects[selectObj[i].i].tags;
						data.name=this.objects[selectObj[i].i].name;
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
			if(this.selectedRect.x!=undefined && ( (jt.kCheck("ctrlL") || jt.kCheck("ctrlR")) && (jt.kPress("c") || jt.kPress("x") || jt.kPress("d")) ) ){
				var arr=[];

				for(var i=0;i<selectObj.length;i++){
					var data={x:0,y:0,w:0,h:0,i:0,c:0,cam:true,view:this.view,code:undefined,setup:undefined,update:undefined}
					data.x=this.objects[selectObj[i].i].x;
					data.y=this.objects[selectObj[i].i].y;
					data.w=this.objects[selectObj[i].i].w;
					data.h=this.objects[selectObj[i].i].h;
					data.i=selectObj[i].i;
					data.attr=this.objects[selectObj[i].i].attr;
					data.c=JSON.parse(JSON.stringify(this.objects[selectObj[i].i].c));
					data.alpha=this.objects[selectObj[i].i].alpha;
					data.r=this.objects[selectObj[i].i].r;
					data.cam=this.objects[selectObj[i].i].cam;
					data.tags=JSON.parse(JSON.stringify(this.objects[selectObj[i].i].tags));
					data.locked=this.objects[selectObj[i].i].locked;
					data.last=this.objects[selectObj[i].i].last;
                    data.name=this.objects[selectObj[i].i].name;
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
					
					views.updateButtons=true;
				}
			}

			//paste
			if(this.copyArr.length!=0 && ( (jt.kCheck("ctrlL") || jt.kCheck("ctrlR")) && (jt.kPress("v") || jt.kPress("d")) ) ){
				views.updateButtons=true;
				var arr=[];

				var objectsView=this.objects.length+1;

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
					data.c=JSON.parse(JSON.stringify(this.copyArr[i].c));
					data.alpha=this.copyArr[i].alpha;
					data.r=this.copyArr[i].r;
					data.cam=this.copyArr[i].cam;
					data.tags=JSON.parse(JSON.stringify(this.copyArr[i].tags));
					data.locked=this.copyArr[i].locked;
					data.last=this.copyArr[i].last;
					data.name=this.copyArr[i].name;
					arr.push(data);
					data.i--;
					if(this.getObject(data.name)!=undefined){
						data.i=this.getObject(data.name)+1;
					}
					if(data.i>this.objects.length){
						data.i=this.objects.length;
					}
					this.objects.splice(data.i,0,new Object(data.x,data.y,data.w,data.h,data.c,data.r,data.attr,data.cam,data.view,data.tags,data.locked,data.last,data.name));
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
			menu.uploadImageSelected=false;
			menu.uploadAnimSelected=false;
			this.transformStart=[];
			this.transformRect=undefined;
			this.translateOffset=[];
			this.mouseNew="";
			//remove selected
			var removeActions=["newRect","newText","newCircle","newEllipse","newLine","newImg","newAnim"];
			for(var i=0;i<menu.buttons.length;i++){
				if(removeActions.indexOf(menu.buttons[i].action)!=-1){
					menu.buttons[i].selected=false;
				}
			}
		}
		
		var zHeld=false;
		var yHeld=false;
		
		if(jt.kCheck("z")){
			this.zDown++;
			if(this.zDown>this.zMax && this.zDown%this.zPer==0){
				zHeld=true;
			}
		}else{
			this.zDown=false;
		}
		
		if(jt.kCheck("y")){
			this.yDown++;
			if(this.yDown>this.yMax && this.yDown%this.yPer==0){
				yHeld=true;
			}
		}else{
			this.yDown=false;
		}

		//ctrl actions
		if(jt.kCheck("ctrlL") || jt.kCheck("ctrlR") || (this.undo || this.redo)){
			if(((jt.kPress("z") || zHeld) || this.undo) && !jt.kCheck("shift")){
				if(this.actions[this.view].length-1>=this.actionsCurr[this.view] && this.actionsCurr[this.view]>=0){
					var action=this.actions[this.view][this.actionsCurr[this.view]];
					if(action.action=="name"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].name=action.objects[i].n1;
						}
					}else if(action.action=="translate"){
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
					}else if(action.action=="color"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].c=action.objects[i].c1;
						}
					}else if(action.action=="alpha"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].alpha=action.objects[i].a1;
						}
					}else if(action.action=="rotate"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].r=action.objects[i].r1;
						}
					}else if(action.action=="rgb"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].c[0]=action.objects[i].r1;
							this.objects[action.objects[i].i].c[1]=action.objects[i].g1;
							this.objects[action.objects[i].i].c[2]=action.objects[i].b1;
						}
					}else if(action.action=="order"){
						for(var i=0;i<action.objects.length;i++){
                            var id1=action.objects[i].id1;
                            var id2=action.objects[i].id2;
                            
                            
                            
                            var copy=JSON.parse(JSON.stringify(this.objects[id2]));
                            
                            if(id1==view.objects.length-1){
                                view.objects.push(copy);
                            }else if(id1==0){
                                view.objects.splice(id1,0,copy);
                            }else if(id2<id1){
                                view.objects.splice(id1+1,0,copy);
                            }else{
                                view.objects.splice(id1,0,copy);
                            }

                            if(id1<id2){
                                id2++;
                            }
                            view.objects.splice(id2,1);
						}
					}else if(action.action=="cam"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].cam=action.objects[i].c1;
						}
					}else if(action.action=="lock"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].locked=action.objects[i].l1;
						}
					}else if(action.action=="last"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].last=action.objects[i].l1;
						}
					}else if(action.action=="view"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].view=action.objects[i].v1;
						}
                        views.updateButtons=true;
					}else if(action.action=="tags"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].tags=action.objects[i].t1;
						}
						views.updateButtons=true;
					}else if(action.action=="text"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.text=action.objects[i].t1;
						}
					}else if(action.action=="size"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.size=action.objects[i].s1;
						}
					}else if(action.action=="font"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.font=action.objects[i].f1;
						}
					}else if(action.action=="align"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.align=action.objects[i].a1;
						}
					}else if(action.action=="lineW"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.lineW=action.objects[i].l1;
						}
					}else if(action.action=="img"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.img=action.objects[i].i1;
						}
					}else if(action.action=="src"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.sX=action.objects[i].x1;
							this.objects[action.objects[i].i].attr.sY=action.objects[i].y1;
							this.objects[action.objects[i].i].attr.sW=action.objects[i].w1;
							this.objects[action.objects[i].i].attr.sH=action.objects[i].h1;
						}
					}else if(action.action=="anim"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.anim=action.objects[i].a1;
						}
					}else if(action.action=="create"){
						views.updateButtons=true;
						var index=0;
						for(var i=0;i<action.objects.length;i++){
							this.objects.splice(action.objects[i].i+index,1);
							index--;
						}

					}else if(action.action=="createTiles"){
						views.updateButtons=true;
						for(var i=0;i<action.objects.length;i++){
							var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
							data.x=action.objects[i].x;
							data.y=action.objects[i].y;
							data.tX=action.objects[i].tX;
							data.tY=action.objects[i].tY;
							data.img=action.objects[i].img;
							data.view=action.objects[i].view;
							
							var ww=view.viewDefaultW;
							var hh=view.viewDefaultH;
							
							var chunkX=Math.floor(data.x/ww)*ww;
							var chunkY=Math.floor(data.y/hh)*hh;
							
							var found=false;
							
							var chunks=menu.tiles[data.view];
							for(var chunkIndex in chunks){
								var chunk=chunks[chunkIndex];
								if(chunk.x==chunkX && chunk.y==chunkY){
									var tilesets=chunk.tilesets
									for(var tilesetIndex in tilesets){
										var tileset=tilesets[tilesetIndex];
										if(tileset.img==data.img){
											//delete tile
											for(var tileIndex in tileset.tiles){
												var tile=tileset.tiles[tileIndex];
												if(tile[0]==data.x && tile[1]==data.y){
													menu.tiles[data.view][chunkIndex].tilesets[tilesetIndex].tiles.splice(tileIndex,1);
													tileIndex--;
													found=true;
													if(found){break;}
												}
											}
										}
										if(found){break;}
									}
								}
								if(found){break;}
							}
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
							data.locked=action.objects[i].locked;
							data.last=action.objects[i].last;
							data.name=action.objects[i].name;
							this.objects.splice(data.i,0,new Object(data.x,data.y,data.w,data.h,data.c,data.r,data.attr,data.cam,data.view,data.tags,data.locked,data.last,data.name));
							if(action.objects[i].code!=undefined){this.objects[data.i].code=action.objects[i].code;}
							if(action.objects[i].setup!=undefined){this.objects[data.i].setup=action.objects[i].setup;}
							if(action.objects[i].update!=undefined){this.objects[data.i].update=action.objects[i].update;}
							this.objects[data.i].alpha=action.objects[i].alpha;
							if(this.objects[data.i].alpha==undefined){this.objects[data.i].alpha=1;}
						}
					}else if(action.action=="deleteTiles"){

						views.updateButtons=true;
						for(var i=0;i<action.objects.length;i++){
							var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
							data.x=action.objects[i].x;
							data.y=action.objects[i].y;
							data.tX=action.objects[i].tX;
							data.tY=action.objects[i].tY;
							data.img=action.objects[i].img;
							data.view=action.objects[i].view;
							
							var ww=view.viewDefaultW;
							var hh=view.viewDefaultH;
							
							var chunkX=Math.floor(data.x/ww)*ww;
							var chunkY=Math.floor(data.y/hh)*hh;
							
							var chunks=menu.tiles[data.view];
							for(var chunkIndex in chunks){
								var chunk=chunks[chunkIndex];
								if(chunk.x==chunkX && chunk.y==chunkY){
									var tilesets=chunk.tilesets
									for(var tilesetIndex in tilesets){
										var tileset=tilesets[tilesetIndex];
										if(tileset.img==data.img){
											//add tile
											menu.tiles[data.view][chunkIndex].tilesets[tilesetIndex].tiles.push([data.x,data.y,data.tX,data.tY]);
										}
									}
								}
							}
						}
					}
					this.actionsCurr[this.view]--;
				}
			}
			if(((jt.kPress("y") || yHeld) || this.redo) || (jt.kCheck("shift") && jt.kPress("z"))){
				if(this.actions[this.view].length-1>=this.actionsCurr[this.view]+1){
					var action=this.actions[this.view][this.actionsCurr[this.view]+1];
					if(action.action=="name"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].name=action.objects[i].n2;
						}
					}else if(action.action=="translate"){
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
					}else if(action.action=="color"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].c=action.objects[i].c2;
						}
					}else if(action.action=="alpha"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].alpha=action.objects[i].a2;
						}
					}else if(action.action=="rotate"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].r=action.objects[i].r2;
						}
					}else if(action.action=="rgb"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].c[0]=action.objects[i].r2;
							this.objects[action.objects[i].i].c[1]=action.objects[i].g2;
							this.objects[action.objects[i].i].c[2]=action.objects[i].b2;
						}
					}else if(action.action=="order"){
						for(var i=0;i<action.objects.length;i++){
                            var id1=action.objects[i].id1;
                            var id2=action.objects[i].id2;
                            
                            var copy=JSON.parse(JSON.stringify(this.objects[id1]));
                            
                            if(id2==view.objects.length-1){
                                view.objects.push(copy);
                            }else if(id2==0){
                                view.objects.splice(id2,0,copy);
                            }else if(id1<id2){
                                view.objects.splice(id2+1,0,copy);
                            }else{
                                view.objects.splice(id2,0,copy);
                            }

                            if(id2<id1){
                                id1++;
                            }
                            view.objects.splice(id1,1);
						}
					}else if(action.action=="cam"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].cam=action.objects[i].c2;
						}
					}else if(action.action=="lock"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].locked=action.objects[i].l2;
						}
					}else if(action.action=="last"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].last=action.objects[i].l2;
						}
					}else if(action.action=="view"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].view=action.objects[i].v2;
						}
                        views.updateButtons=true;
					}else if(action.action=="tags"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].tags=action.objects[i].t2;
						}
					}else if(action.action=="text"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.text=action.objects[i].t2;
						}
					}else if(action.action=="size"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.size=action.objects[i].s2;
						}
					}else if(action.action=="font"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.font=action.objects[i].f2;
						}
					}else if(action.action=="align"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.align=action.objects[i].a2;
						}
					}else if(action.action=="lineW"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.lineW=action.objects[i].l2;
						}
					}else if(action.action=="img"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.img=action.objects[i].i2;
						}
					}else if(action.action=="src"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.sX=action.objects[i].x2;
							this.objects[action.objects[i].i].attr.sY=action.objects[i].y2;
							this.objects[action.objects[i].i].attr.sW=action.objects[i].w2;
							this.objects[action.objects[i].i].attr.sH=action.objects[i].h2;
						}
					}else if(action.action=="anim"){
						for(var i=0;i<action.objects.length;i++){
							this.objects[action.objects[i].i].attr.anim=action.objects[i].a2;
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
							arr[10]=action.objects[i].locked;
							arr[11]=action.objects[i].last;
							arr[12]=action.objects[i].name;
							var ii=action.objects[i].i;
							this.objects.splice(ii,0,new Object(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12]));
							if(action.objects[i].code!=undefined){this.objects[ii].code=action.objects[i].code;}
							if(action.objects[i].setup!=undefined){this.objects[ii].setup=action.objects[i].setup;}
							if(action.objects[i].update!=undefined){this.objects[ii].update=action.objects[i].update;}
							this.objects[ii].alpha=action.objects[i].alpha;
							if(this.objects[ii].alpha==undefined){this.objects[ii].alpha=1;}
						}

					}else if(action.action=="createTiles"){
						views.updateButtons=true;
						for(var i=0;i<action.objects.length;i++){
							var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
							data.x=action.objects[i].x;
							data.y=action.objects[i].y;
							data.tX=action.objects[i].tX;
							data.tY=action.objects[i].tY;
							data.img=action.objects[i].img;
							data.view=action.objects[i].view;
							
							var ww=view.viewDefaultW;
							var hh=view.viewDefaultH;
							
							var chunkX=Math.floor(data.x/ww)*ww;
							var chunkY=Math.floor(data.y/hh)*hh;
							
							var chunks=menu.tiles[data.view];
							for(var chunkIndex in chunks){
								var chunk=chunks[chunkIndex];
								if(chunk.x==chunkX && chunk.y==chunkY){
									var tilesets=chunk.tilesets
									for(var tilesetIndex in tilesets){
										var tileset=tilesets[tilesetIndex];
										if(tileset.img==data.img){
											//add tile
											menu.tiles[data.view][chunkIndex].tilesets[tilesetIndex].tiles.push([data.x,data.y,data.tX,data.tY]);
										}
									}
								}
							}
						}
					}else if(action.action=="delete"){
						views.updateButtons=true;
						var index=0;
						for(var i=0;i<action.objects.length;i++){
							this.objects.splice(action.objects[i].i+index,1);
							index--;
						}
					}else if(action.action=="deleteTiles"){

						views.updateButtons=true;
						for(var i=0;i<action.objects.length;i++){
							var data={x:0,y:0,tX:0,tY:0,img:"",view:this.view}
							data.x=action.objects[i].x;
							data.y=action.objects[i].y;
							data.tX=action.objects[i].tX;
							data.tY=action.objects[i].tY;
							data.img=action.objects[i].img;
							data.view=action.objects[i].view;
							
							var ww=view.viewDefaultW;
							var hh=view.viewDefaultH;
							
							var chunkX=Math.floor(data.x/ww)*ww;
							var chunkY=Math.floor(data.y/hh)*hh;
							
							var found=false;
							
							var chunks=menu.tiles[data.view];
							for(var chunkIndex in chunks){
								var chunk=chunks[chunkIndex];
								if(chunk.x==chunkX && chunk.y==chunkY){
									var tilesets=chunk.tilesets
									for(var tilesetIndex in tilesets){
										var tileset=tilesets[tilesetIndex];
										if(tileset.img==data.img){
											//delete tile
											for(var tileIndex in tileset.tiles){
												var tile=tileset.tiles[tileIndex];
												if(tile[0]==data.x && tile[1]==data.y){
													menu.tiles[data.view][chunkIndex].tilesets[tilesetIndex].tiles.splice(tileIndex,1);
													tileIndex--;
													found=true;
													if(found){break;}
												}
											}
										}
										if(found){break;}
									}
								}
								if(found){break;}
							}
						}
					}
					
					this.actionsCurr[this.view]++;
				}
			}
		}
        
        this.undo=false;
        this.redo=false;
        
        //Check for action messages
        //var len=Object.keys(this.actions).length;
		var currDiff=0;
        if(this.actionsView==this.view){
            if(this.actionsLast!=this.actionsCurr[this.view]){
				var diff=this.actionsLast-this.actionsCurr[this.view];
				for(var i=0;i<jt.abs(diff);i++){
					if(i>1){
						if(jt.sign(diff)==-1){
							this.actionsCurr[this.view]--;
							currDiff++;
						}else{
							this.actionsCurr[this.view]++;
							currDiff--;
						}
					}
					if(this.actions[this.view].length>0){
						//Get main action
						var text="";
						var mod=0;
						var logMod=0;
						var normal=false;
						if(this.actionsLast>this.actionsCurr[this.view]){
							text="Undo ";
							mod++;
						}else if((jt.kPress("y") || this.redo) || (jt.kCheck("shift") && jt.kPress("z"))){
							text="Redo ";
							logMod++;
						}else{
							text="Changed ";
							normal=true;
							logMod++;
						}

						this.actionsCurr[this.view]+=mod;

						//Get category
						/*console.log(this.actions)
						console.log(this.view)
						console.log(this.actionsCurr)
						console.log(this.actions[this.view])
						console.log(this.actionsCurr[this.view])*/
						var action=this.actions[this.view][this.actionsCurr[this.view]];
						var category="";
						category=action.action+" of ";
						if(action.action=="delete"){
							if(normal){
								text="Deleted ";
								category="";
							}
						}else if(action.action=="create"){
							if(normal){
								text="Created ";
								category="";
							}
						}else if(action.action=="deleteTiles"){
							if(normal){
								text="Deleted tiles ";
								category="";
							}
						}else if(action.action=="createTiles"){
							if(normal){
								text="Created tiles ";
								category="";
							}
						}

						//Get name
						var name=""
						if(action.action=="order"){
							if(mod>0){
								name=this.objects[action.objects[0].id1].name
							}else{
								name=this.objects[action.objects[0].id2].name
							}
						}else if(action.action=="name"){
							if(mod>0){
								name=action.objects[0].n2+" to "+action.objects[0].n1;
							}else{
								name=action.objects[0].n1+" to "+action.objects[0].n2;
							}
						}else if(action.action=="delete"){
							name=action.objects[0].name;
						}else if(action.action=="deleteTiles"){
							name=action.objects[0].img;
						}else if(action.action=="create"){
							name=action.objects[0].name;
						}else if(action.action=="createTiles"){
							name=action.objects[0].img;
						}else{
							name=this.objects[action.objects[0].i].name
						}

						if(action.objects.length>1){
							name=action.objects.length+" objects";
						}

						this.actionsMsgs.push([text+category+name,this.actionsDur]);
						if(this.actionsMsgs.length>3){
							this.actionsMsgs.splice(0,1);
						}

						console.log("(JTE LOG "+(this.actionsCurr[this.view]+logMod)+"/"+this.actions[this.view].length+") "+text+category+name)

						this.actionsCurr[this.view]-=mod;
					}
				}
            }
        }else{
            this.actionsMsgs=[];
        }
		this.actionsCurr[this.view]+=currDiff;
        this.actionsView=this.view;
        this.actionsLast=this.actionsCurr[this.view];



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
		if(menu.tLayer<this.objects.length){
			for(var i=0;i<menu.tLayer;i++){
				if(this.objects[i].view==this.view || this.objects[i].view==""){
					this.drawObject(this.objects[i],true);
				}
			}
		}else{
			for(var i=0;i<this.objects.length;i++){
				if(this.objects[i].view==this.view || this.objects[i].view==""){
					this.drawObject(this.objects[i],true);
				}
			}

		}
		
		//Draw tiles
		if(menu.tiles[this.view]!=undefined){
			if(inspector.tileset){
				jt.alpha(1);
			}else{
				jt.alpha(menu.tAlpha);
			}
			
			var ww=view.viewDefaultW;
			var hh=view.viewDefaultH;
			
			//Only draw included chunks
			var chunkX=Math.floor(jt.cam().x/ww)*ww;
			var chunkY=Math.floor(jt.cam().y/hh)*hh;
			
			var chunkX2=Math.ceil((jt.cam().x+jt.cam().w)/ww)*ww;
			var chunkY2=Math.ceil((jt.cam().y+jt.cam().h)/hh)*hh;
			
			var chunkW=(chunkX2-chunkX)/ww;
			var chunkH=(chunkY2-chunkY)/hh;
			
			var chunkXs=[];
			var chunkYs=[];
			
			for(var yy=0;yy<chunkH;yy++){
				for(var xx=0;xx<chunkW;xx++){
					chunkXs.push(chunkX+(xx*ww));
					chunkYs.push(chunkY+(yy*hh));
				}
			}
			
			//Draw all chunks for now
			for(var chunkIndex in menu.tiles[this.view]){
				if(chunkXs.indexOf(menu.tiles[this.view][chunkIndex].x)!=-1 && chunkYs.indexOf(menu.tiles[this.view][chunkIndex].y)!=-1){
					var tilesets=menu.tiles[this.view][chunkIndex].tilesets;
					for(var tilesetIndex in tilesets){
						//Tileset individual params
						var tileset=tilesets[tilesetIndex];
						var img=tileset.img;
						var unit=tileset.unit;
						
						//Tileset 
						var tileW=menu.tilesets[img].tileW
						var tileH=menu.tilesets[img].tileH
						var tileOffX=menu.tilesets[img].tileOffX
						var tileOffY=menu.tilesets[img].tileOffY
						
						//Draw all tiles
						var tiles=tileset.tiles;
						for(var tileIndex in tiles){
							var tile=tiles[tileIndex];
							jt.image(img,tile[0],tile[1],unit,unit,0,tile[2]*tileW+tileOffX,tile[3]*tileH+tileOffY,tileW,tileH);
						}
					}
				}
			}
			
			jt.alpha(1);
		}
		
		if(menu.tLayer<this.objects.length){
			for(var i=menu.tLayer;i<this.objects.length;i++){
				if(this.objects[i].view==this.view || this.objects[i].view==""){
					this.drawObject(this.objects[i],true);
				}
			}
		}
		
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].last && (this.objects[i].view==this.view || this.objects[i].view=="")){
				this.drawObject(this.objects[i],true);
			}
		}

		//grid
		if(menu.showGrid){

			var a=menu.gridAlpha;
			var c=[0,0,0,a];
			var w=0.25;
			if(app.dark){c=[255,255,255,a];w=0.5}
			for(var y=-menu.gridUnit;y<this.viewDefaultH+menu.gridUnit+1;y+=menu.gridUnit){
				jt.rect(0+menu.gridX,y+menu.gridY,this.viewDefaultW,w,c);
			}

			for(var x=-menu.gridUnit;x<this.viewDefaultW+menu.gridUnit+1;x+=menu.gridUnit){
				jt.rect(x+menu.gridX,0+menu.gridY,w,this.viewDefaultH,c);
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
            if(this.mouseNew=="circle"){
                var biggest=this.transformRect.w;
                if(this.transformRect.h>this.transformRect.w){
                    biggest=this.transformRect.h;
                }
				jt.circle(this.transformRect.x,this.transformRect.y,biggest,menu.colors[menu.colorCurr])
			}
            if(this.mouseNew=="ellipse"){
				jt.ellipse(this.transformRect.x,this.transformRect.y,this.transformRect.w,this.transformRect.h,menu.colors[menu.colorCurr])
			}
            if(this.mouseNew=="line"){
				var x=this.transformRect.x;
				var y=this.transformRect.y;
				var w=this.transformRect.x+this.transformRect.w;
				var h=this.transformRect.y+this.transformRect.h;

                if(jt.mCX()>this.mouseX){
                    x=this.transformRect.x+this.transformRect.w;
                    w=this.transformRect.x;
                }
                if(jt.mCY()>this.mouseY){
                    y=this.transformRect.y+this.transformRect.h;
                    h=this.transformRect.y;
                }
                jt.line(x,y,w,h,1,menu.colors[menu.colorCurr])
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
		
		//Draw current tileset
		if(inspector.tileset && menu.uploadsImage.length>0){
			var img=menu.uploadsImage[menu.uploadImageNum].name;
			var x=jt.mCX()
			var y=jt.mCY()
			if(menu.snapGrid){
				x-=menu.gridX;
				y-=menu.gridY;
				x=jt.floor(x/menu.gridUnit)*menu.gridUnit+menu.gridX;
				y=jt.floor(y/menu.gridUnit)*menu.gridUnit+menu.gridY;
			}
			var sX=inspector.tileX*inspector.tileW+inspector.tileOffX;
			var sY=inspector.tileY*inspector.tileH+inspector.tileOffY;
			var sW=inspector.tileW;
			var sH=inspector.tileH;
			
			jt.alpha(0.5);
			for(var yy=0;yy<inspector.tileSize;yy++){
				for(var xx=0;xx<inspector.tileSize;xx++){
					jt.image(img,x+(xx*menu.gridUnit),y+(yy*menu.gridUnit),menu.gridUnit,menu.gridUnit,0,sX,sY,sW,sH);
					jt.rectB(x+(xx*menu.grridUnit),y+(yy*menu.gridUnit),menu.gridUnit,menu.gridUnit,"black",0,1)
				}
			}
			
			jt.alpha(1);
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
		jt.baseline("top");
		jt.text(Math.round(jt.mCX())+" "+Math.round(jt.mCY())+" ",jt.pX(80),jt.pY(98),"black","right");
		

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
				jt.text(str,jt.pX(25)+jt.pX(10)*i,jt.pY(15.25),cText,"center");
			}else{
				jt.text(str,jt.pX(24)+jt.pX(10)*i,jt.pY(15.25),cText,"center");
				jt.rect(jt.pX(28)+jt.pX(10)*i+1,jt.pY(15)+1,jt.pX(2)-2,jt.pY(2)-2,"red");
				jt.text("X",jt.pX(29)+jt.pX(10)*i,jt.pY(15.25),c,"center");
			}


		}
        
        //Action messages
        jt.camActive(false);
        jt.fontSize(20);
        if(this.showActions){
            for(var i=0;i<this.actionsMsgs.length;i++){
                this.actionsMsgs[i][1]--;

                var alpha=1;
                if(this.actionsMsgs[i][1]<this.actionsDur/2){
                    alpha=this.actionsMsgs[i][1]/(this.actionsDur/2);
                }

                //alpha=alpha/2;

                var offsetX=jt.pX(1);
                var offsetY=jt.pY(1);
                var y=jt.h()-((jt.fontSize()+offsetY)*(i+1));

                jt.text(this.actionsMsgs[i][0],jt.pX(20)+offsetX,y,[127,127,127,alpha],"left");

                if(this.actionsMsgs[i][1]<0){
                    this.actionsMsgs.splice(i,1);
                    i--;
                }
            }
        }


	},
	drawObject:function(o,outline){
		var c=o.c;
		var r=o.r;
		var obj={x:o.x,y:o.y,w:o.w,h:o.h,attr:o.attr,selected:o.selected,alpha:o.alpha};

		var draw=true;
		if(obj.x+obj.w<jt.cam().x-jt.cam().w){draw=false};
		if(obj.x>jt.cam().x+jt.cam().w*2){draw=false};
		if(obj.y+obj.h<jt.cam().y-jt.cam().h){draw=false};
		if(obj.y>jt.cam().y+jt.cam().h*2){draw=false};
		 
		if(draw){

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
					var w1=jt.textW("a")/ratioCam;
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
						jt.image(obj.attr.img,obj.x,obj.y,obj.w,obj.h,r,obj.attr.sX,obj.attr.sY,obj.attr.sW,obj.attr.sH);
					}else{
						jt.rect(obj.x,obj.y,obj.w,obj.h,"black",r);
					}
				}else if(obj.attr.anim!=undefined){
					if(jt.assets.anims[obj.attr.anim]!=undefined){
						jt.anim(obj.attr.anim,obj.x,obj.y,obj.w,obj.h,r);
					}else{
						jt.rect(obj.x,obj.y,obj.w,obj.h,"black",r);
					}
				}else if(obj.attr.shape!=undefined){
					if(obj.attr.shape=="circle"){
						var biggest=obj.w;
						if(obj.h>obj.w){
							biggest=obj.h;
						}
						jt.circle(obj.x,obj.y,biggest,c)
					}else if(obj.attr.shape=="ellipse"){
						jt.ellipse(obj.x,obj.y,obj.w,obj.h,c,r)
					}else if(obj.attr.shape=="line"){
						var x=obj.x;
						var y=obj.y;
						var w=obj.x+obj.w;
						var h=obj.y+obj.h;
						if(obj.attr.dirX==-1){
							x=obj.x+obj.w
							w=obj.x;
						}
						if(obj.attr.dirY==-1){
							y=obj.y+obj.h
							h=obj.y;
						}
						jt.line(x,y,w,h,obj.attr.lineW,c,r)
					}
				}
			}else{
				jt.rect(obj.x,obj.y,obj.w,obj.h,c,r);
				if(r%360!=0 && this.showRot){
					jt.rectB(obj.x,obj.y,obj.w,obj.h,c,0,2)
				}
			}
			if(changeAlpha){
				jt.alpha(1)
			}
			if(obj.selected && outline){
				jt.rectB(obj.x,obj.y,obj.w,obj.h,[0,0,0,0.75],r,2);
			}
		}
	},
	resetView:function(name){
		justReset=false;
		if(name!=undefined){
			if(name in views.viewsCam){
				var savedCam=views.viewsCam[name];
				jt.cam().x=savedCam.x
				jt.cam().y=savedCam.y
				jt.cam().w=savedCam.w
				jt.cam().h=savedCam.h
			}else{
				justReset=true;
			}
		}else{
			justReset=true;
		}

		if(justReset){
			jt.cam().x=this.camDefault.x;
			jt.cam().y=this.camDefault.y;
			jt.cam().w=this.camDefault.w;
			jt.cam().h=this.camDefault.h;

			//jt.cam().w=window.innerWidth*app.pR;
			//jt.cam().h=window.innerHeight*app.pR;
		}

	}
};
