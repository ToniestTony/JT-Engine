var popup={
	
	state:undefined,
	page:0,

	setup:function(){
		
	},
	
	update:function(){
		//leave it
		if(jt.kPress("escape")){
			this.state=undefined;
		}
		if(jt.mIn(jt.pX(5),jt.pY(5),jt.pX(90),jt.pY(90))){
			
		}else{
			if(jt.mPress()){
				this.state=undefined;
				jt.mRelease();
			}
		}
		

	},
	
	draw:function(){
		jt.camActive(false);
		var cBg="white";
		var cBtn="lightgrey";
		var cText="black";
		var cBtnHover="lightblue";
		var cBtnDown="DodgerBlue";
		if(app.dark){
			cBg="black";
			cBtn="#444";
			cText="white";
			cBtnHover="grey";
			cBtnDown="lightgrey";
		}
		jt.bg([0,0,0,0.5])
		jt.rect(jt.pX(5),jt.pY(5),jt.pX(90),jt.pY(90),cBg)
		jt.rectB(jt.pX(5),jt.pY(5),jt.pX(90),jt.pY(90),cText,0,2)
		
		jt.fontSize(app.fontSize*2);
		if(this.state=="image" || this.state=="anim"){
			jt.text("Choose an "+this.state,jt.w()/2,jt.pY(8),cText,"center");
		}else if(this.state=="audio"){
			jt.text("Choose a sound",jt.w()/2,jt.pY(8),cText,"center");
		}
		
		jt.rect(jt.pX(10),jt.pY(15),jt.pX(80),jt.pY(0.1),cText)
		
		var w=jt.pX(6)
		var h=jt.pY(8)
		var offsetX=jt.pX(8.5);
		var offsetY=jt.pY(16);
		var spacingX=jt.pX(5);
		var spacingY=jt.pY(6);
		var maxX=8;
		var maxPage=40;
		var max=0;
		var maxLen=20;
		
		jt.fontSize(app.fontSize*0.75);
		
		//show images
		if(this.state=="image"){max=menu.uploadsImage.length;}
		if(this.state=="audio"){max=menu.uploadsAudio.length;}
		if(this.state=="anim"){max=menu.uploadsAnim.length;}
		for(var i=0;i<maxPage;i++){
			if(i+(maxPage*this.page)>=max){
				break;
			}
			var src="cursorDiagonalLeft";
			if(this.state=="image"){src=menu.uploadsImage[i+(maxPage*this.page)].name;}
			if(this.state=="audio"){src=menu.uploadsAudio[i+(maxPage*this.page)].name;}
			if(this.state=="anim"){src=menu.uploadsAnim[i+(maxPage*this.page)].name;}
			var str=src
			if(str.length>maxLen){
				str=src.substr(0,maxLen-3);
				str+="...";
			}
			var x=offsetX+(i%maxX*(w+spacingX));
			var y=offsetY+jt.floor(i/maxX)*(h+spacingY)
			var btn={x:x,y:y,w:w,h:h,c:[0,0,0,0.5]};
			
			//draw
			if(this.state=="image"){jt.image(src,x,y,w,h);}
			if(this.state=="audio"){jt.image("JTEsoundIcon",x,y,w,h);}
			if(this.state=="anim"){jt.anim(src,x,y,w,h);}
			if(jt.mIn(btn)){
				jt.rect(btn);
				if(jt.mPress(btn)){
					if(this.state=="image"){
						this.state=undefined;
						menu.uploadImageNum=i+(maxPage*this.page);
						menu.uploadImageSelected=true;
						menu.uploadAnimSelected=false;
						inspector.tileReset();
						if(view.mouseState!="creating"){
							view.mouseState="new";
							view.mouseNew="img";
						}
					}else if(this.state=="audio"){
						this.state=undefined;
						jt.stopAll()
						jt.play(src);
						menu.uploadAudioNum=i+(maxPage*this.page);
						menu.uploadImageSelected=false;
						menu.uploadAnimSelected=false;
						var sound=menu.uploadsAudio[menu.uploadAudioNum].name;
						menu.getField("uploadVolume").text=jt.volume(sound).toString();
					}else if(this.state=="anim"){
						this.state=undefined;
						menu.uploadAnimNum=i+(maxPage*this.page);
						menu.uploadImageSelected=false;
						menu.uploadAnimSelected=true;
						menu.getField("uploadAnimFrames").text=menu.uploadsAnim[menu.uploadAnimNum].frames.toString();
						menu.getField("uploadAnimSpeed").text=menu.uploadsAnim[menu.uploadAnimNum].speed.toString();
						if(view.mouseState!="creating"){
							view.mouseState="new";
							view.mouseNew="anim";
						}
					}
					
					jt.mRelease();
				}
			}
			jt.text(str,x+w/2,y+h+jt.pY(1),cText,"center")
		}
		
		//show buttons and page
		jt.fontSize(app.fontSize*2);
		jt.text("Page: "+this.page,jt.w()/2,jt.pY(87),cText,"center");
		
		jt.fontSize(app.fontSize*4);
		if(this.page>0){
			var btn={x:jt.pX(35),y:jt.pY(85),w:jt.pX(8),h:jt.pY(8),c:cBtn}
			if(jt.mIn(btn)){
				btn.c=cBtnHover;
				if(jt.mPress()){
					this.page--;
				}
			}
			jt.rect(btn);
			jt.text("<",btn.x+btn.w/2,btn.y+btn.h/2-jt.fontSize()/2,cText,"center")
		}
		if(this.page<jt.floor((max+1)/maxPage)){
			var btn={x:jt.pX(58),y:jt.pY(85),w:jt.pX(8),h:jt.pY(8),c:cBtn}
			if(jt.mIn(btn)){
				btn.c=cBtnHover;
				if(jt.mPress()){
					this.page++;
				}
			}
			jt.rect(btn);
			jt.text(">",btn.x+btn.w/2,btn.y+btn.h/2-jt.fontSize()/2,cText,"center")
		}
		
		jt.fontSize(app.fontSize*2);
		var btn={x:jt.pX(90)-1,y:jt.pY(5)+1,w:jt.pX(5),h:jt.pY(8),c:cBtn}
		if(jt.mIn(btn)){
			btn.c=cBtnHover;
			if(jt.mPress()){
				this.state=undefined;
				jt.mRelease();
			}
		}
		jt.rect(btn);
		jt.text("X",btn.x+btn.w/2,btn.y+btn.h/2-jt.fontSize()/2,cText,"center")

	},

};
