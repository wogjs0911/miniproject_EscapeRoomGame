export default class Background {
	constructor(x, y) {
		this.x = 0;
		this.y = 0;

		// this.img = document.querySelector("#bg");
		this.img = document.querySelector("#bg");
		this.onImg = document.querySelector("#bg_on");
		this.moniterImg = document.querySelector("#bg_moniter");
	}
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y);
	}
	drawMoniter(ctx) {
		ctx.drawImage(this.moniterImg, this.x, this.y);
	}
}