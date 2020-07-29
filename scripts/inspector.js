var fullPage=[`<html>
    <head>
        <title>App</title>
        <style>
		*{
			padding: 0;
			margin: 0;
		}
            
		#can{
			position: absolute;
			margin:auto;
			top:0;
			left:0;
			right:0;
			bottom:0;
			border:1px solid;
		}
	
		#can + span{
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

        <div id="canContainer"><canvas id="can"></canvas><span>Made with <a href="https://github.com/ToniestTony/jt_lib">jt_lib14.js</a></span></div>
        

    </body>
	<script src="jquery.js"></script>
    <script src="jt_lib14.js"></script>
    
    <script>
	`,`
	function JTEObject(x,y,w,h,c,r,alpha,attr,cam,v,tags,name){
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
		
		this.name=name;
		
	}
	
	var jte={
		w:`,`,
		h:`,`,
		originalW:0,
		originalH:0,
		title:"`,`",
		maximize:`,`,
		fontSize:20,
		
		objects:[],
		
		views:`,`,
		view:"Start",
		
		bg:"white",
		
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
			this.initialize();
			//jt.fullscreen();
			jt.baseline("top");
			jt.pixelRate(this.pR);
			
			if(this.title!=""){document.title=this.title;}
			
			var can=document.getElementById("can");
		
			can.width=this.w*this.pR;
			can.height=this.h*this.pR;
			can.style.width=this.w;
			can.style.height=this.h;
			can.getContext("2d").scale(this.pR,this.pR);
			
			jt.cam().w=this.w*this.pR;
			jt.cam().h=this.h*this.pR;
			
			jt.smoothing(false);
			
			//eval codes
			if(this.code!=undefined){
				eval(this.code);
			}

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
			for(var i=0;i<this.objects.length;i++){
				if(this.objects[i].view==jte.view || this.objects[i].view==""){
					if(this.objects[i].update!=undefined){
						this.objects[i].update();
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
		getObjects:function(tags,view){
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
				}
				return found;
			}
		},
		
		//delObject
		delObject:function(name){
			var found=undefined;
			for(var i=0;i<this.objects.length;i++){
				if(this.objects[i].name==name){
					this.objects.splice(i,1);
					break;
				}
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
				jte.objects.push(new JTEObject(x.x,x.y,x.w,x.h,x.c,x.r,x.alpha,x.attr,x.cam,x.view,x.tags,x.name))
			}else if(typeof x === 'number'){
				if(name==undefined){
					name="Obj"+jte.objects.length;
				}
				n=name;
				jte.objects.push(new JTEObject(x,y,w,h,c,r,alpha,attr,cam,view,tags,name))
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
		getView:function(i){
			if(i==undefined){
				return jte.view;
			}else{
				return jte.views[i];
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
				if(jt.w()!=this.originalW && jt.h()!=this.originalH){
					var ratioX=jt.w()/this.originalW;
					var ratioY=jt.h()/this.originalH;
					obj.x=obj.x*ratioX;
					obj.y=obj.y*ratioY;
					obj.w=obj.w*ratioX;
					obj.h=obj.h*ratioY;
				}
				
				if(o.cam==false){
					jt.camactive(false);
				}
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
						var alwaysShow=false
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
						var w1=jt.textW(".")/divider;
						var h=jt.textH(t)/divider;
						if((w<=obj.w && h<=obj.h) || alwaysShow){
							jt.text(t,obj.x+offset,obj.y,c,align,fS,r);
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
						if(jt.assets.images[obj.attr.anim]!=undefined){
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
				if(o.cam==false){
					jt.camactive(true);
				}
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
				loadEval.push("jt.loadSound('"+arr[i].path+"','"+arr[i].name+"',"+arr[i].repeat+");")
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
		//object which has the function name
		//mobile audio button size (0 for none)
		//fullScreen button on mobile
		
		jt=new JT("can",jte.w,jte.h,60,'setup','update','jte',0,jte.maximize);
		
		for(var i=0;i<loadEval.length;i++){
			eval(loadEval[i])
		}
		//jt.loadImage("image.png","name")
		//jt.loadSound("sound.wav","name")
		//jt.loadAnim("src.png","name",number of frames,fps);
	}
	
	`,`
	
	
	//you can also use $(document).ready(function(){}); with jQuery
	window.addEventListener("load",function(){
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
