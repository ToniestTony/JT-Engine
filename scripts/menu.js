var menu={
	tabs:["Settings","Create","Play"],
	tabCurr:"Create",
	tabHover:-1,
	
	buttons:[],
	buttonC:"lightgrey",
	buttonCHover:"lightblue",
	buttonCDown:"DodgerBlue",
	buttonCSelected:"blue",
	buttonCBg:"grey",
	
	fields:[],
	writing:-1,
	writingFrame:0,
	
	macro:false,
	uploadsImage:[],
	uploadsAudio:[],
	uploadsAnim:[],
	uploadSearch:"",
	uploadImageNum:0,
	uploadAudioNum:0,
	uploadAnimNum:0,
	uploadImageHover:false,
	uploadSelected:false,
	repeat:false,
	
	showGrid:false,
	snapGrid:false,
	gridUnit:1,
	gridAlpha:1,
	
	grad:undefined,
	gradW:undefined,
	gradB:undefined,
	rgba:[255,0,0,1],
	onColor:false,
	color:[255,0,0,1],
	lastMouseDown:false,
	lastColor:[255,0,0,1],
	pickerY:-2,
	colors:[
	[127,127,127,1],[255,255,255,1],[0,0,0,1],
	[255,0,0,1],[0,255,0,1],[0,0,255,1],
	[255,127,0,1],[0,255,127,1],[127,0,255,1],
	[255,255,0,1],[0,255,255,1],[255,0,255,1],
	
	],
	colorCurr:0,
	
	idea:"",
	
	maximize:false,
	
	importMenu:false,
	importCode:"",
	importAssets:[],
	
	assetsImageLoaded:0,
	assetsImage:[],
	assetsAudioLoaded:0,
	assetsAudio:[],
	
	setup:function(){
		//x,y,w,h,c,action,hover,trigger,text,tab
		this.buttons=[];
		this.fields=[];
		//Settings
		this.fields.push(new Field(jt.pX(8),jt.pY(5),jt.pX(10),jt.pY(2),"title","Settings","App"));
		this.fields.push(new Field(jt.pX(8),jt.pY(8),jt.pX(2),jt.pY(2),"w","Settings",view.viewDefaultW.toString()));
		this.fields.push(new Field(jt.pX(16),jt.pY(8),jt.pX(2),jt.pY(2),"h","Settings",view.viewDefaultH.toString()));
		//this.fields.push(new Field(jt.pX(8),jt.pY(11),jt.pX(2),jt.pY(2),"fps","Settings",app.fps));
		this.buttons.push(new Button(jt.pX(8),jt.pY(11),jt.pX(2),jt.pY(2),"maximize",true,"No","Settings"));
		this.buttons.push(new Button(jt.pX(23),jt.pY(8),jt.pX(13),jt.pY(2),"importGame",false,"Import game from clipboard","Settings"));
		
		this.buttons.push(new Button(jt.pX(72),jt.pY(5),jt.pX(10),jt.pY(2),"switchViews",false,"Switch views","Settings"));
		
		//this.buttons.push(new Button(jt.pX(86),jt.pY(5),jt.pX(13),jt.pY(2),"macro",true,"Show macro","Settings"));
		//this.buttons.push(new Button(jt.pX(86),jt.pY(5),jt.pX(13),jt.pY(2),"removeComments",false,"Remove comments","Settings"));
		this.buttons.push(new Button(jt.pX(86),jt.pY(5),jt.pX(13),jt.pY(2),"dark",true,"Dark theme","Settings"));
		this.buttons.push(new Button(jt.pX(86),jt.pY(8),jt.pX(13),jt.pY(2),"translateDown",true,"Translate with space only","Settings","m","space"));
		this.buttons.push(new Button(jt.pX(86),jt.pY(11),jt.pX(11),jt.pY(2),"generate",false,"Generate a game idea","Settings"));
		this.buttons.push(new Button(jt.pX(97.5),jt.pY(11),jt.pX(1.4),jt.pY(2),"generateErase",false,"X","Settings"));
		
		//Create
		this.buttons.push(new Button(jt.pX(3),jt.pY(5),jt.pX(5),jt.pY(2),"newRect",true,"Rectangle","Create","r"));
		this.buttons.push(new Button(jt.pX(3),jt.pY(8),jt.pX(5),jt.pY(2),"newText",true,"Text","Create","t"));
		this.buttons.push(new Button(jt.pX(1),jt.pY(11),jt.pX(3),jt.pY(2),"newImg",true,"Image","Create","i"));
		this.buttons.push(new Button(jt.pX(5),jt.pY(11),jt.pX(3),jt.pY(2),"newAnim",true,"Anim","Create","n"));
		
		this.buttons.push(new Button(jt.pX(9),jt.pY(5),jt.pX(5),jt.pY(2),"uploadImg",false,"Upload","Create"));
		this.buttons.push(new Button(jt.pX(14),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadMinus",false,"<","Create"));
		this.buttons.push(new Button(jt.pX(24.5),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadPlus",false,">","Create"));
		this.buttons.push(new Button(jt.pX(14),jt.pY(12.5),jt.pX(1.5),jt.pY(2),"uploadDelete",false,"Del","Create"));
		this.buttons.push(new Button(jt.pX(22),jt.pY(4.5),jt.pX(4),jt.pY(2),"uploadToAnim",false,"To anim","Create"));
		//sounds
		this.buttons.push(new Button(jt.pX(27),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadAudioMinus",false,"<","Create"));
		this.buttons.push(new Button(jt.pX(33.5),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadAudioPlus",false,">","Create"));
		this.buttons.push(new Button(jt.pX(27),jt.pY(12.5),jt.pX(1.5),jt.pY(2),"uploadAudioDelete",false,"Del","Create"));
		this.buttons.push(new Button(jt.pX(29),jt.pY(12.5),jt.pX(6),jt.pY(2),"uploadAudioRepeat",false,"Plays once","Create"));
		this.buttons.push(new Button(jt.pX(27),jt.pY(9.5),jt.pX(3.75),jt.pY(2),"uploadAudioPlay",false,"Play","Create"));
		this.buttons.push(new Button(jt.pX(31.25),jt.pY(9.5),jt.pX(3.75),jt.pY(2),"uploadAudioStop",false,"Stop","Create"));
		//anims
		this.buttons.push(new Button(jt.pX(36),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadAnimMinus",false,"<","Create"));
		this.buttons.push(new Button(jt.pX(46.5),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadAnimPlus",false,">","Create"));
		this.buttons.push(new Button(jt.pX(36),jt.pY(12.5),jt.pX(1.5),jt.pY(2),"uploadAnimDelete",false,"Del","Create"));
		
		this.fields.push(new Field(jt.pX(47),jt.pY(6.5),jt.pX(8),jt.pY(2),"uploadAnimFrames","Create"));
		this.fields.push(new Field(jt.pX(47),jt.pY(12.5),jt.pX(8),jt.pY(2),"uploadAnimSpeed","Create"));
		
		this.buttons.push(new Button(jt.pX(60),jt.pY(5),jt.pX(6),jt.pY(2),"showGrid",true,"show Grid","Create","g","space"));
		this.buttons.push(new Button(jt.pX(67),jt.pY(5),jt.pX(6),jt.pY(2),"snapGrid",true,"Snapping","Create","s","space"));
		this.buttons.push(new Button(jt.pX(67),jt.pY(8),jt.pX(1.5),jt.pY(2),"unitMinus",false,"-1","Create","1","u"));
		this.buttons.push(new Button(jt.pX(68.5),jt.pY(8),jt.pX(1),jt.pY(2),"unitMinus10",false,"10","Create","3","u"));
		this.buttons.push(new Button(jt.pX(70.5),jt.pY(8),jt.pX(1.5),jt.pY(2),"unitPlus",false,"+1","Create","2","u"));
		this.buttons.push(new Button(jt.pX(72),jt.pY(8),jt.pX(1),jt.pY(2),"unitPlus10",false,"10","Create","4","u"));
		this.buttons.push(new Button(jt.pX(67),jt.pY(11),jt.pX(2.5),jt.pY(2),"alphaMinus",false,"-0.1","Create","1","a"));
		this.buttons.push(new Button(jt.pX(70.5),jt.pY(11),jt.pX(2.5),jt.pY(2),"alphaPlus",false,"+0.1","Create","2","a"));
		
		this.buttons.push(new Button(jt.pX(1),jt.pY(5),jt.pX(10),jt.pY(8),"playTab",false,"Open game in tab","Play"));
		this.buttons.push(new Button(jt.pX(12),jt.pY(5),jt.pX(10),jt.pY(8),"playWindow",false,"Open game in window","Play"));
		this.buttons.push(new Button(jt.pX(23),jt.pY(5),jt.pX(10),jt.pY(8),"playDownload",false,"Download game (HTML)","Play","s","ctrl"));
		this.buttons.push(new Button(jt.pX(34),jt.pY(5),jt.pX(10),jt.pY(8),"playDownloadScript",false,"Download game (JS)","Play"));
		this.buttons.push(new Button(jt.pX(45),jt.pY(5),jt.pX(10),jt.pY(8),"playLib",false,"Download JT library","Play"));
		
		this.grad=jt.canvas.ctx.createLinearGradient(0,jt.pY(5),0,jt.pY(9+5));
		this.grad.addColorStop(0, 'rgba(255, 0, 0, 1)');
		this.grad.addColorStop(0.05, 'rgba(255, 0, 0, 1)');
		this.grad.addColorStop(0.20, 'rgba(255, 255, 0, 1)');
		this.grad.addColorStop(0.35, 'rgba(0, 255, 0, 1)');
		this.grad.addColorStop(0.50, 'rgba(0, 255, 255, 1)');
		this.grad.addColorStop(0.65, 'rgba(0, 0, 255, 1)');
		this.grad.addColorStop(0.80, 'rgba(255, 0, 255, 1)');
		this.grad.addColorStop(0.95, 'rgba(255, 0, 0, 1)');
		this.grad.addColorStop(1, 'rgba(255, 0, 0, 1)');
		
		this.pickerY=jt.pY(5);
		
		this.gradW=jt.canvas.ctx.createLinearGradient(jt.pX(87),0,jt.pX(87+9),0);
		this.gradW.addColorStop(0, 'rgba(255, 255, 255, 1)');
		this.gradW.addColorStop(0.1, 'rgba(255, 255, 255, 1)');
		this.gradW.addColorStop(0.9, 'rgba(255, 255, 255, 0)');
		this.gradW.addColorStop(1, 'rgba(255, 255, 255, 0)');
		
		this.gradB=jt.canvas.ctx.createLinearGradient(0,jt.pY(5),0,jt.pY(9+5));
		this.gradB.addColorStop(0, 'rgba(0, 0, 0, 0)');
		this.gradB.addColorStop(0.1, 'rgba(0, 0, 0, 0)');
		this.gradB.addColorStop(0.9, 'rgba(0, 0, 0, 1)');
		this.gradB.addColorStop(1, 'rgba(0, 0, 0, 1)');
		
		this.color=[255,0,0,1];
	},
	getField:function(id){
		var found=undefined;
		for(var i=0;i<this.fields.length;i++){
			if(this.fields[i].id==id){
				found=this.fields[i];
			}
		}
		return found;
	},
	upload:function(e){
		this.assetsImage=[];
		this.assetsAudio=[];
		this.assetsImageLoaded=0;
		this.assetsAudioLoaded=0;
		for(var i=0;i<e.target.files.length;i++){
			var file=e.target.files[i];
			//image
			if(file.type.match('image.*')){
				this.assetsImage.push(e.target.files[i])
			}
			//sound
			if(file.type.match('audio.*')){
				this.assetsAudio.push(e.target.files[i])
				
			}
		}
		if(this.assetsImage.length>0){this.startUploadImage();}
		if(this.assetsAudio.length>0){this.startUploadAudio();}
	},
	startUploadImage:function(){
		var reader=new FileReader();
		reader.readAsDataURL(menu.assetsImage[menu.assetsImageLoaded]);
		reader.onload=function(evt){
			menu.uploadImage(evt)
			menu.assetsImageLoaded++;
			if(menu.assetsImageLoaded<=menu.assetsImage.length-1){
				menu.startUploadImage();
			}
		}
	},
	startUploadAudio:function(){
		var reader=new FileReader();
		reader.readAsDataURL(menu.assetsAudio[menu.assetsAudioLoaded]);
		reader.onload=function(evt){
			menu.uploadAudio(evt)
			menu.assetsAudioLoaded++;
			if(menu.assetsAudioLoaded<=menu.assetsAudio.length-1){
				menu.startUploadAudio();
			}
		}
	},
	uploadImage:function(evt){
		var file=menu.assetsImage[menu.assetsImageLoaded]
		if(evt.target.readyState==FileReader.DONE){
			var name=file.name.replace(/\.[^/.]+$/, "");
			jt.assets.image(evt.target.result,name);
			menu.uploadsImage.push({type:"image",
			path:evt.target.result,
			name:name});
			menu.uploadImageNum=menu.uploadsImage.length-1;
		}
	},
	uploadAudio:function(evt){
		var file=menu.assetsAudio[menu.assetsAudioLoaded]
		if(evt.target.readyState==FileReader.DONE){
			var name=file.name.replace(/\.[^/.]+$/, "");
			jt.assets.sound(evt.target.result,name,menu.repeat);
			console.log(evt.target)
			menu.uploadsAudio.push({type:"audio",
			path:evt.target.result,
			name:name,
			repeat:menu.repeat});
			menu.uploadAudioNum=menu.uploadsAudio.length-1;
		}
	},
	getCode:function(){
		var fullCode="";
		for(var index=0;index<view.objects.length;index++){
			var obj=view.objects[index];
			var code="";
			code+="var obj=new JTEObject(";
			code+=obj.x+",";
			code+=obj.y+",";
			code+=obj.w+",";
			code+=obj.h+",";
			code+="["+obj.c[0]+","+obj.c[1]+","+obj.c[2]+"],";
			code+=obj.r+",";
			code+=obj.alpha+",";
			if(view.objects[index].attr!=undefined){view.objects[index].attr=JSON.stringify(view.objects[index].attr)}
			code+="'"+view.objects[index].attr+"',";
			if(view.objects[index].attr!=undefined){view.objects[index].attr=JSON.parse(view.objects[index].attr)}
			code+=obj.cam+",";
			code+="'"+obj.view+"',";
			view.objects[index].tags=JSON.stringify(view.objects[index].tags);
			code+="'"+view.objects[index].tags+"',";
			view.objects[index].tags=JSON.parse(view.objects[index].tags);
			code+="'"+obj.name+"'";
			code+=");";
			
			if(obj.code.length==0){
				code+="";
			}else{
				for(var lines=0;lines<obj.code.length;lines++){
					code+=obj.code[lines]+"\n";
				}
			}
			code+=";\n";
			code+="obj.setup=function(){";
			
			if(obj.setup.length==0){
				code+="\t";
			}else{
				for(var lines=0;lines<obj.setup.length;lines++){
					code+=obj.setup[lines]+"\n";
				}
			}
			
			code+="};";
			code+="obj.update=function(){";
			
			if(obj.update.length==0){
				code+="\t";
			}else{
				for(var lines=0;lines<obj.update.length;lines++){
					code+=obj.update[lines]+"\n";
				}
			}
			
			code+="};";
			
			code+="obj.JTEcode="+JSON.stringify(obj.code)+";";
			code+="obj.JTEsetup="+JSON.stringify(obj.setup)+";";
			code+="obj.JTEupdate="+JSON.stringify(obj.update)+";";
			code+="jte.objects.push(obj);";
			fullCode+=code;
		}
		return fullCode;
	},
	downloadLib:function(){
		var filename="jt_lib14.js";
			
		var element = document.createElement('a');
		element.setAttribute('href', filename);
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);

		
	},
	downloadGame:function(script){
		
		
		
		var code=this.getCode();
		var assets=``;
		
		for(var i=0;i<menu.uploadsImage.length;i++){
			assets+=`loadAssets([{type:"`+menu.uploadsImage[i].type+`",
			path:"assets/`+menu.uploadsImage[i].name+`.png",
			name:"`+menu.uploadsImage[i].name+`"}]);`;
		}
		for(var i=0;i<menu.uploadsAudio.length;i++){
			assets+=`loadAssets([{type:"`+menu.uploadsAudio[i].type+`",
			path:"assets/`+menu.uploadsAudio[i].name+`.wav",
			name:"`+menu.uploadsAudio[i].name+`",
			repeat:`+menu.uploadsAudio[i].repeat+`}]);`;
		}
		for(var i=0;i<menu.uploadsAnim.length;i++){
			assets+=`loadAssets([{type:"`+menu.uploadsAnim[i].type+`",
			path:"assets/`+menu.uploadsAnim[i].name+`.png",
			name:"`+menu.uploadsAnim[i].name+`",
			frames:`+menu.uploadsAnim[i].frames+`,
			speed:`+menu.uploadsAnim[i].speed+`}]);`;
		}
		
		if(code==""){code=`undefined`;}
		var title=document.title.substr(0,document.title.length-6);
		if(script!=undefined){
			var text=fullPage[1]+view.viewDefaultW+fullPage[2]+view.viewDefaultH+fullPage[3]+title+fullPage[4]+menu.buttons[0].selected+fullPage[5]+JSON.stringify(views.views)+fullPage[6]+code+fullPage[7]+assets+fullPage[8];
		}else{
			var text=fullPage[0]+fullPage[1]+view.viewDefaultW+fullPage[2]+view.viewDefaultH+fullPage[3]+title+fullPage[4]+menu.buttons[0].selected+fullPage[5]+JSON.stringify(views.views)+fullPage[6]+code+fullPage[7]+assets+fullPage[8]+fullPage[9];
		}
		
		var zip=new JSZip();
		
		if(script!=undefined){
			zip.file("index.js",text);
		}else{
			zip.file("index.html",text);
		}
		
		
		var folder=zip.folder("assets");
		
		var list = [];
		var files = ['jt_lib14.js','jquery.js'];
		var assets = [];
		for(var i=0;i<this.uploadsImage.length;i++){
			assets.push("assets/"+this.uploadsImage[i].name+".png")
		}
		
		for(var i=0;i<this.uploadsAudio.length;i++){
			assets.push("assets/"+this.uploadsAudio[i].name+".wav")
		}
		
		for(var i=0;i<this.uploadsAnim.length;i++){
			assets.push("assets/"+this.uploadsAnim[i].name+".png")
		}
		var results = [];

		files.forEach(function(url, i) { // (1)
		  list.push( // (2)
			fetch(url).then(function(res){
			  results[i] = res.blob(); // (3)
			  zip.file(url,results[i]);
			})
		  );
		});
		
		assets.forEach(function(url, i) { // (1)
		  list.push( // (2)
			fetch(url).then(function(res){
			  results[i] = res.blob(); // (3)
			  zip.file(url,results[i]);
			})
		  );
		});

		Promise
		  .all(list) // (4)
		  .then(function() {
			zip.generateAsync({type:"blob"}).then(function (content) {
				//console.log(base64);
				 var blob = new Blob([content], {
					type: "data:application/zip;blob"
				  });
				  saveAs(blob, menu.fields[0].text+".zip");
				//window.location = "data:application/zip;base64," + base64;
			});
		  });
		
	},
	openGame:function(type){
		//OPEN GAME
		if(app.game!=undefined){app.game.close();}
		if(app.editor!=undefined){app.editor.close();}
		app.editor=undefined;
		app.game=undefined;
		if(type=="tab"){
			app.game=window.open("jte.html","_blank")
		}else if (type=="window"){
			app.game=window.open("jte.html","_blank","resizable=no,scrollbars=no,width="+((view.viewDefaultW*app.pR))+"px,height="+((view.viewDefaultH*app.pR)+1)+"px")
		}
		app.gameLoaded=false;
		app.game.addEventListener("load",function(){
			
			for(var i=0;i<menu.uploadsImage.length;i++){
				app.game.loadAssets([{type:menu.uploadsImage[i].type,
				path:menu.uploadsImage[i].path,
				name:menu.uploadsImage[i].name}])
			}
			for(var i=0;i<menu.uploadsAudio.length;i++){
				app.game.loadAssets([{type:menu.uploadsAudio[i].type,
				path:menu.uploadsAudio[i].path,
				name:menu.uploadsAudio[i].name,
				repeat:menu.uploadsAudio[i].repeat}])
			}
			for(var i=0;i<menu.uploadsAnim.length;i++){
				app.game.loadAssets([{type:menu.uploadsAnim[i].type,
				path:menu.uploadsAnim[i].path,
				name:menu.uploadsAnim[i].name,
				frames:menu.uploadsAnim[i].frames,
				speed:menu.uploadsAnim[i].speed}])
			}
			//app.game.load([{src:"spy.png",name:"spy"}])
			app.game["jte"].w=view.viewDefaultW;
			app.game["jte"].h=view.viewDefaultH;
			app.game["jte"].views=views.views;
			app.game["jte"].code=menu.getCode();
			app.game["jte"].maximize=menu.buttons[0].selected;
			app.game.document.title=menu.fields[0].text;
			app.game.focus();
		});
		
		app.gameLoaded=false;
		//app.editorObject=inspector.selected[0];
		//app.game.onbeforeunload=function(){app.game=undefined;}
	},
	importObjects:function(){
		navigator.clipboard.readText()
			.then(text => {
			var objects=JSON.parse(text);
		
			view.resetView();
			
			for(var i=0;i<objects.length;i++){
				var o=objects[i];
				//console.log(o);
				view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags));
				view.objects[view.objects.length-1].code=o.JTEcode;
				view.objects[view.objects.length-1].setup=o.JTEsetup;
				view.objects[view.objects.length-1].update=o.JTEupdate;
				view.objects[view.objects.length-1].alpha=o.alpha;
				view.objects[view.objects.length-1].name=o.name;
			}
		  })
		  .catch(err => {
			console.error('Error importing from clipboard: ',err);
		  });
		
	},
	importGame:function(){
		navigator.clipboard.readText()
		  .then(text => {
			//check if html
			if(text.substr(0,6)=="<html>"){
				var div = document.createElement('div');
				div.innerHTML = text;
				var scripts = div.getElementsByTagName('script');
				//console.log(scripts);
				text=scripts[2].innerHTML;
			}
			eval(text);
			
			//width and height
			w=parseInt(jte.w);
			h=parseInt(jte.h);
			menu.fields[1].text=w.toString();
			view.viewDefaultW=w;
			menu.fields[2].text=h.toString();
			view.viewDefaultH=h;
			view.setup();
			
			//title
			menu.fields[0].text=jte.title;
			document.title=jte.title+" (JTE)";
			
			views.views=[];
			views.viewsOpened=[];
			for(var i=0;i<jte.views.length;i++){
				views.views.push(jte.views[i])
				views.viewsOpened.push(false);
				view.actions[jte.views[i]]=[];
				view.actionsCurr[jte.views[i]]=-1;
			}
			view.view=views.views[0]
			view.tabs=["Start"];
			views.updateButtons=true;
			
			menu.buttons[0].selected=jte.maximize;
			
			view.resetView();
			
			jte.initialize();
			for(var i=0;i<jte.objects.length;i++){
				var o=jte.objects[i];
				//console.log(o);
				view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags));
				view.objects[view.objects.length-1].code=o.JTEcode;
				view.objects[view.objects.length-1].setup=o.JTEsetup;
				view.objects[view.objects.length-1].update=o.JTEupdate;
				view.objects[view.objects.length-1].alpha=o.alpha;
				view.objects[view.objects.length-1].name=o.name;
			}
			
			for(var i=0;i<loadEval.length;i++){
				var load=loadEval[i];
				if(load.substr(0,11)=="jt.loadAnim"){
					var name=load.split(",")[1];
					name=name.substr(1,name.length-2);
					var frames=load.split(",")[2];
					var speed=load.split(",")[3];
					speed=speed.substr(0,speed.length-2);
					//find existing anim
					var found=false;
					for(var j=0;j<this.uploadsAnim.length;j++){
						if(this.uploadsAnim[j].name==name){
							this.uploadsAnim[j].frames=frames;
							this.uploadsAnim[j].speed=speed;
							found=true;
							break;
						}
					}
					//find existing image
					if(!found){
						for(var j=0;j<this.uploadsImage.length;j++){
							if(this.uploadsImage[j].name==name){
								var anim={
								type:"anim",
								path:this.uploadsImage[j].path,
								name:name,
								frames:frames,
								speed:speed
								}
								window["jt"].assets.anim(anim.path,anim.name,anim.frames,anim.speed);
								this.uploadsAnim.push(anim);
								this.uploadAnimNum=this.uploadsAnim.length-1;
								this.getField("uploadAnimFrames").text=anim.frames.toString();
								this.getField("uploadAnimSpeed").text=anim.speed.toString();
								break;
							}
						}
					}
					
				}else if(load.substr(0,12)=="jt.loadSound"){
					var name=load.split(",")[1];
					name=name.substr(1,name.length-2);
					var repeat=load.split(",")[2];
					repeat=repeat.substr(0,repeat.length-2);
					for(var j=0;j<this.uploadsAudio.length;j++){
						if(this.uploadsAudio[j].name==name){
							if(repeat=="true"){
								this.uploadsAudio[j].repeat=true;
							}else{
								this.uploadsAudio[j].repeat=false;
							}
							break;
						}
					}
				}
			}
		  })
		  .catch(err => {
			console.error('Error importing from clipboard: ',err);
		  });
	},
	update:function(){
		//assets
		if(this.assetsImage.length!=0){
			if(this.assetsImageLoaded==this.assetsImage.length){
				this.assetsImageLoaded=0;
				this.assetsImage=[];
				document.getElementById("upload").value=null;
			}
		}
		
		if(this.assetsAudio.length!=0){
			if(this.assetsAudioLoaded==this.assetsAudio.length){
				this.assetsAudioLoaded=0;
				this.assetsAudio=[];
				document.getElementById("upload").value=null;
			}
		}
		
		this.tabHover=-1;
		for(var i=0;i<this.tabs.length;i++){
			var m={x:jt.mX(),y:jt.mY(),w:2,h:2}; 
			var t={x:jt.pX(20)*i,y:0,w:jt.pX(20),h:jt.pY(4)};
			if(jt.cRect(m,t)){
				this.tabHover=i;
				if(jt.mPress()){
					this.tabCurr=this.tabs[i];
				}
			}
			if(jt.isMobile() && jt.tPress(t)){
				this.tabCurr=this.tabs[i];
			}
		}
		
		//buttons
		for(var i=0;i<this.buttons.length;i++){
			if(this.buttons[i].tab==this.tabCurr || this.buttons[i].tab=="" || this.buttons[i].key!=undefined){
				var valid=true;
				var keyOnly=false;
				if(this.buttons[i].key!=undefined && this.buttons[i].tab!=this.tabCurr){
					keyOnly=true;
				}
				//exceptions
				if(this.buttons[i].action.substring(0,3)=="ins" && inspector.selected.length!=1){
					valid=false;
				}
				if(valid){
					var obj={x:this.buttons[i].x,y:this.buttons[i].y,w:this.buttons[i].w,h:this.buttons[i].h};
					var m={x:jt.mX(),y:jt.mY(),w:2,h:2}
					var action=false;
					var key=false;
					if(this.buttons[i].key!=undefined && this.writing==-1){
						if(this.buttons[i].key2!=undefined){
							if(jt.kPress(this.buttons[i].key) && jt.kCheck(this.buttons[i].key2)){
								key=true;
							}
						}else{
							if(jt.kPress(this.buttons[i].key)){
								key=true;
							}
						}
					}
					if(((jt.cRect(m,obj) || jt.tPress(obj)) && !keyOnly) || key){
						if(((jt.mPress() || jt.tPress(obj)) && !keyOnly) || key){
							action=true;
							if(this.buttons[i].trigger){
								this.buttons[i].selected=!this.buttons[i].selected;
								if(!this.buttons[i].selected){
									action=false;
									if(this.buttons[i].action=="newRect" || this.buttons[i].action=="newText" || this.buttons[i].action=="newImg" || this.buttons[i].action=="newAnim"){
										view.mouseState="";
										view.mouseNew="";
									}
									if(this.buttons[i].action=="translateDown"){
										view.translateWithMouseDown=true;
									}
									if(this.buttons[i].action=="macro"){
										this.macro=false;
									}
									if(this.buttons[i].action=="dark"){
										app.dark=false;
									}
									if(this.buttons[i].action=="showGrid"){
										this.showGrid=false;
									}
									if(this.buttons[i].action=="snapGrid"){
										this.snapGrid=false;
									}
									if(this.buttons[i].action=="maximize"){
										if(this.maximize){
											this.maximize=false;
											for(var j=0;j<this.buttons.length;j++){
												if(this.buttons[j].action=="maximize"){
													this.buttons[j].text="No";
												}
											}
										}
									}
								}
							}
							
						}
					}
					if(this.buttons[i].trigger && this.buttons[i].selected){
						action=true;
					}
					if(action){
						//NEW
						if(this.buttons[i].action=="newRect"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="rect";
							}
						}else if(this.buttons[i].action=="newText"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="text";
							}
						}else if(this.buttons[i].action=="newImg"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="img";
							}
						}else if(this.buttons[i].action=="newAnim"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="anim";
							}
							
						//UPLOAD
						}else if(this.buttons[i].action=="importGame"){
							//upload
							this.importGame();
						}else if(this.buttons[i].action=="uploadImg"){
							//upload
							var input=document.getElementById("upload");
							input.click();
						}else if(this.buttons[i].action=="uploadMinus"){
							this.uploadImageNum--;
							if(this.uploadImageNum<0){this.uploadImageNum=0;}
						}else if(this.buttons[i].action=="uploadPlus"){
							this.uploadImageNum++;
							if(this.uploadImageNum>this.uploadsImage.length-1){this.uploadImageNum=this.uploadsImage.length-1;}
						}else if(this.buttons[i].action=="uploadToAnim"){
							var anim={
								type:"anim",
								path:menu.uploadsImage[menu.uploadImageNum].path,
								name:menu.uploadsImage[menu.uploadImageNum].name,
								frames:1,
								speed:15
							}
							jt.assets.anim(anim.path,anim.name,anim.frames,anim.speed);
							this.uploadsAnim.push(anim);
							this.uploadAnimNum=this.uploadsAnim.length-1;
							this.getField("uploadAnimFrames").text=anim.frames.toString();
							this.getField("uploadAnimSpeed").text=anim.speed.toString();
						}else if(this.buttons[i].action=="uploadDelete"){
							delete jt.assets.images[this.uploadsImage[this.uploadImageNum].name];
							this.uploadsImage.splice(this.uploadImageNum,1);
							this.uploadImageNum--;
							if(this.uploadImageNum>this.uploadsImage.length-1){this.uploadImageNum=this.uploadsImage.length-1;}
							if(this.uploadImageNum<0){this.uploadImageNum=0;}
						//anim
						}else if(this.buttons[i].action=="uploadAnimMinus"){
							this.uploadAnimNum--;
							if(this.uploadAnimNum<0){this.uploadAnimNum=0;}
							this.getField("uploadAnimFrames").text=this.uploadsAnim[this.uploadAnimNum].frames.toString();
							this.getField("uploadAnimSpeed").text=this.uploadsAnim[this.uploadAnimNum].speed.toString();
						}else if(this.buttons[i].action=="uploadAnimPlus"){
							this.uploadAnimNum++;
							if(this.uploadAnimNum>this.uploadsAnim.length-1){this.uploadAnimNum=this.uploadsAnim.length-1;}
							this.getField("uploadAnimFrames").text=this.uploadsAnim[this.uploadAnimNum].frames.toString();
							this.getField("uploadAnimSpeed").text=this.uploadsAnim[this.uploadAnimNum].speed.toString();
						}else if(this.buttons[i].action=="uploadAnimDelete"){
							delete jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name];
							this.uploadsAnim.splice(this.uploadAnimNum,1);
							this.uploadAnimNum--;
							if(this.uploadAnimNum>this.uploadsAnim.length-1){this.uploadAnimNum=this.uploadsAnim.length-1;}
							if(this.uploadAnimNum<0){this.uploadAnimNum=0;}
						//Audio
						}else if(this.buttons[i].action=="uploadAudioMinus"){
							this.uploadAudioNum--;
							if(this.uploadAudioNum<0){this.uploadAudioNum=0;}
						}else if(this.buttons[i].action=="uploadAudioPlus"){
							this.uploadAudioNum++;
							if(this.uploadAudioNum>this.uploadsAudio.length-1){this.uploadAudioNum=this.uploadsAudio.length-1;}
						}else if(this.buttons[i].action=="uploadAudioDelete"){
							delete jt.assets.sounds[this.uploadsAudio[this.uploadAudioNum].name];
							this.uploadsAudio.splice(this.uploadAudioNum,1);
							this.uploadAudioNum--;
							if(this.uploadAudioNum>this.uploadsAudio.length-1){this.uploadAudioNum=this.uploadsAudio.length-1;}
							if(this.uploadAudioNum<0){this.uploadAudioNum=0;}
						}else if(this.buttons[i].action=="uploadAudioRepeat"){
							this.uploadsAudio[this.uploadAudioNum].repeat=!this.uploadsAudio[this.uploadAudioNum].repeat;
						}else if(this.buttons[i].action=="uploadAudioPlay"){
							jt.stopPlay(this.uploadsAudio[this.uploadAudioNum].name);
						}else if(this.buttons[i].action=="uploadAudioStop"){
							for(var j=0;j<this.uploadsAudio.length;j++){
								jt.stop(this.uploadsAudio[j].name);
							}
							
						//OPERATIONS
						}else if(this.buttons[i].action=="switchViews"){
							var view1=prompt("Change objects from view:")
							var view2=prompt("Change objects to view:")
							
							if((views.views.indexOf(view1)!=-1 || view1=="") && (views.views.indexOf(view2)!=-1 || view2=="")){
								for(var j=0;j<view.objects.length;j++){
									if(view.objects[j].view==view1){
										view.objects[j].view=view2;
									}
								}
								
								views.updateButtons=true;
							}
						//MISC
						}else if(this.buttons[i].action=="maximize"){
							this.maximize=true;
							for(var j=0;j<this.buttons.length;j++){
								if(this.buttons[j].action=="maximize"){
									this.buttons[j].text="Yes";
								}
							}
						}else if(this.buttons[i].action=="macro"){
							this.macro=true;
							}else if(this.buttons[i].action=="dark"){
							app.dark=true;
						}else if(this.buttons[i].action=="removeComments"){
							for(var j=0;j<view.objects.length;j++){
								for(var k=0;k<view.objects[j].code.length;k++){
									view.objects[j].code[k]=view.objects[j].code[k].replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, '');
								}
								for(var k=0;k<view.objects[j].setup.length;k++){
									view.objects[j].setup[k]=view.objects[j].setup[k].replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, '');
								}
								for(var k=0;k<view.objects[j].update.length;k++){
									view.objects[j].update[k]=view.objects[j].update[k].replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, '');
								}
							}
							Object.prototype.code=[];
							Object.prototype.setup=[];
							Object.prototype.update=["\tjte.draw(this);"];
						}else if(this.buttons[i].action=="translateDown"){
							view.translateWithMouseDown=false;
						}else if(this.buttons[i].action=="generate"){
							this.idea=idea.getIdea();
						}else if(this.buttons[i].action=="generateErase"){
							this.idea="";
							
							
						//INSPECTOR
						}else if(this.buttons[i].action=="insClear"){
							if(inspector.selected.length==1){
								this.fields[inspector.fields.insName].text="";

							}
						}else if(this.buttons[i].action=="insAlignLeft"){
							if(inspector.selected.length==1){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.text!=undefined){
										view.objects[inspector.selected[0]].attr.align="left";
									}
								}
							}
						}else if(this.buttons[i].action=="insAlignCenter"){
							if(inspector.selected.length==1){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.text!=undefined){
										view.objects[inspector.selected[0]].attr.align="center";
									}
								}
							}
						}else if(this.buttons[i].action=="insAlignRight"){
							if(inspector.selected.length==1){
								if(view.objects[inspector.selected[0]].attr!=undefined){
									if(view.objects[inspector.selected[0]].attr.text!=undefined){
										view.objects[inspector.selected[0]].attr.align="right";
									}
								}
							}
						}else if(this.buttons[i].action=="insCam"){
							if(inspector.selected.length==1){
									view.objects[inspector.selected[0]].cam=!view.objects[inspector.selected[0]].cam
							}
						//OPEN EDITOR
						}else if(this.buttons[i].action=="insEditor"){
							if(inspector.selected.length==1){
								if(app.editor==undefined){
									app.editor=window.open("editor.html","","width=1000,height=800")
									app.editorLoaded=false;
									app.editorObject=inspector.selected[0];
									app.editor.onbeforeunload=function(){app.editor=undefined;}
								}else{
									app.editor.close();
									app.editor=undefined;
								}
							}
							
						//VIEWS
						}else if(this.buttons[i].action.substr(0,8)=="viewsAdd"){
							var num=parseInt(this.buttons[i].action.substr(8,9));
							var name="View"+views.views.length;
							var index=0;
							while(views.views.indexOf(name)!=-1){
								index++;
								name="View"+(views.views.length+index);
							}
							views.views.splice(num,0,name)
							views.viewsOpened.splice(num,0,true);
							views.updateButtons=true;
							view.actions[name]=[];
							view.actionsCurr[name]=-1;
						}else if(this.buttons[i].action.substr(0,8)=="viewsDel"){
							
								var num=parseInt(this.buttons[i].action.substr(8,9));
								var name=views.views[num];
							if(view.getObjects(name).length==0 ||prompt("Are you sure? Press ok to delete "+name)!=null){
								if(view.view==name){
									view.view=views.views[0]
								}
								if(view.tabs.indexOf(name)!=-1){
									view.tabs.splice(view.tabs.indexOf(name),1);
								}
								delete view.actions[name];
								delete view.actionsCurr[name];
								views.views.splice(num,1)
								views.viewsOpened.splice(num,1);
								views.updateButtons=true;
								//delete all objects to new view
								for(var j=0;j<view.objects.length;j++){
									if(view.objects[j].view==name){
										view.objects.splice(j,1);
										j--;
									}
								}
							}
							
						}else if(this.buttons[i].action.substr(0,9)=="viewsOpen"){
							var num=parseInt(this.buttons[i].action.substr(9,9));
							if(view.tabs.indexOf(views.views[num])==-1){
								view.addTab(views.views[num]);
								view.view=views.views[num];
							}
							
						//GRID
						}else if(this.buttons[i].action=="showGrid"){
							this.showGrid=true;
						}else if(this.buttons[i].action=="snapGrid"){
							this.snapGrid=true;
						}else if(this.buttons[i].action=="unitMinus"){
							this.gridUnit--;
							if(this.gridUnit<1){this.gridUnit=1;}
						}else if(this.buttons[i].action=="unitMinus10"){
							this.gridUnit-=10;
							if(this.gridUnit<1){this.gridUnit=1;}
						}else if(this.buttons[i].action=="unitPlus"){
							this.gridUnit++;
							if(this.gridUnit>64){this.gridUnit=64;}
						}else if(this.buttons[i].action=="unitPlus10"){
							this.gridUnit+=10;
							if(this.gridUnit>64){this.gridUnit=64;}
						}else if(this.buttons[i].action=="alphaMinus"){
							this.gridAlpha=Math.round((this.gridAlpha-0.1)*10)/10;
							if(this.gridAlpha<0.1){this.gridAlpha=0.1;}
						}else if(this.buttons[i].action=="alphaPlus"){
							this.gridAlpha=Math.round((this.gridAlpha+0.1)*10)/10;
							if(this.gridAlpha>1){this.gridAlpha=1;}
						
						
						//PLAY
						}else if(this.buttons[i].action=="playTab"){
							this.openGame("tab")
						}else if(this.buttons[i].action=="playWindow"){
							this.openGame("window")
						}else if(this.buttons[i].action=="playDownload"){
							this.downloadGame();
						}else if(this.buttons[i].action=="playDownloadScript"){
							this.downloadGame(true);
						}else if(this.buttons[i].action=="playLib"){
							this.downloadLib();
						}

					}
				}
			}
		}
		
		//fields
		var none=true;
		jt.font("Consolas",app.fontSize*0.75)
		var lastWriting=this.writing;
		
		for(var i=0;i<this.fields.length;i++){
			if(this.fields[i].tab==this.tabCurr || this.fields[i].tab==""){
				var obj={x:this.fields[i].x,y:this.fields[i].y,w:this.fields[i].w,h:this.fields[i].h,id:this.fields[i].id};
				var m={x:jt.mX(),y:jt.mY(),w:2,h:2}
				if(jt.cRect(m,obj)){
					if(jt.mPress()){
						var valid=true;
						//exceptions
						if(this.fields[i].id.substring(0,3)=="ins"){
							if(inspector.selected.length!=1){valid=false;}
						}
						
						if(valid){
							//writing to this fields
							this.writing=i;
							this.writingFrame=0;
							this.fields[i].cursor=this.fields[i].text.length;
							none=false;
							//choose character
							var w=jt.textW("a");
							var c=-1;
							for(var x=0;x<this.fields[i].text.length+1;x++){
								var pos=((x*w)+obj.x)-w/2
								if(jt.mX()>=pos && jt.mX()<pos+w){c=x}
							}
							if(c!=-1){
								this.fields[i].cursor=c;
							}
						}
					}
				}
			}
		}
		
		if((none && (jt.mPress() || jt.kPress("enter")) && this.writing!=-1) || (lastWriting!=-1 && lastWriting!=this.writing)){
			if(none && jt.mPress() && this.writing!=-1){
				lastWriting=this.writing;
				this.writing=-1;
			}
			
			
			for(var i=0;i<this.fields.length;i++){
				if(this.fields[i].tab==this.tabCurr || this.fields[i].tab==""){
					if(lastWriting==i){
						var id=this.fields[i].id;
						var text=this.fields[i].text;
						if(id=="title"){
							document.title=text+" (JTE)";
						}else if(id=="w"){
							var num=parseInt(text);
							if(num!=NaN){
								view.viewDefaultW=num;
								view.setup();
							}
						}else if(id=="h"){
							var num=parseInt(text);
							if(num!=NaN){
								view.viewDefaultH=num;
								view.setup();
							}
						}else if(id=="uploadAnimFrames"){
							var num=parseFloat(text);
							if(num!=NaN){
								this.uploadsAnim[this.uploadAnimNum].frames=num;
								jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].frames=num;
								jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].frameW=jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].img.width/num;
							}
						}else if(id=="uploadAnimSpeed"){
							var num=parseFloat(text);
							if(num!=NaN){
								this.uploadsAnim[this.uploadAnimNum].speed=num;
								jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].speed=num/jt.fps();
							}
						//VIEWS
						}else if(id.substr(0,5)=="views"){
							var taken=false;
							for(var j=0;j<views.views.length;j++){
								if(views.views[j]==text || text==""){
									taken=true;
									views.taken=views.takenMax;
									if(text==""){
										views.nameError="empty";
									}else{
										views.nameError="taken";
									}
									break;
								}
							}
							if(!taken){
								var num=parseInt(id.substr(5,9));
								var name=views.views[num];
								
								delete view.actions[name];
								delete view.actionsCurr[name];
								
								view.actions[text]=[];
								view.actionsCurr[text]=-1;
								
								if(view.tabs.indexOf(name)!=-1){
									if(view.view==name){
										view.addTab(text);
									}
									view.tabs.splice(view.tabs.indexOf(name),1);
								}
								
								if(view.view==name){
									view.view=text
								}
								
								//change all objects to new view
								for(var j=0;j<view.objects.length;j++){
									if(view.objects[j].view==name){
										view.objects[j].view=text;
									}
								}
								
								views.views[num]=text;
								
							}
							views.updateButtons=true;
							
							
						//INSPECTOR
						}else if(inspector.selected.length==1){
							for (var field in inspector.fields) {
								if (Object.prototype.hasOwnProperty.call(inspector.fields, field)) {
										if(field==id){
										var toFloat=true;
										var valid=true;
										if(field=="insName"){
											var taken=false;
											for(var j=0;j<view.objects.length;j++){
												if((view.objects[j].name==text && inspector.selected[0]!=j) || text==""){
													taken=true;
													inspector.taken=inspector.takenMax;
													if(text==""){
														inspector.nameError="empty";
													}else{
														inspector.nameError="taken";
													}
													break;
												}
											}
											if(taken){valid=false;}else{views.updateButtons=true;}
										}
										
										if(field=="insName" || field=="insView"){toFloat=false;}
										if(field=="insText"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.text!=undefined){
													view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]=text;
												}
											}
												
										}else if(field=="insSize"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.text!=undefined){
													view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]=parseFloat(text);
												}
											}
												
										}else if(field=="insOrder"){
											if(app.editor==undefined){
												//change order only if editor is closed
												var num=parseFloat(text);
												if(isNaN(num)){
													num=0;
												}
												if(num<0){num=0;}
												if(num>view.objects.length-1){num=view.objects.length-1;}
												
												if(num==inspector.selected[0]){
													view.objects[inspector.selected[0]].order=inspector.selected[0];
												}else{
													var copy=JSON.parse(JSON.stringify(view.objects[inspector.selected[0]]));
													if(num==view.objects.length-1){
														view.objects.push(copy);
													}else{
														view.objects.splice(num,0,copy);
													}

													if(num<inspector.selected[0]){
														inspector.selected[0]++;
													}
													view.objects.splice(inspector.selected[0],1);
													inspector.selected[0]=num;
												}
											}else{
												inspector.closeEditor=inspector.closeEditorMax;
											}
												
										}else if(field=="insTags"){
											var t=text;
											try{
												t=JSON.parse(text);
											}catch(e){
												t=JSON.parse('[""]');
											}
											view.objects[inspector.selected[0]][inspector.insToVal[field]]=t;
												
										}else if(valid){
											if(toFloat){
												if(isNaN(parseFloat(text))){
													text="0";
												}
												view.objects[inspector.selected[0]][inspector.insToVal[field]]=parseFloat(text);
											}else{
												view.objects[inspector.selected[0]][inspector.insToVal[field]]=text;
											}
										}
										if(field=="insView"){
											views.updateButtons=true;
										}
										this.fields[i].text="";
									}
									
								}
							}
							/*if(id=="insName"){
								view.objects[inspector.selected[0]].name=text;
								this.fields[i].text="";
							}else if(id=="insX"){
								view.objects[inspector.selected[0]].x=parseFloat(text);
								this.fields[i].text="";
							}else if(id=="insY"){
								view.objects[inspector.selected[0]].y=parseFloat(text);
								this.fields[i].text="";
							}else if(id=="insW"){
								view.objects[inspector.selected[0]].w=parseFloat(text);
								this.fields[i].text="";
							}else if(id=="insH"){
								view.objects[inspector.selected[0]].h=parseFloat(text);
								this.fields[i].text="";
							}else if(id=="insA"){
								view.objects[inspector.selected[0]].alpha=parseFloat(text);
								this.fields[i].text="";
							}*/
							
							
						}
						
					}
				}
			}
		}
		
		if(this.writing!=-1){
			var keys=[
			"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
			"0","1","2","3","4","5","6","7","8","9","-","=",",",".",";",
			"backspace","space","left","right","up","down","enter","num/"];
			var specials=["backspace","left","right","up","down","enter"];
			for(var i=0;i<keys.length;i++){
				if(jt.kPress(keys[i])){
					var maxChars=Math.floor(this.fields[this.writing].w/jt.textW("a"));
					var removeWriting=false;
					if(specials.indexOf(keys[i])!=-1){
						//specials
						var key=keys[i];
						if(key=="backspace"){
							this.writingFrame=0;
							if(this.fields[this.writing].cursor>0){
								var start=this.fields[this.writing].text.slice(0,this.fields[this.writing].cursor-1);
								var end=this.fields[this.writing].text.slice(this.fields[this.writing].cursor,this.fields[this.writing].text.length);
								this.fields[this.writing].text=start+end;
							}
							
							this.fields[this.writing].cursor--;
						}
						if(key=="enter"){
							removeWriting=true;
						}
						if(key=="left"){
							this.fields[this.writing].cursor--;
							this.writingFrame=0;
						}
						if(key=="right"){
							this.fields[this.writing].cursor++;
							this.writingFrame=0;
						}
						if(key=="up"){
							this.fields[this.writing].cursor=0;
							this.writingFrame=0;
						}
						if(key=="down"){
							this.fields[this.writing].cursor=this.fields[this.writing].text.length;
							this.writingFrame=0;
						}
						if(this.fields[this.writing].cursor>this.fields[this.writing].text.length){
							this.fields[this.writing].cursor=this.fields[this.writing].text.length;
						}
						if(this.fields[this.writing].cursor<0){
							this.fields[this.writing].cursor=0;
						}
					}else if(this.fields[this.writing].text.length+1<=maxChars){
						//write at end
						var key=keys[i];
						if(key=="space"){key=" ";}
						if(key=="num/"){key="/"}
						
						if(jt.kCheck("shift")){
							if(key=="-"){
								key="_";
							}else if(key==","){
								key="'";
							}else if(key=="."){
								key="\"";
							}else if(key==";"){
								key=":";
							}else if(key=="="){
								key="+";
							}else if(key=="1"){
								key="!";
							}else if(key=="2"){
								key="@";
							}else if(key=="3"){
								key="#";
							}else if(key=="4"){
								key="$";
							}else if(key=="5"){
								key="%";
							}else if(key=="6"){
								key="?";
							}else if(key=="7"){
								key="&";
							}else if(key=="8"){
								key="*";
							}else if(key=="9"){
								key="(";
							}else if(key=="0"){
								key=")";
							}else{
								key=key.toUpperCase();
							}
							
						}
						if(jt.kCheck("alt")){
							if(key==","){
								key="<";
							}else if(key=="."){
								key=">";
							}
							
						}
						
						
						this.writingFrame=0;
						var cursor=this.fields[this.writing].cursor;
						var cursorEnd=this.fields[this.writing].text.length-cursor;
						this.fields[this.writing].text=this.fields[this.writing].text.substr(0,cursor)+key+this.fields[this.writing].text.substr(cursor,cursorEnd)
						this.fields[this.writing].cursor++;
						if(this.fields[this.writing].cursor>this.fields[this.writing].text.length){
							this.fields[this.writing].cursor=this.fields[this.writing].text.length;
						}
					}
					this.fields[this.writing].text=this.fields[this.writing].text.substr(0,maxChars);
					if(removeWriting){this.writing=-1;break;}
				}
			}
		}
		
		if(this.tabCurr=="Create"){
			//Upload
			this.uploadImageHover=false;
			if(this.uploadsImage.length>0){
				if(jt.mX()>=jt.pX(16) && jt.mX()<= jt.pX(24) && jt.mY()>=jt.pY(6.75) && jt.mY()<=jt.pY(14.75)){
					this.uploadImageHover=true;
					if(jt.mPress()){
						this.uploadSelected=true
						if(view.mouseState!="creating"){
							view.mouseState="new";
							view.mouseNew="img";
						}
					}
				}
			}
			
			
			//color picker
			if(jt.mX()>=jt.pX(78) && jt.mX()<=jt.pX(86) && jt.mY()>=jt.pY(5) && jt.mY()<=jt.pY(14)){
				if(jt.mPress()){
					var col=0;
					if(jt.mX()>=jt.pX(80)){col=3;}
					if(jt.mX()>=jt.pX(82)){col=6;}
					if(jt.mX()>=jt.pX(84)){col=9;}
					
					if(jt.mY()<=jt.pY(8)){
						this.colorCurr=0+col;
					}else if(jt.mY()<=jt.pY(11)){
						this.colorCurr=1+col;
					}else if(jt.mY()<=jt.pY(14)){
						this.colorCurr=2+col;
					}
					
					//change inspector color
					if(inspector.selected.length==1){
						view.objects[inspector.selected[0]].c=this.colors[this.colorCurr];
						inspector.color=this.colors[this.colorCurr];
					}
				}
			}
			if(jt.mX()>=jt.pX(87) && jt.mX()<=jt.pX(99) && jt.mY()>=jt.pY(5) && jt.mY()<=jt.pY(14)){
				this.onColor=true;
				if(jt.mCheck()){
					if(jt.mX()<=jt.pX(96)){
						var img=jt.canvas.ctx.getImageData(jt.mX()*app.pR,jt.mY()*app.pR,1,1).data;
						this.color=[img[0],img[1],img[2],1];
						this.colors[this.colorCurr]=this.color;
					}else if(jt.mX()>=jt.pX(97)){
						var img=jt.canvas.ctx.getImageData(jt.mX()*app.pR,jt.mY()*app.pR,1,1).data;
						this.rgba=[img[0],img[1],img[2],1];
						this.pickerY=jt.mY();
					}
				}
			}else{
				this.onColor=false;
			}
		}
		
		this.lastMouseDown=jt.mouseDown();
		this.lastColor=this.color;
		
	},
	draw:function(){
		jt.camactive(false);
		jt.font("Consolas",app.fontSize);
		var cBg="lightgrey";
		var cHigh="white";
		var cText="black";
		if(app.dark){cBg="black";cHigh="#444";cText="white"}
		jt.rect(0,0,jt.pX(100),jt.pY(4),cBg,0);
		jt.rect(0,jt.pY(4),jt.pX(100),jt.pY(11),cHigh,0);
		
		jt.rectB(0,0,jt.pX(100),jt.pY(15),"black",0,2);
		jt.text("Menu",0,0,cText,"left");
		
		
		//buttons color
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
		
		//buttons
		jt.font("Consolas",app.fontSize*0.75)
		for(var i=0;i<this.buttons.length;i++){
			if(this.buttons[i].tab==this.tabCurr || this.buttons[i].tab==""){
				//exceptions
				var show=true;
				if((this.buttons[i].action=="newImg" || this.buttons[i].action=="uploadMinus" || this.buttons[i].action=="uploadPlus" || this.buttons[i].action=="uploadDelete" || this.buttons[i].action=="uploadToAnim") && this.uploadsImage.length==0){
					show=false;
				}
				if((this.buttons[i].action=="uploadAudioMinus" || this.buttons[i].action=="uploadAudioPlus" || this.buttons[i].action=="uploadAudioDelete" || this.buttons[i].action=="uploadAudioRepeat" || this.buttons[i].action=="uploadAudioPlay" || this.buttons[i].action=="uploadAudioStop") && this.uploadsAudio.length==0){
					show=false;
				}
				if((this.buttons[i].action=="newAnim" || this.buttons[i].action=="uploadAnimMinus" || this.buttons[i].action=="uploadAnimPlus" || this.buttons[i].action=="uploadAnimDelete") && this.uploadsAnim.length==0){
					show=false;
				}
				if(this.buttons[i].action.substring(0,3)=="ins"){
					if(this.buttons[i].action.substring(0,8)=="insAlign" && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.text==undefined){
							show=false;
						}
					}
					if(inspector.selected.length!=1){show=false;}
				}
				if(this.buttons[i].action.substring(0,5)=="views" && this.buttons[i].y<jt.pY(15)){
					show=false;
				}
				if(show){
				
					var c=this.buttonC;
					var obj={x:this.buttons[i].x,y:this.buttons[i].y,w:this.buttons[i].w,h:this.buttons[i].h};
					var m={x:jt.mX(),y:jt.mY(),w:2,h:2}
					if(jt.cRect(m,obj)){
						if(jt.mCheck()){
							c=this.buttonCDown;
						}else{
							c=this.buttonCHover;
						}
						
					}
					var bgC=this.buttonCBg;
					if(this.buttons[i].selected){
						bgC=this.buttonCSelected
						if(c==this.buttonC){c=this.buttonCHover;}
						
					}
					jt.rect(obj.x,obj.y,obj.w,obj.h,c);
					jt.alpha(0.75);
					jt.rectB(obj.x,obj.y,obj.w,obj.h,bgC,0,2);
					jt.alpha(1);
					
					var text=this.buttons[i].text
					//changing text
					if(this.buttons[i].action=="insEditor"){
						if(app.editor!=undefined){text="Close code editor"}
					}
					if(this.buttons[i].action=="insCam"){
						if(inspector.selected.length==1){
							text=view.objects[inspector.selected[0]].cam;
						}
					}
					if(this.buttons[i].action=="uploadAudioRepeat"){
						if(this.uploadsAudio[this.uploadAudioNum].repeat){text="Repeat"}
					}
					
					jt.baseline("top");
					var y=obj.y+Math.ceil((obj.h-(app.fontSize*0.75))/2)
					jt.text(text,obj.x+obj.w/2,y,cText,"center")
				}
			}
		}
		
		//fields
		menu.writingFrame=jt.wrap(menu.writingFrame+1,0,59);	
		jt.font("Consolas",app.fontSize*0.75)
		for(var i=0;i<menu.fields.length;i++){
			if(menu.fields[i].tab==menu.tabCurr || menu.fields[i].tab==""){
				//exceptions
				var show=true;
				if(this.fields[i].id.substring(0,3)=="ins"){
					if((this.fields[i].id=="insText" || this.fields[i].id=="insSize") && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.text==undefined){
							show=false;
						}
					}
					if(inspector.selected.length!=1){show=false;}
				}
				if((this.fields[i].id=="uploadAnimFrames" || this.fields[i].id=="uploadAnimSpeed") && this.uploadsAnim.length==0){
					show=false;
				}
				if(this.fields[i].id.substring(0,5)=="views" && this.fields[i].y<jt.pY(15)){
					show=false;
				}
				if(show){
					var obj={x:menu.fields[i].x,y:menu.fields[i].y,w:menu.fields[i].w,h:menu.fields[i].h,c:menu.fields[i].c,text:menu.fields[i].text};
					jt.baseline("top");
					var c="grey";
					var cBg="black"
					if(app.dark){c="black";cBg="grey"}
					if(i==menu.writing){cBg="black";if(app.dark){cBg="white"}}
					jt.rectB(obj.x-1,obj.y-1,obj.w+2,obj.h+2,cBg,0,2);
					jt.text(obj.text,obj.x+2,obj.y+2,cText,"left");
					if(i==menu.writing && menu.writingFrame<=40){
						jt.rect(obj.x+(menu.fields[i].cursor*jt.textW("a"))+1,obj.y+2,1.5,obj.h-4,cBg)
					}
				}
			}
		}
		
		if(this.tabCurr=="Settings"){
			//Main
			jt.rect(jt.pX(18.5),jt.pY(5),jt.pX(0.1),jt.pY(8))
			jt.font("Consolas",app.fontSize*0.75);
			jt.text("Main: ",jt.pX(0.5),jt.pY(5),cText,"left");
			
			jt.text("Title: ",jt.pX(8),jt.pY(5),cText,"right");
			jt.text("Width: ",jt.pX(8),jt.pY(8),cText,"right");
			jt.text("Height: ",jt.pX(16),jt.pY(8),cText,"right");
			//jt.text("Fps: ",jt.pX(8),jt.pY(11),cText,"right");
			jt.text("Maximize: ",jt.pX(8),jt.pY(11),cText,"right");
			
			jt.text("Import: ",jt.pX(23),jt.pY(5),cText,"right");
			jt.text("(Import all assets before the game)",jt.pX(23),jt.pY(5),cText,"left");
			
			//version
			jt.rect(jt.pX(50),jt.pY(5),jt.pX(0.1),jt.pY(8),cText)
			jt.text("Version: "+app.version,jt.pX(51),jt.pY(5),cText,"left");
			for(var i=0;i<app.changes.length;i++){
				jt.text("-"+app.changes[i],jt.pX(51),jt.pY(7+(2*i)),cText,"left")
			}
			
			//options
			jt.rect(jt.pX(65),jt.pY(5),jt.pX(0.1),jt.pY(8),cText)
			jt.text("Operations: ",jt.pX(72),jt.pY(5),cText,"right");
			
			//Misc
			jt.rect(jt.pX(82.5),jt.pY(5),jt.pX(0.1),jt.pY(8),cText)
			jt.text("Misc: ",jt.pX(86),jt.pY(5),cText,"right");
			jt.text(this.idea,jt.pX(91.5),jt.pY(13)+2,cText,"center");
		}
		
		if(this.tabCurr=="Create"){
			//Add
			jt.font("Consolas",app.fontSize*0.75);
			jt.text("Add: ",jt.pX(3),jt.pY(5),cText,"right");
			
			//Upload
			jt.rect(jt.pX(8.5),jt.pY(5),jt.pX(0.1),jt.pY(8))
			if(this.uploadsImage.length>0){
				if(this.uploadsImage.length-1>=this.uploadImageNum){
					jt.image(this.uploadsImage[this.uploadImageNum].name,jt.pX(16),jt.pY(6.75),jt.pX(8),jt.pY(8));
					jt.text(this.uploadsImage[this.uploadImageNum].name+" "+(this.uploadImageNum+1)+"/"+this.uploadsImage.length,jt.pX(22),jt.pY(4.5),cText,"right")
					if(this.uploadImageHover==true){
						jt.rect(jt.pX(16),jt.pY(6.75),jt.pX(8),jt.pY(8),[0,0,0,0.5]);
					}
					if(this.uploadSelected==true){
						jt.rectB(jt.pX(16),jt.pY(6.75),jt.pX(8),jt.pY(8),this.buttonCSelected,0,2);
					}
				}
				
				jt.rect(jt.pX(26.5),jt.pY(5),jt.pX(0.1),jt.pY(10),cText)
			}
			if(this.uploadsAudio.length>0){
				if(this.uploadsAudio.length-1>=this.uploadAudioNum){
					jt.text(this.uploadsAudio[this.uploadAudioNum].name+" "+(this.uploadAudioNum+1)+"/"+this.uploadsAudio.length,jt.pX(31),jt.pY(4.5),cText,"center")
				}
				jt.rect(jt.pX(35.5),jt.pY(5),jt.pX(0.1),jt.pY(10),cText)
			}
			
			if(this.uploadsAnim.length>0){
				if(this.uploadsAnim.length-1>=this.uploadAnimNum){
					jt.text(this.uploadsAnim[this.uploadAnimNum].name+" "+(this.uploadAnimNum+1)+"/"+this.uploadsAnim.length,jt.pX(41),jt.pY(4.5),cText,"center")
					jt.anim(this.uploadsAnim[this.uploadAnimNum].name,jt.pX(38),jt.pY(6.75),jt.pX(8),jt.pY(8))
				}
				jt.text("Frames:",jt.pX(51),jt.pY(4.5),cText,"center");
				jt.text("Speed (fps):",jt.pX(51),jt.pY(10.5),cText,"center");
			}
			
			
			//Grid
			jt.rect(jt.pX(55.5),jt.pY(5),jt.pX(0.1),jt.pY(8),cText)
			jt.text("Grid: ",jt.pX(59),jt.pY(5),cText,"right");
			var unit="grid Unit";
			var alpha="grid Alpha";
			jt.text(unit+": "+this.gridUnit+" ",jt.pX(67),jt.pY(8),cText,"right");
			jt.text(alpha+": "+this.gridAlpha+" ",jt.pX(67),jt.pY(11),cText,"right");
			
			var c=jt.arr(this.colors.length,"black");
			var cc=this.colors[this.colorCurr];
			c[this.colorCurr]=[255-cc[0],255-cc[1],255-cc[2],1]
			if(cc[0]>=200 && cc[1]>=200 && cc[2]>=200){
				c[this.colorCurr]=[255,0,0,1];
			}
			
			//Color picker
			jt.rect(jt.pX(73.5),jt.pY(5),jt.pX(0.1),jt.pY(9))
			jt.text("Color "+" "+" ",jt.pX(78),jt.pY(5),cText,"right");
			jt.text("picker: ",jt.pX(78),jt.pY(7),cText,"right");
			
			for(var i=0;i<this.colors.length/3;i++){
				//colors
				jt.rect(jt.pX(78+(2*i)),jt.pY(5),jt.pX(2)-2,jt.pY(3)-1,this.colors[(i*3)])
				jt.rectB(jt.pX(78+(2*i)),jt.pY(5),jt.pX(2)-2,jt.pY(3)-1,c[(i*3)],0,2)
				
				jt.rect(jt.pX(78+(2*i)),jt.pY(8)+1,jt.pX(2)-2,jt.pY(3)-2,this.colors[(i*3)+1])
				jt.rectB(jt.pX(78+(2*i)),jt.pY(8)+1,jt.pX(2)-2,jt.pY(3)-2,c[(i*3)+1],0,2)
				
				jt.rect(jt.pX(78+(2*i)),jt.pY(11)+1,jt.pX(2)-2,jt.pY(3),this.colors[(i*3)+2])
				jt.rectB(jt.pX(78+(2*i)),jt.pY(11)+1,jt.pX(2)-2,jt.pY(3),c[(i*3)+2],0,2)
				
				if(i==Math.floor(this.colorCurr/3)){
					jt.rect(jt.pX(78.5+(i*2)),jt.pY(4.5),jt.pX(0.75),jt.pY(0.5),cText);
					//jt.rect(jt.pX(71.5+(i*2)),jt.pY(14)+1,jt.pX(0.75),jt.pY(0.5),"black");
				}
				
				if(i==this.colorCurr%3){
					jt.rect(jt.pX(77.5),jt.pY(6+((this.colorCurr%3)*3)),jt.pX(0.5),jt.pY(1),cText);
					//jt.rect(jt.pX(79),jt.pY(6+((this.colorCurr%3)*3)),jt.pX(0.5),jt.pY(1),"black");
				}
			}
			
			jt.rect(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),this.rgba)
			jt.rect(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),this.gradW)
			jt.rect(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),this.gradB)
			jt.rectB(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),"black",0,1)
			
			jt.rect(jt.pX(96.5),this.pickerY-jt.pY(0.25),jt.pX(3),jt.pY(0.5),cText)
			jt.rect(jt.pX(97),jt.pY(5),jt.pX(2),jt.pY(9),this.grad)
			jt.rectB(jt.pX(97),jt.pY(5),jt.pX(2),jt.pY(9),"black",0,1)
		}
		
		//tabs
		jt.font("Consolas",app.fontSize);
		for(var i=0;i<this.tabs.length;i++){
			var c="lightgrey";
			if(app.dark){c="black"}
			var border=2;
			var str=this.tabs[i].substr(0,12);
			if(this.tabCurr==this.tabs[i] || i==this.tabHover){
				c="white";
				if(app.dark){c="#444"}
				border=0;
			}
			var cText="black";
			if(app.dark){cText="white"}
			jt.rect(jt.pX(20)*i,0,jt.pX(20),jt.pY(4),"black");
			jt.rect(jt.pX(20)*i+1,0+1,jt.pX(20)-2,jt.pY(4)-border,c);
			jt.text(str,jt.pX(20)*i+jt.pX(10),app.fontSize/2,cText,"center");
			
		}
		
	},

};
