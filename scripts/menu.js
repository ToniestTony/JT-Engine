var menu={
	tabs:["Settings","Create","Play"],
	tabCurr:"Settings",
	tabHover:-1,

	buttons:[],
	buttonC:"lightgrey",
	buttonCHover:"lightblue",
	buttonCDown:"DodgerBlue",
	buttonCSelected:"blue",
	buttonCBg:"grey",

	name:"",
	fields:[],
	writing:-1,
	writingFrame:0,
	backspace:0,
	backspaceMax:20,
	backspaceRate:2,

	macro:false,
	uploadsImage:[],
	uploadsAudio:[],
	uploadsAnim:[],
	uploadSearch:"",
	uploadImageNum:0,
	uploadAudioNum:0,
	uploadAnimNum:0,
	uploadImageHover:false,
	uploadAnimHover:false,
	uploadImageSelected:false,
	uploadAnimSelected:false,
	uploadImagesHover:false,
	uploadAudiosHover:false,
	uploadAnimsHover:false,
	repeat:false,

	showGrid:false,
	snapGrid:true,
	gridUnit:10,
	gridAlpha:1,
	gridX:0,
	gridY:0,

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
	colorsDefault:[
	[127,127,127,1],[255,255,255,1],[0,0,0,1],
	[255,0,0,1],[0,255,0,1],[0,0,255,1],
	[255,127,0,1],[0,255,127,1],[127,0,255,1],
	[255,255,0,1],[0,255,255,1],[255,0,255,1],

	],
	colorCurr:0,

	idea:"",

	maximize:false,
	ratio:false,
	socket:false,
	
	path:"",

	importMenu:false,
	importCode:"",
	importAssets:[],
	
	log:"",
	
	imagesLoaded:false,

	assetsImageLoaded:0,
	assetsImage:[],
	assetsAudioLoaded:0,
	assetsAudio:[],
	
	tilesets:{},
	tiles:{},
	
	tLayer:1000,
	tAlpha:0.5,

	setup:function(){
		//x,y,w,h,c,action,hover,trigger,text,tab
		this.buttons=[];
		this.fields=[];
		//Settings
		this.fields.push(new Field(jt.pX(8),jt.pY(5),jt.pX(10),jt.pY(2),"title","Settings","App"));
		this.fields.push(new Field(jt.pX(8),jt.pY(8),jt.pX(2.5),jt.pY(2),"w","Settings",view.viewDefaultW.toString()));
		this.fields.push(new Field(jt.pX(15.5),jt.pY(8),jt.pX(2.5),jt.pY(2),"h","Settings",view.viewDefaultH.toString()));
		//this.fields.push(new Field(jt.pX(8),jt.pY(11),jt.pX(2),jt.pY(2),"fps","Settings",app.fps));
		this.buttons.push(new Button(jt.pX(8),jt.pY(11),jt.pX(2),jt.pY(2),"maximize",true,"No","Settings"));
		this.buttons.push(new Button(jt.pX(15.5),jt.pY(11),jt.pX(2),jt.pY(2),"socket",true,"No","Settings"));
		
		//Import
		this.buttons.push(new Button(jt.pX(22),jt.pY(5),jt.pX(8.5),jt.pY(2.5),"playGetCode",false,"Copy to clipboard","Settings"));
		this.buttons.push(new Button(jt.pX(31),jt.pY(5),jt.pX(9),jt.pY(2.5),"playDownload",false,"Download game","Settings"));
		this.buttons.push(new Button(jt.pX(22),jt.pY(8.5),jt.pX(8.5),jt.pY(2.5),"importGame",false,"Import clipboard","Settings"));
		this.buttons.push(new Button(jt.pX(31),jt.pY(8.5),jt.pX(9),jt.pY(2.5),"uploadImg",false,"Upload assets","Settings"));
		this.buttons.push(new Button(jt.pX(22),jt.pY(12),jt.pX(8.5),jt.pY(2.5),"playTab",false,"Open game (tab)","Settings"));
		this.buttons.push(new Button(jt.pX(31),jt.pY(12),jt.pX(9),jt.pY(2.5),"playWindow",false,"Open game (window)","Settings"));
		
		this.buttons.push(new Button(jt.pX(57.5),jt.pY(6.5),jt.pX(7),jt.pY(2),"tilesetDelete",false,"Del tiles view","Settings"));
		this.buttons.push(new Button(jt.pX(57.5),jt.pY(9.5),jt.pX(7),jt.pY(2),"tilesetDeleteAll",false,"Del tiles views","Settings"));
		this.buttons.push(new Button(jt.pX(57.5),jt.pY(12.5),jt.pX(7),jt.pY(2),"tagsDeleteAll",false,"Del all tags","Settings"));

		this.buttons.push(new Button(jt.pX(65.5),jt.pY(6.5),jt.pX(6),jt.pY(2),"switchViews",false,"Switch views","Settings"));
		this.buttons.push(new Button(jt.pX(72),jt.pY(6.5),jt.pX(6),jt.pY(2),"switchTags",false,"Switch tags","Settings"));
		this.buttons.push(new Button(jt.pX(65.5),jt.pY(9.5),jt.pX(6),jt.pY(2),"undo",false,"Undo","Settings"));
		this.buttons.push(new Button(jt.pX(72),jt.pY(9.5),jt.pX(6),jt.pY(2),"redo",false,"Redo","Settings"));
		this.buttons.push(new Button(jt.pX(65.5),jt.pY(12.5),jt.pX(12.5),jt.pY(2),"removeActions",false,"Remove undo/redo history","Settings"));

		//this.buttons.push(new Button(jt.pX(86),jt.pY(5),jt.pX(13),jt.pY(2),"macro",true,"Show macro","Settings"));
		//this.buttons.push(new Button(jt.pX(86),jt.pY(5),jt.pX(13),jt.pY(2),"removeComments",false,"Remove comments","Settings"));
		this.buttons.push(new Button(jt.pX(82),jt.pY(5),jt.pX(6),jt.pY(2),"dark",true,"Dark theme","Settings"));
        
		this.buttons.push(new Button(jt.pX(88.5),jt.pY(5),jt.pX(10.5),jt.pY(2),"showRot",true,"Show rotated outline","Settings"));
        this.buttons[this.buttons.length-1].selected=true;
        view.showRot=true;
        
		this.buttons.push(new Button(jt.pX(82),jt.pY(8),jt.pX(10),jt.pY(2),"translateDown",true,"Only space to move","Settings","m","space"));
        
		this.buttons.push(new Button(jt.pX(92.5),jt.pY(8),jt.pX(6.5),jt.pY(2),"showActions",true,"Show actions","Settings"));
        this.buttons[this.buttons.length-1].selected=true;
        view.showActions=true;
        
		this.buttons.push(new Button(jt.pX(82),jt.pY(11),jt.pX(14),jt.pY(2),"generate",false,"Generate a game idea","Settings"));
		this.buttons.push(new Button(jt.pX(96.5),jt.pY(11),jt.pX(2.5),jt.pY(2),"generateErase",false,"X","Settings"));

		//Create
		this.buttons.push(new Button(jt.pX(3),jt.pY(5),jt.pX(4),jt.pY(2),"newRect",true,"Rect","Create","r"));
		this.buttons.push(new Button(jt.pX(7.5),jt.pY(5),jt.pX(4),jt.pY(2),"newText",true,"Text","Create","t"));
		this.buttons.push(new Button(jt.pX(0.5),jt.pY(8),jt.pX(3.5),jt.pY(2),"newCircle",true,"Circle","Create","c"));
		this.buttons.push(new Button(jt.pX(4.5),jt.pY(8),jt.pX(3.5),jt.pY(2),"newEllipse",true,"Ellipse","Create","e"));
		this.buttons.push(new Button(jt.pX(8.5),jt.pY(8),jt.pX(3),jt.pY(2),"newLine",true,"Line","Create","l"));
		this.buttons.push(new Button(jt.pX(3),jt.pY(11),jt.pX(4),jt.pY(2),"newImg",true,"Image","Create","i"));
		this.buttons.push(new Button(jt.pX(7.5),jt.pY(11),jt.pX(4),jt.pY(2),"newAnim",true,"Anim","Create","a"));

		this.buttons.push(new Button(jt.pX(12.5),jt.pY(5),jt.pX(3.5),jt.pY(2),"uploadImg",false,"Upload","Create"));
		this.buttons.push(new Button(jt.pX(16),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadMinus",false,"<","Create"));
		this.buttons.push(new Button(jt.pX(16),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadMinus10",false,"10<","Create"));
		this.buttons.push(new Button(jt.pX(26.5),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadPlus",false,">","Create"));
		this.buttons.push(new Button(jt.pX(26.5),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadPlus10",false,">10","Create"));
		this.buttons.push(new Button(jt.pX(16),jt.pY(12.5),jt.pX(1.5),jt.pY(2),"uploadDelete",false,"Del","Create"));
		this.buttons.push(new Button(jt.pX(26),jt.pY(12.5),jt.pX(2.5),jt.pY(2),"uploadToAnim",false,"Anim","Create"));
		//sounds
		this.buttons.push(new Button(jt.pX(29),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadAudioMinus",false,"<","Create"));
		this.buttons.push(new Button(jt.pX(35.5),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadAudioPlus",false,">","Create"));
		//this.buttons.push(new Button(jt.pX(29),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadAudioVolMinus",false,"-","Create"));
		//this.buttons.push(new Button(jt.pX(35.5),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadAudioVolPlus",false,"+","Create"));
		this.buttons.push(new Button(jt.pX(29),jt.pY(12.5),jt.pX(1.5),jt.pY(2),"uploadAudioDelete",false,"Del","Create"));
		this.buttons.push(new Button(jt.pX(31),jt.pY(12.5),jt.pX(6),jt.pY(2),"uploadAudioRepeat",false,"Plays once","Create"));
		this.buttons.push(new Button(jt.pX(30.75),jt.pY(6.5),jt.pX(2),jt.pY(2),"uploadAudioPlay",false,"Play","Create"));
		this.buttons.push(new Button(jt.pX(33),jt.pY(6.5),jt.pX(2),jt.pY(2),"uploadAudioStop",false,"Stop","Create"));
		//anims
		this.buttons.push(new Button(jt.pX(38),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadAnimMinus",false,"<","Create"));
		this.buttons.push(new Button(jt.pX(38),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadAnimMinus10",false,"10<","Create"));
		this.buttons.push(new Button(jt.pX(48.5),jt.pY(6.5),jt.pX(1.5),jt.pY(2),"uploadAnimPlus",false,">","Create"));
		this.buttons.push(new Button(jt.pX(48.5),jt.pY(9.5),jt.pX(1.5),jt.pY(2),"uploadAnimPlus10",false,">10","Create"));
		this.buttons.push(new Button(jt.pX(38),jt.pY(12.5),jt.pX(1.5),jt.pY(2),"uploadAnimDelete",false,"Del","Create"));

		this.fields.push(new Field(jt.pX(51),jt.pY(6.5),jt.pX(4),jt.pY(2),"uploadAnimFrames","Create"));
		this.fields.push(new Field(jt.pX(51),jt.pY(12.5),jt.pX(4),jt.pY(2),"uploadAnimSpeed","Create"));

		this.fields.push(new Field(jt.pX(71),jt.pY(9),jt.pX(2),jt.pY(2),"createR","Create"));
		this.fields.push(new Field(jt.pX(73),jt.pY(9),jt.pX(2),jt.pY(2),"createG","Create"));
		this.fields.push(new Field(jt.pX(75),jt.pY(9),jt.pX(2),jt.pY(2),"createB","Create"));
		this.fields[5].text=this.colors[this.colorCurr][0].toString();
		this.fields[6].text=this.colors[this.colorCurr][1].toString();
		this.fields[7].text=this.colors[this.colorCurr][2].toString();
		
		//GRID
		this.fields.push(new Field(jt.pX(59.75),jt.pY(7.5),jt.pX(2),jt.pY(2),"gridX","Create"));
		this.fields.push(new Field(jt.pX(59.75),jt.pY(10),jt.pX(2),jt.pY(2),"gridY","Create"));
		this.fields[8].text=this.gridX.toString();
		this.fields[9].text=this.gridY.toString();
		
		this.fields.push(new Field(jt.pX(65),jt.pY(7.5),jt.pX(2),jt.pY(2),"gridUnit","Create"));
		this.fields.push(new Field(jt.pX(65),jt.pY(10),jt.pX(2),jt.pY(2),"gridAlpha","Create"));
		this.fields[10].text=this.gridUnit.toString();
		this.fields[11].text=this.gridAlpha.toString();
		
		
		this.fields.push(new Field(jt.pX(59.75),jt.pY(12.5),jt.pX(2),jt.pY(2),"tLayer","Create"));
		this.fields.push(new Field(jt.pX(65),jt.pY(12.5),jt.pX(2),jt.pY(2),"tAlpha","Create"));
		this.fields[12].text=this.tLayer.toString();
		this.fields[13].text=this.tAlpha.toString();
		
		//Volume
		this.fields.push(new Field(jt.pX(31.5),jt.pY(9.5),jt.pX(2.5),jt.pY(2),"uploadVolume","Create"));

		this.buttons.push(new Button(jt.pX(59.5),jt.pY(5),jt.pX(5),jt.pY(2),"showGrid",true,"show Grid","Create","g","space"));
		this.buttons.push(new Button(jt.pX(65),jt.pY(5),jt.pX(5),jt.pY(2),"snapGrid",true,"Snapping","Create","s","space"));
		this.buttons[this.buttons.length-1].selected=true;
		//this.buttons.push(new Button(jt.pX(63.5),jt.pY(8),jt.pX(1.5),jt.pY(2),"unitMinus",false,"-1","Create","1","u"));
		//this.buttons.push(new Button(jt.pX(65),jt.pY(8),jt.pX(1),jt.pY(2),"unitMinus10",false,"10","Create","3","u"));
		//this.buttons.push(new Button(jt.pX(67.5),jt.pY(8),jt.pX(1.5),jt.pY(2),"unitPlus",false,"+1","Create","2","u"));
		//this.buttons.push(new Button(jt.pX(69),jt.pY(8),jt.pX(1),jt.pY(2),"unitPlus10",false,"10","Create","4","u"));
		//this.buttons.push(new Button(jt.pX(63.5),jt.pY(11),jt.pX(2.25),jt.pY(2),"alphaMinus",false,"-0.1","Create","1","a"));
		//this.buttons.push(new Button(jt.pX(67.75),jt.pY(11),jt.pX(2.25),jt.pY(2),"alphaPlus",false,"+0.1","Create","2","a"));

		this.buttons.push(new Button(jt.pX(71),jt.pY(12),jt.pX(3),jt.pY(2),"setBg",false,"Set Bg","Create"));
		this.buttons.push(new Button(jt.pX(74.5),jt.pY(12),jt.pX(3),jt.pY(2),"setDefault",false,"Reset","Create"));
		
		//Path
		this.fields.push(new Field(jt.pX(4),jt.pY(5),jt.pX(10),jt.pY(2),"path","Play"));

		//Open
		this.buttons.push(new Button(jt.pX(18),jt.pY(5),jt.pX(10),jt.pY(3.75),"playTab",false,"Open game in tab","Play"));
		this.buttons.push(new Button(jt.pX(18),jt.pY(9.25),jt.pX(10),jt.pY(3.75),"playWindow",false,"Open game in window","Play"));
		
		//Downloads
		this.buttons.push(new Button(jt.pX(34),jt.pY(5),jt.pX(10),jt.pY(3.75),"playDownload",false,"Download game (HTML)","Play"));
		this.buttons.push(new Button(jt.pX(45),jt.pY(5),jt.pX(10),jt.pY(3.75),"playDownloadCode",false,"Download code (HTML)","Play","s","ctrl"));
		this.buttons.push(new Button(jt.pX(56),jt.pY(5),jt.pX(10),jt.pY(3.75),"playGetCode",false,"Copy code (HTML)","Play"));
		
		this.buttons.push(new Button(jt.pX(34),jt.pY(9.25),jt.pX(10),jt.pY(3.75),"playDownloadScript",false,"Download game (JS)","Play"));
		this.buttons.push(new Button(jt.pX(45),jt.pY(9.25),jt.pX(10),jt.pY(3.75),"playDownloadCodeScript",false,"Download code (JS)","Play"));
		this.buttons.push(new Button(jt.pX(56),jt.pY(9.25),jt.pX(10),jt.pY(3.75),"playGetScript",false,"Copy code (JS)","Play"));
		
		
		this.buttons.push(new Button(jt.pX(67),jt.pY(5),jt.pX(10),jt.pY(8),"playLib",false,"Download JT library","Play"));
		
		this.buttons.push(new Button(jt.pX(85),jt.pY(5),jt.pX(7),jt.pY(3.75),"playExport",false,"Export all","Play"));
		this.buttons.push(new Button(jt.pX(85),jt.pY(9.25),jt.pX(7),jt.pY(3.75),"playImport",false,"Import all","Play"));
		this.buttons.push(new Button(jt.pX(92.5),jt.pY(5),jt.pX(7),jt.pY(3.75),"playExportSel",false,"Export selected","Play"));
		this.buttons.push(new Button(jt.pX(92.5),jt.pY(9.25),jt.pX(7),jt.pY(3.75),"playImportView",false,"Import in view","Play"));


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
	getBtn:function(action){
		//return first button with action
		var found=undefined;
		for(var i=0;i<this.buttons.length;i++){
			if(this.buttons[i].action==action){
				found=this.buttons[i];
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
		
		jt.mRelease();
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
			menu.imagesLoaded=false;
			menu.uploadImageNum=menu.uploadsImage.length-1;
		}
	},
	uploadAudio:function(evt){
		var file=menu.assetsAudio[menu.assetsAudioLoaded]
		if(evt.target.readyState==FileReader.DONE){
			var name=file.name.replace(/\.[^/.]+$/, "");
			jt.assets.sound(evt.target.result,name,menu.repeat);
			menu.uploadsAudio.push({type:"audio",
			path:evt.target.result,
			name:name,
			repeat:menu.repeat});
			jt.volume(0.5,name);
			menu.uploadAudioNum=menu.uploadsAudio.length-1;
		}
	},
	getCode:function(){
		var fullCode="";
		var sorted=view.objects.map(function(obj,id){
			obj.id=id;
			return obj;
		})
		
		sorted.sort(function (x, y) {
		  if(x.last){
			x.id=view.objects.indexOf(x); 
		  }
		  if(x.last==y.last){
			return 0;
		  }else if(x.last>y.last){
			return 1;
		  }else{
			return -1;
		  }
		});
		
		for(var index=0;index<sorted.length;index++){
			var obj=sorted[index];
			var code="";
			code+="var obj=new JTEObject(";
			code+=obj.x+",";
			code+=obj.y+",";
			code+=obj.w+",";
			code+=obj.h+",";
			code+="["+obj.c[0]+","+obj.c[1]+","+obj.c[2]+"],";
			code+=obj.r+",";
			code+=obj.alpha+",";
			if(sorted[index].attr!=undefined){sorted[index].attr=JSON.stringify(sorted[index].attr)}
			code+="'"+sorted[index].attr+"',";
			if(sorted[index].attr!=undefined){sorted[index].attr=JSON.parse(sorted[index].attr)}
			code+=obj.cam+",";
			code+="'"+obj.view+"',";
			sorted[index].tags=JSON.stringify(sorted[index].tags);
			code+="'"+sorted[index].tags+"',";
			sorted[index].tags=JSON.parse(sorted[index].tags);
			code+=obj.locked+",";
			var last=-1;
			if(obj.last){last=obj.id;}
			code+=last+",";
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
		var filename="jt_lib22.js";

		var element = document.createElement('a');
		element.setAttribute('href', filename);
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);


	},
	downloadGame:function(isScript,onlyCode,onlyCopy){
		var script=false;
		if(onlyCopy==undefined){onlyCopy=false;}
		if(isScript!=undefined){
			if(isScript==true){
				script=true;
			}
		}

		var only=false;
		if(onlyCode!=undefined){
			if(onlyCode==true){
				only=true;
			}
		}

		if(only){
			menu.name=menu.fields[0].text+" (quick)";
		}else{
			menu.name=menu.fields[0].text;
		}

		var code=this.getCode();
		var assets=``;

		for(var i=0;i<menu.uploadsImage.length;i++){
			assets+=`loadAssets([{type:"`+menu.uploadsImage[i].type+`",
			path:jte.path+"assets/`+menu.uploadsImage[i].name+`.png",
			name:"`+menu.uploadsImage[i].name+`"}]);`;
		}
		for(var i=0;i<menu.uploadsAudio.length;i++){
			assets+=`loadAssets([{type:"`+menu.uploadsAudio[i].type+`",
			path:jte.path+"assets/`+menu.uploadsAudio[i].name+`.mp3",
			name:"`+menu.uploadsAudio[i].name+`",
			repeat:`+menu.uploadsAudio[i].repeat+`,
			volume:`+jt.volume(menu.uploadsAudio[i].name)+`}]);`;
		}
		for(var i=0;i<menu.uploadsAnim.length;i++){
			assets+=`loadAssets([{type:"`+menu.uploadsAnim[i].type+`",
			path:jte.path+"assets/`+menu.uploadsAnim[i].name+`.png",
			name:"`+menu.uploadsAnim[i].name+`",
			frames:`+menu.uploadsAnim[i].frames+`,
			speed:`+menu.uploadsAnim[i].speed+`}]);`;
		}

		if(code==""){code=`undefined`;}
		var title=document.title.substr(0,document.title.length-6);
		var bg=view.bg;
		if(bg=="white"){bg=[255,255,255,1]}
		bg=`[`+bg+`]`;
		var scriptSocket="";
		if(this.socket){
			scriptSocket=`<script src="/socket.io/socket.io.js"></script>`;
		}
		if(script){
			var text=fullPage[2]+
			view.viewDefaultW+
			fullPage[3]+
			view.viewDefaultH+
			fullPage[4]+
			title+
			fullPage[5]+
			menu.buttons[0].selected+
			fullPage[6]+
			menu.buttons[1].selected+
			fullPage[7]+
			menu.gridUnit+
			fullPage[8]+
			menu.fields[15].text+
			fullPage[9]+
			menu.tLayer+
			fullPage[10]+
			JSON.stringify(menu.tilesets)+
			fullPage[11]+
			JSON.stringify(menu.tiles)+
			fullPage[12]+
			JSON.stringify(views.views)+
			fullPage[13]+
			bg+
			fullPage[14]+
			code+
			fullPage[15]+
			assets+
			fullPage[16];
		}else{
			var text=fullPage[0]+
			scriptSocket+
			fullPage[1]+
			fullPage[2]+
			view.viewDefaultW+
			fullPage[3]+
			view.viewDefaultH+
			fullPage[4]+
			title+
			fullPage[5]+
			menu.buttons[0].selected+
			fullPage[6]+
			menu.buttons[1].selected+
			fullPage[7]+
			menu.gridUnit+
			fullPage[8]+
			menu.fields[15].text+
			fullPage[9]+
			menu.tLayer+
			fullPage[10]+
			JSON.stringify(menu.tilesets)+
			fullPage[11]+
			JSON.stringify(menu.tiles)+
			fullPage[12]+
			JSON.stringify(views.views)+
			fullPage[13]+
			bg+
			fullPage[14]+
			code+
			fullPage[15]+
			assets+
			fullPage[16]+
			fullPage[17];
		}

		var zip=new JSZip();
		if(onlyCopy){
			navigator.clipboard.writeText(text).then(function() {
			  console.log('Async: Copying to clipboard was successful!');
			}, function(err) {
			  console.error('Async: Could not copy text: ', err);
			});
		}else{


			if(script){
				zip.file("index.js",text);
			}else{
				zip.file("index.html",text);
			}
			var folder=zip.folder("assets");

			var list = [];
			var files = ['jt_lib22.js','jquery.js'];
			var assetsName = [];
			var assetsPath = [];
			if(!only){
				for(var i=0;i<this.uploadsImage.length;i++){
					assetsName.push(this.uploadsImage[i].name+".png")
					assetsPath.push(this.uploadsImage[i].path)
				}

				for(var i=0;i<this.uploadsAudio.length;i++){
					assetsName.push(this.uploadsAudio[i].name+".mp3")
					assetsPath.push(this.uploadsAudio[i].path)
				}

				for(var i=0;i<this.uploadsAnim.length;i++){
					assetsName.push(this.uploadsAnim[i].name+".png")
					assetsPath.push(this.uploadsAnim[i].path)
				}
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

			assetsPath.forEach(function(url, i) { // (1)
			  list.push( // (2)
				fetch(url).then(function(res){
				   blob = res.blob(); // (3)
				  zip.folder("assets").file(assetsName[i],blob);
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
                    if(onlyCode){
                        saveAs(blob, menu.name+" (code).zip");
                    }else{
                        saveAs(blob, menu.name+".zip");
                    }
					  
					//window.location = "data:application/zip;base64," + base64;
				});
			  });
		}

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
				repeat:menu.uploadsAudio[i].repeat,
				volume:jt.volume(menu.uploadsAudio[i].name)}])
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
			app.game["jte"].tileLayer=menu.tLayer;
			app.game["jte"].tilesets=menu.tilesets;
			app.game["jte"].tiles=menu.tiles;
			app.game["jte"].code=menu.getCode();
			app.game["jte"].maximize=menu.buttons[0].selected;
			app.game["jte"].socket=menu.buttons[1].selected;
			app.game["jte"].gridUnit=menu.gridUnit;
			app.game["jte"].path=menu.fields[15].text;
			app.game["jte"].bg=view.bg;
			app.game.document.title=menu.fields[0].text;
			app.game.focus();
		});

		app.gameLoaded=false;
		//app.editorObject=inspector.selected[0];
		//app.game.onbeforeunload=function(){app.game=undefined;}
	},
	exportAll:true,
	exportObjects:function(all){
		var all=all;
		if(all==undefined){
			all=true;
		}
		this.exportAll=all;
		var sorted=view.objects.map(function(obj,id){
			obj.id=id;
			return obj;
		})
		
		sorted.sort(function (x, y) {
		  if(x.last){
			x.id=view.objects.indexOf(x); 
		  }
		  if(x.last==y.last){
			return 0;
		  }else if(x.last>y.last){
			return 1;
		  }else{
			return -1;
		  }
		});
		
		var sorted=view.objects.filter(function(obj){
			if(window["menu"].exportAll || (!window["menu"].exportAll && obj.selected)){
				return true;
			}else{
				return false;
			}
		}).map(function(obj){
			if(obj.last){
				obj.last=obj.id;
			}else{
				obj.last=false;
			}
			return obj;
		})
		
		var text=JSON.stringify(sorted);
		navigator.clipboard.writeText(text).then(function() {
		  console.log('Async: Copying to clipboard was successful!');
		}, function(err) {
		  console.error('Async: Could not copy text: ', err);
		});
	},
	importCurrView:false,
	importObjects:function(currView){
		var currView=currView;
		if(currView==undefined){
			currView=false;
		}
		this.importCurrView=currView;
		menu.log="";
		navigator.clipboard.readText()
			.then(text => {
			menu.log="Parsing objects";
			var objects=JSON.parse(text);
			menu.log="Parsed objects";

			//view.resetView();
			for(var i=0;i<objects.length;i++){
				var newView="";
				menu.log="Importing object "+i+"/"+objects.length;
				var o=objects[i];
				menu.log="Changing default font "+i+"/"+objects.length;
				if(o.attr!=undefined){
					if(o.attr.text!==undefined){
						if(o.attr.font===undefined){
							o.attr.font="Consolas";
						}
					}
				}
				
				
				//Change or create new view
				if(o.view!=""){
					if(window["menu"].importCurrView){
						o.view=window["view"].view;
					}else{
						if(window["views"].views.indexOf(o.view)==-1){
							window["views"].views.push(o.view);
							window["view"].view=o.view;
							window["view"].addTab(o.view);
							window["view"].resetView();
						}
					}
				}
					
				menu.log="Getting attr "+i+"/"+objects.length;
				if(o.last==undefined){
					//compatibility
					menu.log="Importing code and other attr "+i+"/"+objects.length+" ("+o.name+")";
					view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[view.objects.length-1].code=o.code;
					view.objects[view.objects.length-1].setup=o.setup;
					view.objects[view.objects.length-1].update=o.update;
					view.objects[view.objects.length-1].alpha=o.alpha;
					view.objects[view.objects.length-1].name=o.name;
					view.objects[view.objects.length-1].last=false;
					
				}else if(o.last==false){
					menu.log="Importing code and other attr "+i+"/"+objects.length+" ("+o.name+")";
					view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[view.objects.length-1].code=o.code;
					view.objects[view.objects.length-1].setup=o.setup;
					view.objects[view.objects.length-1].update=o.update;
					view.objects[view.objects.length-1].alpha=o.alpha;
					view.objects[view.objects.length-1].name=o.name;
					view.objects[view.objects.length-1].last=false;
				}else if(o.last==-1){
					menu.log="Importing code and other attr "+i+"/"+objects.length+" ("+o.name+")";
					view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[view.objects.length-1].code=o.code;
					view.objects[view.objects.length-1].setup=o.setup;
					view.objects[view.objects.length-1].update=o.update;
					view.objects[view.objects.length-1].alpha=o.alpha;
					view.objects[view.objects.length-1].name=o.name;
					view.objects[view.objects.length-1].last=false;
				}else{
					menu.log="Importing code and other attr for last "+i+"/"+objects.length+" ("+o.name+")";
					view.objects.splice(o.last,0,new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[o.last].code=o.code;
					view.objects[o.last].setup=o.setup;
					view.objects[o.last].update=o.update;
					view.objects[o.last].alpha=o.alpha;
					view.objects[o.last].name=o.name;
					view.objects[o.last].last=true;
				}
				menu.log="Done importing "+i+"/"+objects.length;
			}
		  })
		  .catch(err => {
			console.error('Error importing from clipboard: ',menu.log,err);
			
		  });
		  views.updateButtons=true;

	},
	importGame:function(){
		menu.log="";
		navigator.clipboard.readText()
		  .then(text => {
			menu.log="Checking HTML"
			//check if html
			if(text.substr(0,6)=="<html>"){
				var div = document.createElement('div');
				div.innerHTML = text;
				var scripts = div.getElementsByTagName('script');
				if(scripts.length==4){
					text=scripts[3].innerHTML;
				}else{
					text=scripts[2].innerHTML;
				}
				
			}
			menu.log="Checked HTML";
			eval(text);
			menu.log="Evaluated text";

			//width and height
			menu.log="Setting attributes";
			w=parseInt(jte.w);
			h=parseInt(jte.h);
			bg=jte.bg;
			view.bg=bg;
			menu.fields[1].text=w.toString();
			view.viewDefaultW=w;
			menu.fields[2].text=h.toString();
			view.viewDefaultH=h;
			view.setup();
			
			//Grid Unit
			//path
			if(jte.gridUnit!=undefined){
				menu.gridUnit=parseInt(jte.gridUnit);
				menu.fields[10].text=jte.gridUnit;
			}
			
			//path
			if(jte.path!=undefined){
				menu.fields[15].text=jte.path;
			}
			
			if(jte.tilesets!=undefined){
				menu.tilesets=jte.tilesets;
			}
			
			if(jte.tiles!=undefined){
				menu.tiles=jte.tiles;
			}
			
			if(jte.tileLayer!=undefined){
				menu.tLayer=parseInt(jte.tileLayer);
				menu.fields[12].text=jte.tileLayer;
			}
			

			//title
			menu.fields[0].text=jte.title;
			document.title=jte.title+" (JTE)";

			menu.log="Setting views";
			var oldViews=[];
			for(var i=0;i<views.views.length;i++){
				if(views.views[i]!="Start"){
					oldViews.push(views.views[i])
				}
			}
			views.views=[];
			views.viewsOpened=[];
			for(var i=0;i<jte.views.length;i++){
				views.views.push(jte.views[i])
				views.viewsOpened.push(false);
				view.actions[jte.views[i]]=[];
				view.actionsCurr[jte.views[i]]=-1;
			}
			for(var i=0;i<oldViews.length;i++){
				views.views.push(oldViews[i])
				views.viewsOpened.push(false);
			}
			view.view=views.views[0]
			view.tabs=["Start"];
			views.updateButtons=true;
			menu.log="Set views";

			menu.buttons[0].selected=jte.maximize;
			menu.buttons[1].selected=jte.socket;

			//view.resetView();

			menu.log="Initialize jte";
			jte.initialize();
			menu.log="Initialized jte";
			for(var i=0;i<jte.objects.length;i++){
				menu.log="Importing object "+i+"/"+jte.objects.length;
				var o=jte.objects[i];
				menu.log="Changing default font "+i+"/"+jte.objects.length;
				if(o.attr!=undefined){
					if(o.attr.text!==undefined){
						if(o.attr.font===undefined){
							o.attr.font="Consolas";
						}
					}
				}
				menu.log="Getting attr "+i+"/"+jte.objects.length;
				
				if(o.last==undefined){
					//compatibility
					menu.log="Importing code and other attr "+i+"/"+jte.objects.length+" ("+o.name+")";
					view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[view.objects.length-1].code=o.JTEcode;
					view.objects[view.objects.length-1].setup=o.JTEsetup;
					view.objects[view.objects.length-1].update=o.JTEupdate;
					view.objects[view.objects.length-1].alpha=o.alpha;
					view.objects[view.objects.length-1].name=o.name;
					view.objects[view.objects.length-1].last=false;
					
				}else if(o.last==false){
					menu.log="Importing code and other attr "+i+"/"+jte.objects.length+" ("+o.name+")";
					view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[view.objects.length-1].code=o.JTEcode;
					view.objects[view.objects.length-1].setup=o.JTEsetup;
					view.objects[view.objects.length-1].update=o.JTEupdate;
					view.objects[view.objects.length-1].alpha=o.alpha;
					view.objects[view.objects.length-1].name=o.name;
					view.objects[view.objects.length-1].last=false;
				}else if(o.last==-1){
					menu.log="Importing code and other attr "+i+"/"+jte.objects.length+" ("+o.name+")";
					view.objects.push(new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[view.objects.length-1].code=o.JTEcode;
					view.objects[view.objects.length-1].setup=o.JTEsetup;
					view.objects[view.objects.length-1].update=o.JTEupdate;
					view.objects[view.objects.length-1].alpha=o.alpha;
					view.objects[view.objects.length-1].name=o.name;
					view.objects[view.objects.length-1].last=false;
				}else{
					menu.log="Importing code and other attr "+i+"/"+jte.objects.length+" ("+o.name+")";
					view.objects.splice(o.last,0,new Object(o.x,o.y,o.w,o.h,o.c,o.r,o.attr,o.cam,o.view,o.tags,o.locked));
					view.objects[o.last].code=o.JTEcode;
					view.objects[o.last].setup=o.JTEsetup;
					view.objects[o.last].update=o.JTEupdate;
					view.objects[o.last].alpha=o.alpha;
					view.objects[o.last].name=o.name;
					view.objects[o.last].last=true;
				}
				menu.log="Done importing "+i+"/"+jte.objects.length;
			}
			
			menu.log="Load assets";
			for(var i=0;i<loadEval.length;i++){
				menu.log="Loading assets "+i+"/"+loadEval.length;
				var load=loadEval[i];
				//console.log(load)
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
					var volume=0.5;
					if(load.split(",").length==3){
						repeat=repeat.substr(0,repeat.length-2);
					}else if(load.split(",").length==4){
						var volume=load.split(",")[3].split(")")[0];
						volume=parseFloat(volume)
						volume=window["jt"].round(volume,2);
					}
					
					for(var j=0;j<this.uploadsAudio.length;j++){
						if(this.uploadsAudio[j].name==name){
							if(repeat=="true"){
								this.uploadsAudio[j].repeat=true;
							}else{
								this.uploadsAudio[j].repeat=false;
							}
							window["jt"].volume(volume,name)
							this.getField("uploadVolume").text=volume.toString();
							break;
						}
					}
				}
				menu.log="Loaded assets "+i+"/"+loadEval.length;
			}
		  })
		  .catch(err => {
			console.log("err " + menu.log);
			console.error('Error importing from clipboard: ',menu.log,err);
		  });
	},
	update:function(){
		if(!this.imagesLoaded){
			if(jt.loaded()){
				this.imagesLoaded=true;
				inspector.tileReset();
			}
		}
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
				var sound=menu.uploadsAudio[menu.uploadAudioNum].name;
				menu.getField("uploadVolume").text=jt.volume(sound).toString();
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
				if(this.buttons[i].action.substring(0,3)=="ins" && (inspector.selected.length==0 || inspector.tileset)){
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
							if(jt.kPress(this.buttons[i].key) && !jt.kCheck("ctrlL") && !jt.kCheck("shift") && !jt.kCheck("space")){
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
                                    var act=this.buttons[i].action
									if(act=="newRect" || act=="newText" || act=="newCircle" || act=="newEllipse" || act=="newLine"){
                                        view.mouseState="";
										view.mouseNew="";
									}
                                    if(this.buttons[i].action=="newImg" && menu.uploadsImage.length>0){
										view.mouseState="";
										view.mouseNew="";
									}
                                    if(this.buttons[i].action=="newAnim" && menu.uploadsAnim.length>0){
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
                                    if(this.buttons[i].action=="showRot"){
										view.showRot=false;
									}
                                    if(this.buttons[i].action=="showActions"){
										view.showActions=false;
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
											menu.getBtn("maximize").text="No";
										}
									}
									if(this.buttons[i].action=="socket"){
										if(this.socket){
											this.socket=false;
											menu.getBtn("socket").text="No";
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
						if(this.buttons[i].action.substr(0,3)=="new"){
							var removeActions=["newRect","newText","newCircle","newEllipse","newLine","newImg","newAnim"];
							for(var j=0;j<menu.buttons.length;j++){
								if(removeActions.indexOf(menu.buttons[j].action)!=-1){
									menu.buttons[j].selected=false;
								}
							}
							menu.buttons[i].selected=true;
							inspector.tileset=false;
						}
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
						}else if(this.buttons[i].action=="newCircle"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="circle";
							}
						}else if(this.buttons[i].action=="newEllipse"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="ellipse";
							}
						}else if(this.buttons[i].action=="newLine"){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="line";
							}
						}else if(this.buttons[i].action=="newImg" && menu.uploadsImage.length>0){
							if(view.mouseState!="creating"){
								view.mouseState="new";
								view.mouseNew="img";
							}
						}else if(this.buttons[i].action=="newAnim" && menu.uploadsAnim.length>0){
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
							inspector.tileReset();
						}else if(this.buttons[i].action=="uploadMinus10"){
							this.uploadImageNum-=10;
							if(this.uploadImageNum<0){this.uploadImageNum=0;}
							inspector.tileReset();
						}else if(this.buttons[i].action=="uploadPlus"){
							this.uploadImageNum++;
							if(this.uploadImageNum>this.uploadsImage.length-1){this.uploadImageNum=this.uploadsImage.length-1;}
							inspector.tileReset();
						}else if(this.buttons[i].action=="uploadPlus10"){
							this.uploadImageNum+=10;
							if(this.uploadImageNum>this.uploadsImage.length-1){this.uploadImageNum=this.uploadsImage.length-1;}
							inspector.tileReset();
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
						}else if(this.buttons[i].action=="uploadAnimMinus10"){
							this.uploadAnimNum-=10;
							if(this.uploadAnimNum<0){this.uploadAnimNum=0;}
							this.getField("uploadAnimFrames").text=this.uploadsAnim[this.uploadAnimNum].frames.toString();
							this.getField("uploadAnimSpeed").text=this.uploadsAnim[this.uploadAnimNum].speed.toString();
						}else if(this.buttons[i].action=="uploadAnimPlus"){
							this.uploadAnimNum++;
							if(this.uploadAnimNum>this.uploadsAnim.length-1){this.uploadAnimNum=this.uploadsAnim.length-1;}
							this.getField("uploadAnimFrames").text=this.uploadsAnim[this.uploadAnimNum].frames.toString();
							this.getField("uploadAnimSpeed").text=this.uploadsAnim[this.uploadAnimNum].speed.toString();
						}else if(this.buttons[i].action=="uploadAnimPlus10"){
							this.uploadAnimNum+=10;
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
							var sound=this.uploadsAudio[this.uploadAudioNum].name;
							this.getField("uploadVolume").text=jt.volume(sound).toString();
						}else if(this.buttons[i].action=="uploadAudioPlus"){
							this.uploadAudioNum++;
							if(this.uploadAudioNum>this.uploadsAudio.length-1){this.uploadAudioNum=this.uploadsAudio.length-1;}
							var sound=this.uploadsAudio[this.uploadAudioNum].name;
							this.getField("uploadVolume").text=jt.volume(sound).toString();
						/*}else if(this.buttons[i].action=="uploadAudioVolMinus"){
							var sound=this.uploadsAudio[this.uploadAudioNum].name;
							var vol=jt.volume(sound);
							vol-=0.05;
							if(vol<0){vol=0;}
							jt.volume(vol,sound);
						}else if(this.buttons[i].action=="uploadAudioVolPlus"){
							var sound=this.uploadsAudio[this.uploadAudioNum].name;
							var vol=jt.volume(sound);
							vol+=0.05;
							if(vol>1){vol=1;}
							jt.volume(vol,sound);*/
						}else if(this.buttons[i].action=="uploadAudioDelete"){
							delete jt.assets.sounds[this.uploadsAudio[this.uploadAudioNum].name];
							this.uploadsAudio.splice(this.uploadAudioNum,1);
							this.uploadAudioNum--;
							if(this.uploadAudioNum>this.uploadsAudio.length-1){this.uploadAudioNum=this.uploadsAudio.length-1;}
							if(this.uploadAudioNum<0){this.uploadAudioNum=0;}
							var sound=this.uploadsAudio[this.uploadAudioNum].name;
							this.getField("uploadVolume").text=jt.volume(sound).toString();
						}else if(this.buttons[i].action=="uploadAudioRepeat"){
							this.uploadsAudio[this.uploadAudioNum].repeat=!this.uploadsAudio[this.uploadAudioNum].repeat;
						}else if(this.buttons[i].action=="uploadAudioPlay"){
							jt.stopPlay(this.uploadsAudio[this.uploadAudioNum].name);
						}else if(this.buttons[i].action=="uploadAudioStop"){
							for(var j=0;j<this.uploadsAudio.length;j++){
								jt.stop(this.uploadsAudio[j].name);
							}
							
						//DELETES
						}else if(this.buttons[i].action=="tilesetDelete"){
							var view1=prompt("Delete tiles from view:")
							if(views.views.indexOf(view1)!=-1 || view1==""){
								menu.tiles[view1]=undefined;
							}
							views.updateButtons=true;
							jt.mRelease();
						}else if(this.buttons[i].action=="tilesetDeleteAll"){
							if(prompt("Are you sure? You can't undo this")!=null){
								for(var prop in menu.tiles){
									menu.tiles[prop]=undefined;
								}
							}
							views.updateButtons=true;
							jt.mRelease();
						}else if(this.buttons[i].action=="tagsDeleteAll"){
							var tag1=prompt("Delete object with tag")
							if(prompt("Are you sure? You can't undo this")!=null && tag1!=null){
								var del=[];
								for(var j=0;j<view.objects.length;j++){
									var index=view.objects[j].tags.indexOf(tag1);
									if(index!=-1){
										del.push(j)
									}
								}
								
								console.log(del);
								
								var mod=0;
								for(var j=0;j<del.length;j++){
									view.objects.splice(del[j]+mod,1);
									mod--;
								}
							}
							views.updateButtons=true;
							jt.mRelease();

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
                            jt.mRelease();
						}else if(this.buttons[i].action=="switchTags"){
							var tag1=prompt("Change objects from tag:")
							var tag2=prompt("Change objects to tag:")

							if(tag1!==null && tag2!==null){
								for(var j=0;j<view.objects.length;j++){
									var index=view.objects[j].tags.indexOf(tag1);
									if(index!=-1){
										view.objects[j].tags[index]=tag2;
									}
								}

								views.updateButtons=true;
							}
                            jt.mRelease();
						}else if(this.buttons[i].action=="undo"){
							view.undo=true;
						}else if(this.buttons[i].action=="redo"){
							view.redo=true;
                        }else if(this.buttons[i].action=="removeActions"){
                            if(prompt("Are you sure? You can't undo this")!=null){
                                view.actions={"":[],};
                                view.actionsCurr={"":0,};
                                for(var i=0;i<views.views.length;i++){
                                    view.actions[views.views[i]]=[];
                                    view.actionsCurr[views.views[i]]=-1;
                                }
                                view.actionsLast=0;
                                view.actionsMsgs=[];
                                view.undo=false;
                                view.redo=false;
                                jt.mRelease();
                            }
						//MISC
						}else if(this.buttons[i].action=="maximize"){
							this.maximize=true;
							for(var j=0;j<this.buttons.length;j++){
								if(this.buttons[j].action=="maximize"){
									this.buttons[j].text="Yes";
								}
							}
						}else if(this.buttons[i].action=="socket"){
							this.socket=true;
							for(var j=0;j<this.buttons.length;j++){
								if(this.buttons[j].action=="socket"){
									this.buttons[j].text="Yes";
								}
							}
						}else if(this.buttons[i].action=="macro"){
							this.macro=true;
                        }else if(this.buttons[i].action=="dark"){
							app.dark=true;
                        }else if(this.buttons[i].action=="showRot"){
							view.showRot=true;
						}else if(this.buttons[i].action=="showActions"){
							view.showActions=true;
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
							Object.prototype.update=["\tjt.drawObject(this);"];
						}else if(this.buttons[i].action=="translateDown"){
							view.translateWithMouseDown=false;
						}else if(this.buttons[i].action=="generate"){
							this.idea=idea.getIdea();
						}else if(this.buttons[i].action=="generateErase"){
							this.idea="";
						}else if(this.buttons[i].action=="tileLock" && inspector.tileset && menu.uploadsImage.length>0){
							inspector.tileLock=!inspector.tileLock;


						//INSPECTOR
						}else if(this.buttons[i].action.substr(0,3)=="ins" && !inspector.tileset){
							if(this.buttons[i].action=="insClear"){
								if(inspector.selected.length==1){
									this.fields[inspector.fields.insName].text="";

								}
							}else if(this.buttons[i].action=="insClearText"){
								if(inspector.selected.length==1){
									var arr=[];
									var t1=view.objects[inspector.selected[0]]["attr"]["text"];
									var t2="";

									var id=inspector.selected[0];
									arr.push({t1:t1,t2:t2,i:id})

									view.actionsCurr[view.view]++;
									view.actions[view.view].splice(view.actionsCurr[view.view]);
									view.actions[view.view].push({
										action:"text",
										objects:arr
									})
									
									view.objects[inspector.selected[0]]["attr"].text="";
									this.fields[inspector.fields.insText].text="";

								}
							}else if(this.buttons[i].action=="insAlignLeft"){
								if(inspector.selected.length==1){
									if(view.objects[inspector.selected[0]].attr!=undefined){
										if(view.objects[inspector.selected[0]].attr.text!=undefined){
											var arr=[];
											var a1=view.objects[inspector.selected[0]].attr.align;
											var a2="left";
											var id=inspector.selected[0];
											arr.push({a1:a1,a2:a2,i:id})

											view.actionsCurr[view.view]++;
											view.actions[view.view].splice(view.actionsCurr[view.view]);
											view.actions[view.view].push({
												action:"align",
												objects:arr
											})
											
											view.objects[inspector.selected[0]].attr.align="left";
										}
									}
								}
							}else if(this.buttons[i].action=="insAlignCenter"){
								if(inspector.selected.length==1){
									if(view.objects[inspector.selected[0]].attr!=undefined){
										if(view.objects[inspector.selected[0]].attr.text!=undefined){
											var arr=[];
											var a1=view.objects[inspector.selected[0]].attr.align;
											var a2="center";
											var id=inspector.selected[0];
											arr.push({a1:a1,a2:a2,i:id})

											view.actionsCurr[view.view]++;
											view.actions[view.view].splice(view.actionsCurr[view.view]);
											view.actions[view.view].push({
												action:"align",
												objects:arr
											})
											
											view.objects[inspector.selected[0]].attr.align="center";
										}
									}
								}
							}else if(this.buttons[i].action=="insAlignRight"){
								if(inspector.selected.length==1){
									if(view.objects[inspector.selected[0]].attr!=undefined){
										if(view.objects[inspector.selected[0]].attr.text!=undefined){
											var arr=[];
											var a1=view.objects[inspector.selected[0]].attr.align;
											var a2="right";
											var id=inspector.selected[0];
											arr.push({a1:a1,a2:a2,i:id})

											view.actionsCurr[view.view]++;
											view.actions[view.view].splice(view.actionsCurr[view.view]);
											view.actions[view.view].push({
												action:"align",
												objects:arr
											})
											
											view.objects[inspector.selected[0]].attr.align="right";
										}
									}
								}
							}else if(this.buttons[i].action=="insCam"){
								if(inspector.selected.length==1){
									view.objects[inspector.selected[0]].cam=!view.objects[inspector.selected[0]].cam;
									
									var arr=[];
									var c1=!view.objects[inspector.selected[0]].cam;
									var c2=view.objects[inspector.selected[0]].cam;
									var id=inspector.selected[0];
									arr.push({c1:c1,c2:c2,i:id})

									view.actionsCurr[view.view]++;
									view.actions[view.view].splice(view.actionsCurr[view.view]);
									view.actions[view.view].push({
										action:"cam",
										objects:arr
									})
								}
							}else if(this.buttons[i].action=="insLast"){
								if(inspector.selected.length==1){
									view.objects[inspector.selected[0]].last=!view.objects[inspector.selected[0]].last;
									
									var arr=[];
									var l1=!view.objects[inspector.selected[0]].last;
									var l2=view.objects[inspector.selected[0]].last;
									var id=inspector.selected[0];
									arr.push({l1:l1,l2:l2,i:id})

									view.actionsCurr[view.view]++;
									view.actions[view.view].splice(view.actionsCurr[view.view]);
									view.actions[view.view].push({
										action:"last",
										objects:arr
									})
								}
							//OPEN EDITOR
							}else if(this.buttons[i].action=="insEditor"){
								if(inspector.selected.length==1){
									if(app.editor==undefined){
										app.editor=window.open("editor.html","","width=1000,height=800")
										app.editorLoaded=false;
										app.editorObject=view.objects[inspector.selected[0]].name;
										app.editor.onbeforeunload=function(){app.editor=undefined;}
									}else{
										app.editor.close();
										app.editor=undefined;
									}
								}
							}

						//VIEWS
						}else if(this.buttons[i].action.substr(0,8)=="viewsAdd" && jt.mY()>jt.pY(15)){
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
						}else if(this.buttons[i].action.substr(0,8)=="viewsDel" && jt.mY()>jt.pY(15)){

								var num=parseInt(this.buttons[i].action.substr(8,9));
								var name=views.views[num];
							if(view.getObjects(name).length==0 || prompt("Are you sure? Press ok to delete "+name)!=null){
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
                                jt.mRelease();
							}

						}else if(this.buttons[i].action.substr(0,9)=="viewsOpen" && jt.mY()>jt.pY(15)){
							var num=parseInt(this.buttons[i].action.substr(9,9));
							if(view.tabs.indexOf(views.views[num])==-1){
								view.addTab(views.views[num]);
							}

							for(var j=0;j<view.objects.length;j++){
								if(view.objects[j].view==view.view || view.objects[j].view==""){
									view.objects[j].selected=false;
								}
							}
							view.selectRect=undefined;

							views.saveViewCam();
							view.view=views.views[num];
							view.resetView(views.views[num]);

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
							if(this.gridUnit>128){this.gridUnit=128;}
						}else if(this.buttons[i].action=="unitPlus10"){
							this.gridUnit+=10;
							if(this.gridUnit>128){this.gridUnit=128;}
						}else if(this.buttons[i].action=="alphaMinus"){
							this.gridAlpha=Math.round((this.gridAlpha-0.1)*10)/10;
							if(this.gridAlpha<0.1){this.gridAlpha=0.1;}
						}else if(this.buttons[i].action=="alphaPlus"){
							this.gridAlpha=Math.round((this.gridAlpha+0.1)*10)/10;
							if(this.gridAlpha>1){this.gridAlpha=1;}
						}else if(this.buttons[i].action=="setBg"){
							var c=this.colors[this.colorCurr]
							if(c[0]==255 && c[1]==255 && c[2]==255){
								view.bg="white"
							}else{
								view.bg=c
							}


						}else if(this.buttons[i].action=="setDefault"){
							if(prompt("Set the colors to default?")!=null){
								for(var i=0;i<this.colors.length;i++){
									this.colors[i][0]=this.colorsDefault[i][0];
									this.colors[i][1]=this.colorsDefault[i][1];
									this.colors[i][2]=this.colorsDefault[i][2];
								}
                                jt.mRelease();
							}
							//PLAY
						}else if(this.buttons[i].action=="playTab"){
							this.openGame("tab")
							jt.mRelease();
						}else if(this.buttons[i].action=="playWindow"){
							this.openGame("window")
							jt.mRelease();
						}else if(this.buttons[i].action=="playDownload"){
							this.downloadGame();
						}else if(this.buttons[i].action=="playDownloadCode"){
							this.downloadGame(false,true);
							this.downloadGame(false,false,true);
						}else if(this.buttons[i].action=="playGetCode"){
							this.downloadGame(false,false,true);
						}else if(this.buttons[i].action=="playDownloadScript"){
							this.downloadGame(true);
						}else if(this.buttons[i].action=="playDownloadCodeScript"){
							this.downloadGame(true,true);
							this.downloadGame(true,false,true);
						}else if(this.buttons[i].action=="playGetScript"){
							this.downloadGame(true,false,true);
						}else if(this.buttons[i].action=="playLib"){
							this.downloadLib();
						}else if(this.buttons[i].action=="playExport"){
							this.exportObjects(true);
						}else if(this.buttons[i].action=="playImport"){
							this.importObjects(false);
						}else if(this.buttons[i].action=="playExportSel"){
							this.exportObjects(false);
						}else if(this.buttons[i].action=="playImportView"){
							this.importObjects(true);
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
							if(inspector.tileset){valid=false;}
							if(inspector.selected.length!=1){valid=false;}
                            if(valid){
                                var f=this.fields[i].id;
                                if(f=="insText" || f=="insSize" || f=="insFont" || f=="insLineW" || f=="insImg"  || f=="insSX"  || f=="insSY"  || f=="insSW"  || f=="insSH" || f=="insAnim"){
                                    if(view.objects[inspector.selected[0]].attr!=undefined){
                                        if((f=="insText" || f=="insSize" || f=="insFont") && view.objects[inspector.selected[0]].attr.text==undefined){
                                            valid=false;
                                        }
                                        if((f=="insImg"  || f=="insSX"  || f=="insSY"  || f=="insSW"  || f=="insSH") && view.objects[inspector.selected[0]].attr.img==undefined){
                                            valid=false;
                                        }
                                        if(f=="insAnim" && view.objects[inspector.selected[0]].attr.anim==undefined){
                                            valid=false;
                                        }
                                        if(f=="insLineW" && view.objects[inspector.selected[0]].attr.lineW==undefined){
                                            valid=false;
                                        }
                                    }else{
                                        valid=false;
                                    }
                                }
                            }
						}
						if(this.fields[i].id.substring(0,4)=="tile"){
							if(!inspector.tileset){valid=false;}
							if(menu.uploadsImage.length==0){valid=false;}
						}
						if(this.fields[i].id.substring(0,5)=="views"){
							if(jt.mY()<=jt.pY(15)){valid=false;}
						}
						if(this.fields[i].id=="uploadAnimFrames" && menu.uploadsAnim.length<=0){
							valid=false;
						}
						if(this.fields[i].id=="uploadAnimSpeed" && menu.uploadsAnim.length<=0){
							valid=false;
						}
						if(this.fields[i].id=="uploadVolume" && menu.uploadsAudio.length<=0){
							valid=false;
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
							var h=jt.pY(2);

							var hMult=(Math.floor(obj.h/jt.pY(2)));
							var maxChars=Math.floor(obj.w/jt.textW("a"))*hMult;

							for(var x=0;x<this.fields[i].text.length+1;x++){
								var pos=((x*w)+obj.x)-w/2
								if(jt.mX()>=pos && jt.mX()<pos+w){c=x}
							}

							var y=Math.round((jt.mY()-obj.y)/h);
							c+=y*(maxChars/hMult)
							if(c>this.fields[i].text.length){c=this.fields[i].text.length}

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
								num=jt.stay(num,0,999);
								this.uploadsAnim[this.uploadAnimNum].frames=num;
								jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].frames=num;
								jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].frameW=jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].img.width/num;
								this.getField(id).text=num.toString();
							}
						}else if(id=="uploadAnimSpeed"){
							var num=parseFloat(text);
							if(num!=NaN){
								num=jt.stay(num,0,999);
								this.uploadsAnim[this.uploadAnimNum].speed=num;
								jt.assets.anims[this.uploadsAnim[this.uploadAnimNum].name].speed=num/jt.fps();
								this.getField(id).text=num.toString();
							}
						}else if(id=="uploadVolume"){
							var num=parseFloat(text);
							if(num!=NaN){
								num=jt.stay(num,0,1);
								var sound=menu.uploadsAudio[menu.uploadAudioNum].name
								jt.volume(num,sound);
								this.getField(id).text=num.toString();
							}

						}else if(id=="createR"){
							var num=parseInt(text);
							num=jt.stay(num,0,255);
							this.colors[this.colorCurr][0]=num;
							this.getField(id).text=num.toString();
						}else if(id=="createG"){
							var num=parseInt(text);
							num=jt.stay(num,0,255);
							this.colors[this.colorCurr][1]=num;
							this.getField(id).text=num.toString();
						}else if(id=="createB"){
							var num=parseInt(text);
							num=jt.stay(num,0,255);
							this.colors[this.colorCurr][2]=num;
							this.getField(id).text=num.toString();
						}else if(id=="gridX"){
							var num=parseInt(text);
							num=jt.stay(num,0,256);
							this.gridX=num;
							this.getField(id).text=num.toString();
						}else if(id=="gridY"){
							var num=parseInt(text);
							num=jt.stay(num,0,256);
							this.gridY=num;
							this.getField(id).text=num.toString();
						}else if(id=="tLayer"){
							var num=parseInt(text);
							num=jt.stay(num,0,9999);
							this.tLayer=num;
							this.getField(id).text=num.toString();
						}else if(id=="gridUnit"){
							var num=parseInt(text);
							num=jt.stay(num,0,256);
							this.gridUnit=num;
							this.getField(id).text=num.toString();
							//update gridUnit for current tilesets
							if(this.uploadImageNum<this.uploadsImage.length){
								var name=this.uploadsImage[this.uploadImageNum].name;
								for(var viewsIndex in menu.tiles){
									var currView=menu.tiles[viewsIndex];
									//Loop through chunks
									for(var chunkIndex in currView){
										var tilesets=currView[chunkIndex].tilesets
										//Loop through tilesets
										for(var tilesetIndex in tilesets){
											var currTileset=tilesets[tilesetIndex];
											if(currTileset.img==name){
												menu.tiles[viewsIndex][chunkIndex].tilesets[tilesetIndex].unit=num;
											}
										}
									}
								}
							}
						}else if(id=="gridAlpha"){
							var num=parseFloat(text);
							num=jt.stay(num,0,1);
							this.gridAlpha=num;
							this.getField(id).text=num.toString();
						}else if(id=="tAlpha"){
							var num=parseFloat(text);
							num=jt.stay(num,0,1);
							this.tAlpha=num;
							this.getField(id).text=num.toString();
						}else if(id=="path"){
							this.path=text;
						}else if(id.substr(0,5)=="views"){
							//VIEWS
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
						}else if(id.substr(0,4)=="tile" && inspector.tileset){
							if(id=="tileTags"){
								var t=text;
								try{
									t=JSON.parse(text);
								}catch(e){
									t=JSON.parse('[""]');
								}
								inspector[id]=t;
							}else{
								var num=parseInt(text);
								inspector[id]=num;
							}

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
											if(app.editorObject===view.objects[inspector.selected[0]].name){
												taken=true;
												inspector.taken=inspector.takenMax;
												inspector.nameError="editor";
											}
											if(taken){valid=false;}else{views.updateButtons=true;}
										}

										if(field=="insName" || field=="insView"){toFloat=false;}
										if(field=="insText"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.text!=undefined){
                                                    if(view.objects[inspector.selected[0]].attr.text!=text){
                                                        var arr=[];
                                                        var t1=view.objects[inspector.selected[0]]["attr"]["text"];
                                                        var t2=text

                                                        var id=inspector.selected[0];
                                                        arr.push({t1:t1,t2:t2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"text",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]=text;
                                                    }
												}
											}

										}else if(field=="insSize"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.text!=undefined){
                                                    if(parseFloat(view.objects[inspector.selected[0]].attr.size)!=parseFloat(text)){
                                                        var arr=[];
                                                        var s1=parseFloat(view.objects[inspector.selected[0]]["attr"]["size"]);
                                                        var s2=parseFloat(text)

                                                        var id=inspector.selected[0];
                                                        arr.push({s1:s1,s2:s2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"size",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]=parseFloat(text);
                                                    }
												}
											}
											
										}else if(field=="insFont"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.text!=undefined){
                                                    if(view.objects[inspector.selected[0]].attr.font!=text){
														if(text.trim()==""){
															text="Consolas";
														}
                                                        var arr=[];
                                                        var f1=view.objects[inspector.selected[0]]["attr"]["font"];
                                                        var f2=text;

                                                        var id=inspector.selected[0];
                                                        arr.push({f1:f1,f2:f2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"font",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]=text;
                                                    }
												}
											}

										}else if(field=="insLineW"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.lineW!=undefined){
                                                    if(parseFloat(view.objects[inspector.selected[0]].attr.lineW)!=parseFloat(text)){
                                                        var arr=[];
                                                        var l1=parseFloat(view.objects[inspector.selected[0]]["attr"]["lineW"]);
                                                        var l2=parseFloat(text)

                                                        var id=inspector.selected[0];
                                                        arr.push({l1:l1,l2:l2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"lineW",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"]["lineW"]=parseFloat(text);
                                                    }
												}
											}

										}else if(field=="insImg"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.img!=undefined){
                                                    if(view.objects[inspector.selected[0]].attr.img!=text){
                                                        var arr=[];
                                                        var i1=view.objects[inspector.selected[0]]["attr"]["img"];
                                                        var i2=text

                                                        var id=inspector.selected[0];
                                                        arr.push({i1:i1,i2:i2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"img",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"]["img"]=text;
                                                    }
												}
											}
											
										}else if(field=="insSX" || field=="insSY" || field=="insSW" || field=="insSH"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.img!=undefined){
                                                    if(view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]!=parseFloat(text)){
                                                        var arr=[];
														var x1=parseFloat(view.objects[inspector.selected[0]]["attr"].sX)
														var y1=parseFloat(view.objects[inspector.selected[0]]["attr"].sY)
														var w1=parseFloat(view.objects[inspector.selected[0]]["attr"].sW)
														var h1=parseFloat(view.objects[inspector.selected[0]]["attr"].sH)
														var w2=w1;
														var h2=h1;
														var x2=x1;
														var y2=y1;
														if(field=="insSX"){
															x2=parseFloat(text)
														}else if(field=="insSY"){
															y2=parseFloat(text)
														}else if(field=="insSW"){
															w2=parseFloat(text)
														}else if(field=="insSH"){
															h2=parseFloat(text)
														}
														var id=inspector.selected[0];
														arr.push({x1:x1,y1:y1,x2:x2,y2:y2,w1:w1,h1:h1,w2:w2,h2:h2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"src",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"][inspector.insToVal[field]]=parseFloat(text);
                                                    }
												}
											}

										}else if(field=="insAnim"){
											if(view.objects[inspector.selected[0]]["attr"]!=undefined){
												if(view.objects[inspector.selected[0]].attr.anim!=undefined){
                                                    if(view.objects[inspector.selected[0]].attr.anim!=text){
                                                        var arr=[];
                                                        var a1=view.objects[inspector.selected[0]]["attr"]["anim"];
                                                        var a2=text

                                                        var id=inspector.selected[0];
                                                        arr.push({a1:a1,a2:a2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"anim",
                                                            objects:arr
                                                        })

                                                        view.objects[inspector.selected[0]]["attr"]["anim"]=text;
                                                    }
												}
											}

										}else if(field=="insOrder"){
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
                                                var id1=inspector.selected[0];
                                                var id2=num;
                                                
                                                
												if(num==view.objects.length-1){
													view.objects.push(copy);
												}else if(num==0){
													view.objects.splice(num,0,copy);
												}else if(id1<num){
													view.objects.splice(num+1,0,copy);
												}else{
                                                    view.objects.splice(num,0,copy);
                                                }

												if(num<inspector.selected[0]){
													inspector.selected[0]++;
												}
                                                
												view.objects.splice(inspector.selected[0],1);
												inspector.selected[0]=num;
                                                
                                                var arr=[];
                                                arr.push({id1:id1,id2:id2})

                                                view.actionsCurr[view.view]++;
                                                view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                view.actions[view.view].push({
                                                    action:"order",
                                                    objects:arr
                                                })
											}

										}else if(valid){
                                            //add undo to fields
                                            if(text!=view.objects[inspector.selected[0]][inspector.insToVal[field]]){
                                                if(field=="insX" || field=="insY"){
                                                    var arr=[];
                                                    var x1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insX"]])
                                                    var y1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insY"]])
                                                    var x2=0;
                                                    var y2=0;
                                                    if(field=="insX"){
                                                        var x2=parseFloat(text);
                                                        var y2=y1;
                                                    }else{
                                                        var x2=x1;
                                                        var y2=parseFloat(text);
                                                    }
                                                    var id=inspector.selected[0];
                                                    arr.push({x1:x1,y1:y1,x2:x2,y2:y2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"translate",
                                                        objects:arr
                                                    })
                                                }

                                                if(field=="insW" || field=="insH"){
                                                    var arr=[];
                                                    var x1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insX"]])
                                                    var y1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insY"]])
                                                    var w1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insW"]])
                                                    var h1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insH"]])
                                                    var w2=0;
                                                    var h2=0;
                                                    var x2=x1;
                                                    var y2=y1;
                                                    if(field=="insW"){
                                                        var w2=parseFloat(text);
                                                        var h2=h1;
                                                    }else{
                                                        var w2=w1;
                                                        var h2=parseFloat(text);
                                                    }
                                                    var id=inspector.selected[0];
                                                    arr.push({x1:x1,y1:y1,x2:x2,y2:y2,w1:w1,h1:h1,w2:w2,h2:h2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"transform",
                                                        objects:arr
                                                    })
                                                }
                                                
                                                if(field=="insR"){
                                                    var arr=[];
                                                    var r1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insR"]])
                                                    var r2=parseFloat(text)
                                                    
                                                    var id=inspector.selected[0];
                                                    arr.push({r1:r1,r2:r2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"rotate",
                                                        objects:arr
                                                    })
                                                }
                                                
                                                if(field=="insA"){
                                                    var arr=[];
                                                    var a1=parseFloat(view.objects[inspector.selected[0]][inspector.insToVal["insA"]])
                                                    var a2=parseFloat(text)
                                                    
                                                    var id=inspector.selected[0];
                                                    arr.push({a1:a1,a2:a2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"alpha",
                                                        objects:arr
                                                    })
                                                }
                                                
                                                if(field=="insRR" || field=="insGG" || field=="insBB"){
                                                    var arr=[];
                                                    var r1=parseFloat(view.objects[inspector.selected[0]]["c"][0])
                                                    var g1=parseFloat(view.objects[inspector.selected[0]]["c"][1])
                                                    var b1=parseFloat(view.objects[inspector.selected[0]]["c"][2])
                                                    var r2=r1;
                                                    var g2=g1;
                                                    var b2=b1;
                                                    if(field=="insRR"){
                                                        r2=parseFloat(text);
                                                        view.objects[inspector.selected[0]]["c"][0]=parseFloat(text);
                                                    }else if(field=="insGG"){
                                                        g2=parseFloat(text);
                                                        view.objects[inspector.selected[0]]["c"][1]=parseFloat(text);
                                                    }else if(field=="insBB"){
                                                        b2=parseFloat(text);
                                                        view.objects[inspector.selected[0]]["c"][2]=parseFloat(text);
                                                    }
                                                    var id=inspector.selected[0];
                                                    arr.push({r1:r1,g1:g1,b1:b1,r2:r2,g2:g2,b2:b2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"rgb",
                                                        objects:arr
                                                    })
                                                }
                                                
                                                if(field=="insName"){
                                                    var arr=[];
                                                    var n1=view.objects[inspector.selected[0]][inspector.insToVal["insName"]]
                                                    var n2=text
                                                    
                                                    var id=inspector.selected[0];
                                                    arr.push({n1:n1,n2:n2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"name",
                                                        objects:arr
                                                    })
                                                }
                                                
                                                if(field=="insView"){
                                                    var arr=[];
                                                    var v1=view.objects[inspector.selected[0]][inspector.insToVal["insView"]]
                                                    var v2=text
                                                    
                                                    var id=inspector.selected[0];
                                                    arr.push({v1:v1,v2:v2,i:id})

                                                    view.actionsCurr[view.view]++;
                                                    view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                    view.actions[view.view].push({
                                                        action:"view",
                                                        objects:arr
                                                    })
                                                }
                                                
                                                if(field=="insTags"){
                                                    var t=text;
                                                    try{
                                                        t=JSON.parse(text);
                                                    }catch(e){
                                                        t=JSON.parse('[""]');
                                                    }
                                                    
                                                    var t1=view.objects[inspector.selected[0]][inspector.insToVal["insTags"]];
                                                    var t2=t;
                                                    var arr=[];
                                                    if(JSON.stringify(t1)!=JSON.stringify(t2)){
                                                        var id=inspector.selected[0];
                                                        arr.push({t1:t1,t2:t2,i:id})

                                                        view.actionsCurr[view.view]++;
                                                        view.actions[view.view].splice(view.actionsCurr[view.view]);
                                                        view.actions[view.view].push({
                                                            action:"tags",
                                                            objects:arr
                                                        })
                                                    }
                                                    
                                                    
                                                    
                                                    view.objects[inspector.selected[0]][inspector.insToVal["insTags"]]=t;
													views.updateButtons=true;

                                                }
                                            }
                                            
                                            if(field!="insRR" && field!="insGG" && field!="insBB" && field!="insTags"){
                                                if(toFloat){
                                                    if(isNaN(parseFloat(text))){
                                                        text="0";
                                                    }
                                                    view.objects[inspector.selected[0]][inspector.insToVal[field]]=parseFloat(text);
                                                }else{
                                                    view.objects[inspector.selected[0]][inspector.insToVal[field]]=text;
                                                }
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
			"0","1","2","3","4","5","6","7","8","9","-","=",",",".",";","é",
			"backspace","space","left","right","up","down","enter","num/"];
			var specials=["backspace","left","right","up","down","enter"];
			if(jt.kCheck("backspace")){
				//holding backspace erase quickly
				this.backspace++;
				if(this.backspace>=this.backspaceMax && this.backspace%this.backspaceRate==0){
					this.writingFrame=0;
					if(this.fields[this.writing].cursor>0){
						var start=this.fields[this.writing].text.slice(0,this.fields[this.writing].cursor-1);
						var end=this.fields[this.writing].text.slice(this.fields[this.writing].cursor,this.fields[this.writing].text.length);
						this.fields[this.writing].text=start+end;
					}

					this.fields[this.writing].cursor--;
					if(this.fields[this.writing].cursor<0){
						this.fields[this.writing].cursor=0;
					}
				}
			}else{
				this.backspace=0;
			}
			for(var i=0;i<keys.length;i++){
				if(jt.kPress(keys[i])){
					var hMult=(Math.floor(this.fields[this.writing].h/jt.pY(2)));
					var maxChars=Math.floor(this.fields[this.writing].w/jt.textW("a"))*hMult;
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
                        var upDown=30;
						if(key=="up"){
							this.fields[this.writing].cursor-=upDown;
							this.writingFrame=0;
						}
						if(key=="down"){
							this.fields[this.writing].cursor+=upDown;
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
							}else if(key=="9"){
								key="[";
							}else if(key=="0"){
								key="]";
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
			//Hovers
			this.uploadImageHover=false;
			if(this.uploadsImage.length>0){
				if(jt.mX()>=jt.pX(18) && jt.mX()<= jt.pX(26) && jt.mY()>=jt.pY(6.75) && jt.mY()<=jt.pY(14.75)){
					this.uploadImageHover=true;
					if(jt.mPress()){
						this.uploadImageSelected=true
						if(view.mouseState!="creating"){
							view.mouseState="new";
							view.mouseNew="img";
						}
					}
				}
			}
            this.uploadAnimHover=false;
			if(this.uploadsAnim.length>0){
				if(jt.mX()>=jt.pX(40) && jt.mX()<= jt.pX(48) && jt.mY()>=jt.pY(6.75) && jt.mY()<=jt.pY(14.75)){
					this.uploadAnimHover=true;
					if(jt.mPress()){
						this.uploadAnimSelected=true
						if(view.mouseState!="creating"){
							view.mouseState="new";
							view.mouseNew="anim";
						}
					}
				}
			}
			
			this.uploadImagesHover=false;
			if(this.uploadsImage.length>0){
				if(jt.mX()>=jt.pX(16) && jt.mX()<= jt.pX(28) && jt.mY()>=jt.pY(4.25) && jt.mY()<=jt.pY(6.5)){
					this.uploadImagesHover=true;
					if(jt.mPress()){
						popup.state="image";
					}
				}
			}
			
			this.uploadAudiosHover=false;
			if(this.uploadsAudio.length>0){
				if(jt.mX()>=jt.pX(29) && jt.mX()<= jt.pX(37) && jt.mY()>=jt.pY(4.25) && jt.mY()<=jt.pY(6.5)){
					this.uploadAudiosHover=true;
					if(jt.mPress()){
						popup.state="audio";
					}
				}
			}
			this.uploadAnimsHover=false;
			if(this.uploadsAnim.length>0){
				if(jt.mX()>=jt.pX(38) && jt.mX()<= jt.pX(50) && jt.mY()>=jt.pY(4.25) && jt.mY()<=jt.pY(6.5)){
					this.uploadAnimsHover=true;
					if(jt.mPress()){
						popup.state="anim";
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

					//change color picker RGB
					menu.fields[5].text=this.colors[this.colorCurr][0].toString();
					menu.fields[6].text=this.colors[this.colorCurr][1].toString();
					menu.fields[7].text=this.colors[this.colorCurr][2].toString();

					//change inspector color
					if(inspector.selected.length==1){
                        if(JSON.stringify(view.objects[inspector.selected[0]].c)!=JSON.stringify(this.colors[this.colorCurr])){
                            var arr=[];
                            var c1=view.objects[inspector.selected[0]].c;
                            var c2=this.colors[this.colorCurr];
                            var id=inspector.selected[0];
                            arr.push({c1:c1,c2:c2,i:id})

                            view.actionsCurr[view.view]++;
                            view.actions[view.view].splice(view.actionsCurr[view.view]);
                            view.actions[view.view].push({
                                action:"color",
                                objects:arr
                            })    
                        }
                           
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
					//change color picker RGB
					menu.fields[5].text=this.colors[this.colorCurr][0].toString();
					menu.fields[6].text=this.colors[this.colorCurr][1].toString();
					menu.fields[7].text=this.colors[this.colorCurr][2].toString();
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
				var cMod=false;
				var show=true;
				if((this.buttons[i].action=="newImg" || this.buttons[i].action=="uploadMinus" || this.buttons[i].action=="uploadMinus10" || this.buttons[i].action=="uploadPlus" || this.buttons[i].action=="uploadPlus10" || this.buttons[i].action=="uploadDelete" || this.buttons[i].action=="uploadToAnim") && this.uploadsImage.length==0){
					show=false;
				}
				if((this.buttons[i].action=="uploadAudioMinus" || this.buttons[i].action=="uploadAudioPlus" || this.buttons[i].action=="uploadAudioVolMinus" || this.buttons[i].action=="uploadAudioVolPlus" || this.buttons[i].action=="uploadAudioDelete" || this.buttons[i].action=="uploadAudioRepeat" || this.buttons[i].action=="uploadAudioPlay" || this.buttons[i].action=="uploadAudioStop") && this.uploadsAudio.length==0){
					show=false;
				}
				if((this.buttons[i].action=="newAnim" || this.buttons[i].action=="uploadAnimMinus" || this.buttons[i].action=="uploadAnimPlus" || this.buttons[i].action=="uploadAnimMinus10" || this.buttons[i].action=="uploadAnimPlus10" || this.buttons[i].action=="uploadAnimDelete") && this.uploadsAnim.length==0){
					show=false;
				}
				if(this.buttons[i].action.substring(0,3)=="ins"){
					if((this.buttons[i].action.substring(0,8)=="insAlign" || this.buttons[i].action.substring(0,12)=="insClearText") && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.text==undefined){
							show=false;
						}
						if(this.buttons[i].action.substring(0,8)=="insAlign" && show){
							var align=view.objects[inspector.selected[0]].attr.align;
							var action=this.buttons[i].action;;
							if((align=="left" && action=="insAlignLeft") || (align=="center" && action=="insAlignCenter") || (align=="right" && action=="insAlignRight")){
								cMod=true;
							}
						}
					}
					if(inspector.selected.length!=1){show=false;}
					if(inspector.tileset){show=false;}
				}
				if(this.buttons[i].action.substring(0,5)=="views" && this.buttons[i].y<jt.pY(15)){
					show=false;
				}
				if(this.buttons[i].action=="tileLock"){
					if(!inspector.tileset){show=false;}
					if(this.uploadsImage.length<=0){show=false;}
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
					if(this.buttons[i].selected || cMod){
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
					if(this.buttons[i].action=="tileLock"){
						text=inspector.tileLock;
					}
					if(this.buttons[i].action=="insLast"){
						if(inspector.selected.length==1){
							text=view.objects[inspector.selected[0]].last;
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
				if(this.fields[i].id.substring(0,4)=="tile"){
					if(!inspector.tileset){show=false;}
					if(menu.uploadsImage.length==0){show=false;}
				}
				if(this.fields[i].id.substring(0,3)=="ins"){
					if(inspector.tileset){show=false;}
					if((this.fields[i].id=="insText" || this.fields[i].id=="insSize" || this.fields[i].id=="insFont") && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.text==undefined){
							show=false;
						}
					}
                    if(this.fields[i].id=="insLineW" && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.lineW==undefined){
							show=false;
						}
					}
					var f=this.fields[i].id;
                    if((f=="insImg"  || f=="insSX"  || f=="insSY"  || f=="insSW"  || f=="insSH") && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.img==undefined){
							show=false;
						}
					}
                    if(this.fields[i].id=="insAnim" && inspector.selected.length==1){
						if(view.objects[inspector.selected[0]].attr==undefined){
							show=false;
						}else if(view.objects[inspector.selected[0]].attr.anim==undefined){
							show=false;
						}
					}
					if(inspector.selected.length!=1){show=false;}
				}
				if((this.fields[i].id=="uploadAnimFrames" || this.fields[i].id=="uploadAnimSpeed") && this.uploadsAnim.length<=0){
					show=false;
				}
				if(this.fields[i].id=="uploadVolume" && this.uploadsAudio.length<=0){
					show=false;
				}
				if(this.fields[i].id.substring(0,5)=="views" && this.fields[i].y<jt.pY(15)){
					show=false;
				}
				if(show){
                    
					var obj={x:menu.fields[i].x,y:menu.fields[i].y,w:menu.fields[i].w,h:menu.fields[i].h,c:menu.fields[i].c,text:menu.fields[i].text,attr:{text:menu.fields[i].text}};
					jt.baseline("top");
					var c="grey";
					var cBg="black"
					if(app.dark){c="black";cBg="grey"}
					if(i==menu.writing){cBg="black";if(app.dark){cBg="white"}}

					jt.rectB(obj.x-1,obj.y-1,obj.w+2,obj.h+2,cBg,0,2);
					//jt.text(obj.text,obj.x+2,obj.y+2,cText,"left");
					//draw text
					var ratioCam=1;
					var w=jt.textW(obj.text)/ratioCam;
					var w1=jt.textW(".")/ratioCam;
					var h=jt.textH(obj.text)/ratioCam;

					if(this.fields[i].id!="insText"){
						jt.text(obj.text,obj.x+2,obj.y+2,cText,"left");
					}else{
						if(w<=obj.w && h<=obj.h){
							jt.text(obj.text,obj.x+2,obj.y+2,cText,"left");
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
										for(var j=1;j<obj.text.length;j++){
											if(w1*j>obj.w/ratioCam){
												break;
											}else{
												maxLen=j;
											}
										}
										var numLines=Math.ceil(obj.text.length/maxLen);
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
											var str=obj.text.substr(j*maxLen,maxLen);
											jt.text(str,obj.x+2,obj.y+(jt.pY(2)*j)+2,cText,"left");
										}
									}
								}
							}
						}
					}
					var hMult=(Math.floor(obj.h/jt.pY(2)));
					var maxChars=Math.floor(obj.w/jt.textW("a"))*hMult;

					var x=((menu.fields[i].cursor*jt.textW("a"))%(obj.w-w1));

					var y=Math.floor((menu.fields[i].cursor*jt.textW("a"))/(obj.w-w1));

					if(menu.fields[i].cursor==maxChars){
						x=maxChars/hMult*jt.textW("a");
						y--;
					}

					if(i==menu.writing && menu.writingFrame<=40){
						jt.rect(obj.x+x+1,obj.y+2+(y*jt.pY(2)),1.5,jt.pY(2)-4,cBg)
					}
				}
			}
		}

		if(this.tabCurr=="Settings"){
			//Main
			jt.rect(jt.pX(18.5),jt.pY(5),jt.pX(0.1),jt.pY(9))
			jt.font("Consolas",app.fontSize*0.75);
			jt.text("Main: ",jt.pX(0.5),jt.pY(5),cText,"left");

			jt.text("Title: ",jt.pX(8),jt.pY(5),cText,"right");
			jt.text("Width: ",jt.pX(8),jt.pY(8),cText,"right");
			jt.text("Height: ",jt.pX(15.5),jt.pY(8),cText,"right");
			//jt.text("Fps: ",jt.pX(8),jt.pY(11),cText,"right");
			jt.text("Maximize: ",jt.pX(8),jt.pY(11),cText,"right");
			jt.text("Socket: ",jt.pX(15.5),jt.pY(11),cText,"right");

			jt.text("Export",jt.pX(21.75),jt.pY(5.3),cText,"right");
			jt.text("Import",jt.pX(21.75),jt.pY(8.8),cText,"right");
			jt.text("Test",jt.pX(21.75),jt.pY(12.3),cText,"right");

			//version
			jt.rect(jt.pX(40.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			jt.text("Version: "+app.version,jt.pX(41.5),jt.pY(5),cText,"left");
			for(var i=0;i<app.changes.length;i++){
				jt.text(app.changes[i],jt.pX(41.5),jt.pY(7+(2*i)),cText,"left")
			}
			
			//Tilesets
			jt.rect(jt.pX(57),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			jt.text("Deletes: ",jt.pX(61),jt.pY(4.5),cText,"center");

			//options
			jt.rect(jt.pX(65),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			jt.text("Operations: ",jt.pX(72),jt.pY(4.5),cText,"center");

			//Misc
			jt.rect(jt.pX(78.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			jt.text("Misc: ",jt.pX(82),jt.pY(5),cText,"right");
			jt.text(this.idea,jt.pX(91.5),jt.pY(13)+2,cText,"center");
		}

		if(this.tabCurr=="Create"){
			//Add
			jt.font("Consolas",app.fontSize*0.75);
			jt.text("Add: ",jt.pX(3),jt.pY(5),cText,"right");

			//Upload
			jt.rect(jt.pX(12),jt.pY(5),jt.pX(0.1),jt.pY(9))
			if(this.uploadsImage.length>0){
				if(this.uploadsImage.length-1>=this.uploadImageNum){
					jt.image(this.uploadsImage[this.uploadImageNum].name,jt.pX(18),jt.pY(6.75),jt.pX(8),jt.pY(8));
					jt.text(this.uploadsImage[this.uploadImageNum].name+" "+(this.uploadImageNum+1)+"/"+this.uploadsImage.length,jt.pX(22),jt.pY(4.5),cText,"center")
					if(this.uploadImageHover==true){
						jt.rect(jt.pX(18),jt.pY(6.75),jt.pX(8),jt.pY(8),[0,0,0,0.5]);
					}
					
					if(this.uploadImageSelected==true){
						jt.rectB(jt.pX(18),jt.pY(6.75),jt.pX(8),jt.pY(8),this.buttonCSelected,0,2);
					}
					
					//hover
					if(this.uploadImagesHover){
						jt.rect(jt.pX(16),jt.pY(4.25),jt.pX(12),jt.pY(2.25),[0,0,0,0.5]);
					}
				}

				jt.rect(jt.pX(28.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			}
			if(this.uploadsAudio.length>0){
				if(this.uploadsAudio.length-1>=this.uploadAudioNum){
					jt.text(this.uploadsAudio[this.uploadAudioNum].name+" "+(this.uploadAudioNum+1)+"/"+this.uploadsAudio.length,jt.pX(33),jt.pY(4.5),cText,"center")
					jt.text("Vol: ",jt.pX(31.5),jt.pY(9.75),cText,"right")
					jt.text(" (0-1)",jt.pX(34),jt.pY(9.75),cText,"left")
				}
				
				jt.rect(jt.pX(37.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
				
				//hover
				if(this.uploadAudiosHover){
					jt.rect(jt.pX(29),jt.pY(4.25),jt.pX(8),jt.pY(2.25),[0,0,0,0.5]);
				}
			}

			if(this.uploadsAnim.length>0){
				if(this.uploadsAnim.length-1>=this.uploadAnimNum){
					jt.text(this.uploadsAnim[this.uploadAnimNum].name+" "+(this.uploadAnimNum+1)+"/"+this.uploadsAnim.length,jt.pX(44),jt.pY(4.5),cText,"center")
					jt.anim(this.uploadsAnim[this.uploadAnimNum].name,jt.pX(40),jt.pY(6.75),jt.pX(8),jt.pY(8))
                    if(this.uploadAnimHover==true){
						jt.rect(jt.pX(40),jt.pY(6.75),jt.pX(8),jt.pY(8),[0,0,0,0.5]);
					}
					if(this.uploadAnimSelected==true){
						jt.rectB(jt.pX(40),jt.pY(6.75),jt.pX(8),jt.pY(8),this.buttonCSelected,0,2);
					}
					
					//hover
					if(this.uploadAnimsHover){
						jt.rect(jt.pX(38),jt.pY(4.25),jt.pX(12),jt.pY(2.25),[0,0,0,0.5]);
					}
				}
				jt.text("Frames:",jt.pX(53),jt.pY(4.5),cText,"center");
				jt.text("Speed(fps):",jt.pX(53),jt.pY(10.5),cText,"center");
			}


			//Grid
			jt.rect(jt.pX(56),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			jt.text("Grid: ",jt.pX(59.5),jt.pY(5),cText,"right");
			var unit="Unit";
			var alpha="Alpha";
			jt.text(unit+" ",jt.pX(65),jt.pY(7.75),cText,"right");
			jt.text("(1-256)",jt.pX(67.12),jt.pY(7.75),cText,"left");
			jt.text(alpha+" ",jt.pX(65),jt.pY(10.25),cText,"right");
			jt.text(" (0-1)",jt.pX(67),jt.pY(10.25),cText,"left");
			
			jt.text("Off X:",jt.pX(59),jt.pY(7.75),cText,"right");
			jt.text("Off Y:",jt.pX(59),jt.pY(10.25),cText,"right");
			
			jt.text("TLayer",jt.pX(59),jt.pY(12.75),cText,"right");
			jt.text("TAlpha",jt.pX(65),jt.pY(12.75),cText,"right");

			var c=jt.arr(this.colors.length,"black");
			var cc=this.colors[this.colorCurr];
			c[this.colorCurr]=[255-cc[0],255-cc[1],255-cc[2],1]
			if(cc[0]>=200 && cc[1]>=200 && cc[2]>=200){
				c[this.colorCurr]=[255,0,0,1];
			}

			//Color picker
			jt.rect(jt.pX(70.5),jt.pY(5),jt.pX(0.1),jt.pY(9))
			jt.text("Color picker:  ",jt.pX(78),jt.pY(5),cText,"right");
			jt.text("RGB:",jt.pX(74),jt.pY(7),cText,"center");

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
			
			var bg=[255,255,255,1];
			if(view.bg!="white"){
				bg=view.bg;
			}
			for(var i in this.colors){
				if(JSON.stringify(this.colors[i])==JSON.stringify(bg)){
					var c=[];
					var cc=this.colors[i];
					c=[255-cc[0],255-cc[1],255-cc[2],1]
					if(cc[0]>=200 && cc[1]>=200 && cc[2]>=200){
						c=[255,0,0,1];
					}
					var x=jt.pX(78+(2*jt.floor(i/3)));
					var y=jt.pY(5+(i%3)*3)
					jt.rect(x,y,jt.pX(0.5),jt.pY(1),c)
				}
			}

			jt.rect(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),this.rgba)
			jt.rect(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),this.gradW)
			jt.rect(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),this.gradB)
			jt.rectB(jt.pX(87),jt.pY(5),jt.pX(9),jt.pY(9),"black",0,1)

			jt.rect(jt.pX(96.5),this.pickerY-jt.pY(0.25),jt.pX(3),jt.pY(0.5),cText)
			jt.rect(jt.pX(97),jt.pY(5),jt.pX(2),jt.pY(9),this.grad)
			jt.rectB(jt.pX(97),jt.pY(5),jt.pX(2),jt.pY(9),"black",0,1)
		}else if(this.tabCurr=="Play"){
			jt.font("Consolas",app.fontSize*0.75);
			jt.text("Path: ",jt.pX(1),jt.pY(5),cText,"left");
			jt.rect(jt.pX(14.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			
			jt.text("Open: ",jt.pX(15),jt.pY(5),cText,"left");
			jt.rect(jt.pX(28.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			
			jt.text("Download: ",jt.pX(29),jt.pY(5),cText,"left");
			jt.rect(jt.pX(77.5),jt.pY(5),jt.pX(0.1),jt.pY(9),cText)
			
			jt.text("Mixing games: ",jt.pX(78),jt.pY(5),cText,"left");
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
