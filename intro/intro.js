export default class Intro {

	constructor() {
		this.x = 0;
		this.y = 0;

	}

	drawOpening(ctx) {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 640, 800);
		//인트로 이미지 출력//
		ctx.fillStyle = "white";
		ctx.font = "40px '맑은고딕'";
		// ctx.fillText("이미지 출력", 0, 50);
		//인트로 이미지 출력//
		//----------------//
	}

	clear(ctx) {
		ctx.clearRect(0, 0, 640, 800);
	}

}