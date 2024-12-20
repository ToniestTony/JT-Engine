var fullPage=[`<html>
    <head>
        <title>App</title>
        <style>
		*{
			padding: 0;
			margin: 0;
			overflow:hidden;
		}

		#jeuCanvas{
			position: absolute;
			margin:auto;
			top:0;
			left:0;
			right:0;
			bottom:0;
			border:1px solid;
		}

		#jeuCanvas + span{
			display: none;
		}

		#canContainer{
			text-align:center;
			position:relative;
			width:100%;
			height:100%;
		}
        </style>
    </head>
    <body>

        <div id="canContainer"><canvas id="jeuCanvas"></canvas><span>Made with <a href="https://github.com/ToniestTony/jt_lib">jt_lib22.js</a></span></div>

    </body>
	<script src="jquery.js"></script>
	`,`
    <script src="jt_lib22.js"></script>

    <script>
	`,`
	function JTEObject(x,y,w,h,c,r,alpha,attr,cam,v,tags,locked,last,name){
		if(x==undefined){x=0;}
		if(y==undefined){y=0;}
		if(w==undefined){w=10;}
		if(h==undefined){h=10;}
		if(c==undefined){c=[0,0,0];}
		if(r==undefined){r=0;}
		if(alpha==undefined){alpha=1;}
		if(attr==undefined){attr=undefined;}
		if(cam==undefined){cam=true;}
		if(v==undefined){v=jte.view;}
		if(tags==undefined){tags=[""];}
		if(locked==undefined){locked=false;}
		if(last==undefined){last=-1;}
		if(name==undefined){name="Obj"+jte.objects.length;}
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.c=c;
		this.r=r;
		this.alpha=alpha;

		this.attr=attr;

		this.cam=cam;
		this.view=v;
		this.tags=tags;

		this.locked=locked;
		this.last=last;
    
		this.name=name;

	}

	var jte={
		w:`,`,
		h:`,`,
		originalW:0,
		originalH:0,
		title:"`,`",
		maximize:`,`,
		ratio:false,
		socket:`,`,
		fontSize:20,
		gridUnit:"`,`",
		path:"`,`",

		objects:[],

		tileLayer:`,`,
		tilesets:`,`,
		tiles:`,`,
		
		views:`,`,
		view:"Start",

		bg:`,`,

		code:"",

		pR:1,

		initialize:function(){
			`,`
			for(var i=0;i<this.objects.length;i++){
				if(this.objects[i].attr!='undefined'){
					this.objects[i].attr=JSON.parse(this.objects[i].attr);
				}else{
					this.objects[i].attr=undefined;
				}
				this.objects[i].tags=JSON.parse(this.objects[i].tags);
				//this.objects[i].setup();
			}
		},

		//setup is called when the game has finished loading
		setup:function(){
			this.originalW=this.w;
			this.originalH=this.h;
			//jt.fullscreen();
			jt.baseline("hanging");
			jt.pixelRate(this.pR);

			if(this.title!=""){document.title=this.title;}

			jt.resize(this.w*this.pR,this.h*this.pR);
			//can.style.width=this.w;
			//can.style.height=this.h;
			jt.canvas.ctx.scale(this.pR,this.pR);

			jt.cam().w=this.w*this.pR;
			jt.cam().h=this.h*this.pR;

			jt.smoothing(false);

			//eval codes
			if(this.code!=undefined){
				eval(this.code);
			}
			
			this.initialize();

			this.setups();
		},
		setups:function(){
			for(var i=0;i<this.objects.length;i++){
				if(this.objects[i].setup!=undefined){
					this.objects[i].setup();
				}
			}
		},
		//update is called every frame
		update:function(){
			jt.bg(this.bg);
			if(this.tileLayer<this.objects.length){
				for(var i=0;i<this.tileLayer;i++){
					if(this.objects[i].view==jte.view || this.objects[i].view==""){
						if(this.objects[i].update!=undefined){
							this.objects[i].update();
						}
					}
				}
			}else{
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].view==jte.view || this.objects[i].view==""){
						if(this.objects[i].update!=undefined){
							this.objects[i].update();
						}
					}
				}
			}
			
			//Draw tiles
			if(this.tiles[jte.view]!=undefined){
				jt.camactive(true);
				
				//Draw only close chunks
				var chunkX=Math.floor(jt.cam().x/jte.w)*jte.w;
				var chunkY=Math.floor(jt.cam().y/jte.h)*jte.h;
				
				var chunkX2=Math.ceil((jt.cam().x+jt.cam().w)/jte.w)*jte.w;
				var chunkY2=Math.ceil((jt.cam().y+jt.cam().h)/jte.h)*jte.h;
				
				var chunkW=(chunkX2-chunkX)/jte.w;
				var chunkH=(chunkY2-chunkY)/jte.h;
				
				var chunkXs=[];
				var chunkYs=[];
				
				for(var yy=0;yy<chunkH;yy++){
					for(var xx=0;xx<chunkW;xx++){
						chunkXs.push(chunkX+(xx*jte.w));
						chunkYs.push(chunkY+(yy*jte.h));
					}
				}
				for(var chunkIndex in this.tiles[this.view]){
					if(chunkXs.indexOf(this.tiles[this.view][chunkIndex].x)!=-1 && chunkYs.indexOf(this.tiles[this.view][chunkIndex].y)!=-1){
						var tilesets=this.tiles[this.view][chunkIndex].tilesets;
						for(var tilesetIndex in tilesets){
							//Tileset individual params
							var tileset=tilesets[tilesetIndex];
							var img=tileset.img;
							var unit=tileset.unit;
							
							//Tileset 
							var tileW=this.tilesets[img].tileW
							var tileH=this.tilesets[img].tileH
							var tileOffX=this.tilesets[img].tileOffX
							var tileOffY=this.tilesets[img].tileOffY
							
							//Draw all tiles
							var tiles=tileset.tiles;
							for(var tileIndex in tiles){
								var tile=tiles[tileIndex];
								jt.image(img,tile[0],tile[1],unit,unit,0,tile[2]*tileW+tileOffX,tile[3]*tileH+tileOffY,tileW,tileH);
							}
						}
					}
				}
			}
			
			//Objects on top
			if(this.tileLayer<this.objects.length){
				for(var i=this.tileLayer;i<this.objects.length;i++){
					if(this.objects[i].view==jte.view || this.objects[i].view==""){
						if(this.objects[i].update!=undefined){
							this.objects[i].update();
						}
					}
				}
			}
		},

		//getObject
		getObject:function(name,view){
			var found=undefined;
			if(view==undefined){
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].name==name){
						found=this.objects[i];
						break;
					}
				}
			}else{
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].name==name && this.objects[i].view==view){
						found=this.objects[i];
						break;
					}
				}
			}
			return found;
		},

		//getObjects
		getObjects:function(tags,view,and){
			var found=[];
			if(tags==undefined){
				if(view==undefined){
					for(var i=0;i<this.objects.length;i++){
						found.push(this.objects[i]);
					}
				}else{
					for(var i=0;i<this.objects.length;i++){
						if(this.objects[i].view==view){
							found.push(this.objects[i]);
						}
					}
				}
				return found;
			}else{
				if(view==undefined){
					for(var i=0;i<this.objects.length;i++){
						for(var j=0;j<this.objects[i].tags.length;j++){
							if(tags.indexOf(this.objects[i].tags[j])!=-1){
								found.push(this.objects[i]);
								break;
							}
						}
					}
				}else{
					if(and==undefined || and==false){
						for(var i=0;i<this.objects.length;i++){
							for(var j=0;j<this.objects[i].tags.length;j++){
								if(this.objects[i].view==view){
									if(tags.indexOf(this.objects[i].tags[j])!=-1){
										found.push(this.objects[i]);
										break;
									}
								}
							}
						}
					}else if(and==true){
						for(var i=0;i<this.objects.length;i++){
							var tag=0;
							for(var j=0;j<this.objects[i].tags.length;j++){
								if(this.objects[i].view==view){
									if(tags.indexOf(this.objects[i].tags[j])!=-1){
										tag++;
										if(tag==tags.length){
											found.push(this.objects[i]);
											break;
										}
									}else{
										break;
									}
								}else{
									break;
								}
							}
						}
					}
				}
				return found;
			}
		},

		//delObject
		delObject:function(name,view){
			var found=false;
			if(view==undefined){
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].name==name){
						found=true;
						this.objects.splice(i,1);
						break;
					}
				}
			}else{
				for(var i=0;i<this.objects.length;i++){
					if(this.objects[i].name==name && this.objects[i].view==view){
						found=true;
						this.objects.splice(i,1);
						break;
					}
				}
			}
			return found;
		},
		
		
		//delObjects
		delObjects:function(tags,view,and){
			var found=[];
			if(tags==undefined){
				if(view==undefined){
					for(var i=0;i<this.objects.length;i++){
						found.push(this.objects[i].name);
					}
				}else{
					for(var i=0;i<this.objects.length;i++){
						if(this.objects[i].view==view){
							found.push(this.objects[i].name);
						}
					}
				}
			}else{
				if(view==undefined){
					for(var i=0;i<this.objects.length;i++){
						for(var j=0;j<this.objects[i].tags.length;j++){
							if(tags.indexOf(this.objects[i].tags[j])!=-1){
								found.push(this.objects[i].name);
								break;
							}
						}
					}
				}else{
					if(and==undefined || and==false){
						for(var i=0;i<this.objects.length;i++){
							for(var j=0;j<this.objects[i].tags.length;j++){
								if(this.objects[i].view==view){
									if(tags.indexOf(this.objects[i].tags[j])!=-1){
										found.push(this.objects[i].name);
										break;
									}
								}
							}
						}
					}else if(and==true){
						for(var i=0;i<this.objects.length;i++){
							var tag=0;
							for(var j=0;j<this.objects[i].tags.length;j++){
								if(this.objects[i].view==view){
									if(tags.indexOf(this.objects[i].tags[j])!=-1){
										tag++;
										if(tag==tags.length){
											found.push(this.objects[i].name);
											break;
										}
									}else{
										break;
									}
								}else{
									break;
								}
							}
						}
					}
				}
			}
			for(var i=0;i<found.length;i++){
				this.delObject(found[i]);
			}
		},

		//x,y,w,h,c,alpha,attr,cam,v,name
		//newObject
		newObject:function(x,y,w,h,c,r,alpha,attr,cam,view,tags,name){
			var n="";
			if(typeof x === 'object' && x !== null){
				if(x.name==undefined){
					x.name="Obj"+jte.objects.length;
					n=x.name;
				}else{
					n=x.name;
				}
				jte.objects.push(new JTEObject(x.x,x.y,x.w,x.h,x.c,x.r,x.alpha,x.attr,x.cam,x.view,x.tags,false,false,n))
			}else if(typeof x === 'number'){
				if(name==undefined){
					name="Obj"+jte.objects.length;
				}
				n=name;
				jte.objects.push(new JTEObject(x,y,w,h,c,r,alpha,attr,cam,view,tags,false,false,n))
			}
			return jte.getObject(n);
		},

		//setView
		setView:function(name){
			if(jte.views.indexOf(name)!=-1){
				jte.view=name;
			}
		},

		//getView
		getView:function(index){
			if(index==undefined){
				return jte.view;
			}else{
				if(typeof index=="number"){
					return jte.views[index];
				}else{
					if(jte.views.indexOf(index)!=-1){
						return jte.views.indexOf(index);
					}
				}
			}
		},

		//getViews
		getViews:function(){
			return jte.views;
		},

		//draw objects
		draw:function(o){
			if(o.view=="" || o.view==this.view){
				var outline=false;
				var c=o.c;
				var r=o.r;
				var obj={x:o.x,y:o.y,w:o.w,h:o.h,attr:o.attr,selected:o.selected,alpha:o.alpha};

				var draw=true;
				
				var cam=jt.camactive();
				if(o.cam==false){
					jt.camactive(false);
					if(obj.x+obj.w<-jt.w()){draw=false};
					if(obj.x>jt.w()*2){draw=false};
					if(obj.y+obj.h<-jt.h()){draw=false};
					if(obj.y>jt.h()*2){draw=false};
				}else{
					jt.camactive(true);
					if(obj.x+obj.w<jt.cam().x-jt.cam().w){draw=false};
					if(obj.x>jt.cam().x+jt.cam().w*2){draw=false};
					if(obj.y+obj.h<jt.cam().y-jt.cam().h){draw=false};
					if(obj.y>jt.cam().y+jt.cam().h*2){draw=false};
				}
				
				if(draw){
				
					//change alpha
					var changeAlpha=false;
					if(obj.alpha!=1){
						changeAlpha=true;
						jt.alpha(o.alpha);
					}

					if(obj.attr!=undefined){
						if(obj.attr.text!=undefined){
							jt.baseline("top");
							var t=obj.attr.text;
							var fS=jte.fontSize;
							var font="Consolas";
							var align="left";
							var alwaysShow=true
							var offset=0;

							if(obj.attr.size!=undefined){fS=obj.attr.size}
							if(obj.attr.font!=undefined){font=obj.attr.font}
							if(obj.attr.align!=undefined){align=obj.attr.align}
							if(obj.attr.alwaysShow!=undefined){alwaysShow=obj.attr.alwaysShow}

							var ratioCam=jt.w()/jt.cam().w;
							var divider=1;
							if(o.cam==true){
								fS*=ratioCam;
								divider=ratioCam
							}

							if(align=="center"){
								offset=obj.w/2;
							}

							if(align=="right"){
								offset=obj.w;
							}

							jt.font(font,fS);
							var w=jt.textW(t)/divider;
							var w1=jt.textW("a")/divider;
							var h=jt.textH(t)/divider;
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
							if(jt.assets.images[obj.attr.anim]!=undefined){
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
					}
					if(changeAlpha){
						jt.alpha(1)
					}
					if(obj.selected && outline){
						jt.rectB(obj.x,obj.y,obj.w,obj.h,[0,0,0,0.75],r,2);
					}
				}
				jt.camactive(cam);
			}
		}
	}

	//define the jt object on a global scale
	var jt=undefined;

	var interval=undefined;

	var loadEval=[];

	function loadAssets(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i].type=="image"){
				loadEval.push("jt.loadImage('"+arr[i].path+"','"+arr[i].name+"');")
			}else if(arr[i].type=="audio"){
				loadEval.push("jt.loadSound('"+arr[i].path+"','"+arr[i].name+"',"+arr[i].repeat+","+arr[i].volume+");")
			}else if(arr[i].type=="anim"){
				loadEval.push("jt.loadAnim('"+arr[i].path+"','"+arr[i].name+"',"+arr[i].frames+","+arr[i].speed+");")
			}
		}
	}


	function loadJt(){
		clearInterval(interval);
		//parameters of the JT object:
		//id of the canvas
		//width
		//height
		//frames per second
		//setup function name
		//update function name
		//name of the object which has the setup and update functions
		//fullScreen button on mobile

		jt=new JT("jeuCanvas",jte.w,jte.h,60,'setup','update','jte',jte.maximize);

		jt.getObject=function(name,view){return jte.getObject(name,view)};
		jt.get=function(name,view){return jte.getObject(name,view)};
		jt.getObjects=function(tags,view,and){return jte.getObjects(tags,view,and)};
		jt.gets=function(tags,view,and){return jte.getObjects(tags,view,and)};
		jt.delObject=function(name,view){return jte.delObject(name,view)};
		jt.delObjects=function(tags,view,and){return jte.delObjects(tags,view,and)};
		jt.newObject=function(x,y,w,h,c,r,alpha,attr,cam,view,tags,name){return jte.newObject(x,y,w,h,c,r,alpha,attr,cam,view,tags,name)};
		jt.setView=function(view){return jte.setView(view)};
		jt.getView=function(index){return jte.getView(index)};
		jt.getViews=function(){return jte.getViews()};
		jt.drawObject=function(obj){return jte.draw(obj)};

		for(var i=0;i<loadEval.length;i++){
			eval(loadEval[i])
		}
		//jt.loadImage("image.png","name")
		//jt.loadSound("sound.mp3","name")
		//jt.loadAnim("src.png","name",number of frames,fps);
	}
	`,`


	//you can also use $(document).ready(function(){}); with jQuery
	$(document).ready(function(){
		if(jte.code!=undefined){
			loadJt();
		}else{
			interval=setInterval(function(){if(jte.code!=undefined){
			loadJt();}},10);
		}
	});


	`,`
	</script>
</html>`]
