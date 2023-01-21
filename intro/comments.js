export default class Comments {

	constructor(x, y, scripts) {

		this.x = x;
		this.y = y;
		this.text = scripts;

		// this.text = ["Hey", "Brother~", "드루와!"];   // 코멘트 3개 정도 넣기
		this.font = "40px '맑은 고딕'";

		this.count = 0;
	}

	drawTextBox(ctx) {
		ctx.fillStyle = "black";    // 텍스트박스 구역
		ctx.fillRect(0, 600, 640, 200);
	}

	writeText(ctx) {
		ctx.font = this.font;
		ctx.fillStyle = "white";

		if (this.count != this.text.length) {
			ctx.fillText(this.text[this.count], this.x, this.y);
		}

	}

	clear(ctx) {
		ctx.clearRect(0, 0, 640, 800);
	}

}