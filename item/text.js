// import comment from '../static/comment.js';

export default class Text {
	constructor() {

		this.x = 10;
		this.y = 540;
		this.width = 620;
		this.height = 250;

		/** @type {CanvasRenderingContext2D} */
		this.ctx = document.querySelector(".outro-canvas").getContext('2d');

		//outroBackGronundImg
		this.img1 = document.querySelector("#outro_map");
		this.img2 = document.querySelector("#outro_map");
		this.img3 = document.querySelector("#outro_map");

		//텍스트 내용 입력
		this.textsrc = "sample text(bold 30px 굴림)"
		//대사 입력
		this.outComments1 = ["1", "22", "a333"];
		this.outComments2 = ["2", "22", "b333"];
		this.outComments3 = ["3", "22", "c333", "NONE"];
	}
	
	// 아웃트로 대사
	draw(x, y, comments) {
		this.ctx.fillStyle = "black"
		this.ctx.font = "bold 30px 굴림"
		// this.ctx.fillText(this.textsrc, x, y)
		if (this.count != comments.length) {
			this.ctx.fillText(comments[this.count], x, y)
		}
	};

	//텍스트 배경
	drawTextBackGronund(x, y) {
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(x, y, 640, 100);
		this.ctx.strokeRect(0, 0, 640, 700);
	};

	drawScript(ctx, script) {
		let { x, y, width, height } = this;

		//흰색 배경에 검정 테두리  
		ctx.fillStyle = '#FFF';
		ctx.fillRect(x, y, width, height);

		ctx.fillStyle = '#000';
		ctx.strokeRect(x, y, width, height);

		ctx.fillStyle = "black"
		ctx.font = "30px '맑은 고딕'"
		ctx.fillText(script[this.count], 50, 620);
	}
};