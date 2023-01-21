import Text from '../item/text.js';
import comment from '../static/comment.js';

export default class outroCanvas {
	constructor() {
		this.dom = document.querySelector(".outro-canvas")
		this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");
		this.text = new Text();
		// this.intro = new Intro();
		// this.menu = new Menu();

		// this.onintroOver = null;
		this.onGameClear = null;

		this.img = document.querySelector("#outro_map");
		this.outroSound = document.querySelector("#outro_voice");
		this.newlecSound = document.querySelector("#newlec_voice");
		this.ususSound = document.querySelector("#usus_voice");

		//상태변수
		this.stage = "outro"

		this.dom.onkeydown = this.keyDownHandler.bind(this);

		// comment.menuNum = 1;
	}
	//메인메뉴
	run() {
		if(comment.pauseblood){			// blood용 추가
			return;
		}
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, 640, 800);
	}

	keyDownHandler(e) {
		console.log(this.text.count);
		switch (e.keyCode) {   
			//메인화면 메뉴 이동 및 선택 키 구현해야함.

			case 32: //space bar
				if (this.stage == "outro") {
					// 배경 1
					this.ctx.fillStyle = "black";
					this.ctx.fillRect(0, 0, 640, 800);

					comment.drawScript(this.ctx, comment.outComments1);
					comment.count++;
					if(comment.count == 4)
						this.ususSound.play();
					else if (comment.count == 6)
						this.newlecSound.play();
					if (comment.count == comment.outComments1.length) {
						comment.count = 0;
						this.stage = "outro2"
					}
				}
				else if (this.stage == "outro2") {
					//배경2 사진 출력
					this.ctx.drawImage(this.img, 0, 0);

					comment.drawScript(this.ctx, comment.outComments2);
					comment.count++;
					if (comment.count == comment.outComments2.length) {
						comment.count = 0;
						this.stage = "outro3"
					}
				}
				else if (this.stage == "outro3") {
					// 배경 3
					// this.ctx.fillStyle = "black";
					// this.ctx.fillRect(0, 0, 640, 800);

					if (comment.count == 0){
						this.ctx.fillStyle = "black";	   // blood용 추가
						this.ctx.fillRect(0, 0, 640, 800);

						this.outroSound.play();
					}

					if (comment.count == comment.outComments3.length) {
						console.log("Clear");
						comment.pauseblood = false;		// 마지막 장면을 위한 상태변수
						this.run();
					}
					else if (comment.count < comment.outComments3.length) {
						comment.drawScriptRed(this.ctx, comment.outComments3);
						this.runBlood();
						comment.count++;
					}
				}
				break;
		}
	}
	// blood 이펙트
	runBlood(){
		if(!comment.pauseblood)
			return;

		this.drawBlood();
		this.updateBlood();

		window.setTimeout(()=>{
			this.runBlood()
		}, 340);
	}

	updateBlood(){
		comment.updateBloodFx();
	}

	drawBlood(ctx){ 
		comment.drawBloodFx(this.ctx);
	}
};
