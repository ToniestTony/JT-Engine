var editor={
	exitHover:true,
	exitDown:false,
	heldDown:false,
	setup:function(){

	},
	update:function(){
		this.exitHover=false;
		this.exitDown=false;
		if(jt.mX()>=jt.pX(77) && jt.mX()<=jt.pX(80) && jt.mY()>=jt.pY(15) && jt.mY()<=jt.pY(18)){
			this.exitHover=true;
			if(this.heldDown){this.exitDown=true;}
			if(this.heldDown && !jt.mDown()){
				app.editor=false;
			}
		}
		this.heldDown=jt.mDown();
		
	},
	draw:function(){
		jt.camactive(false);
		jt.rect(jt.pX(20),jt.pY(15),jt.pX(60),jt.pY(85),[40,40,40]);
		jt.font("Consolas",app.fontSize);
		jt.baseline("top");
		jt.text("Code editor",jt.pX(20),jt.pY(15),"white","left");
		
		var buttonC="firebrick";
		if(this.exitHover){buttonC="red";}
		if(this.exitDown){buttonC="lightcoral";}
		jt.rect(jt.pX(77),jt.pY(15),jt.pX(3),jt.pY(3),buttonC);
		jt.text("X",jt.pX(78.5),jt.pY(15.5),"white","center");
	},

};