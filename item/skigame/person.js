//전역변수
import skiobj from "./skiobj.js";

export default class Person {
	constructor(x, y) {
		this.x = x || 320;
		this.y = y || 200;
		this.width = 200;
		this.height = 200;
		this.speed = 5;
		/** @type {CanvasRenderingContext2D} */
		this.img = document.querySelector("#person1");

		//이동
		this.dir = 0;
		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.moveSpace = false;

	}
	draw(ctx) {
		ctx.drawImage(this.img, 0, 0, 500, 500,
			this.x - this.width / 2, this.y - this.height / 2 - 40, this.width, this.height);
		
	}
	update() { //경계선 처리 해줘야함
		for (let obj of skiobj.objects) {
			let ex = obj.centerX;
			let ey = obj.centerY;
			let x = this.x;
			let y = this.y;

			let d = ((ex - x) ** 2 + (ey - y) ** 2) ** 0.5;
			let r1r2 = 40;


			if (ex < x && x < ex + 50 && d <= r1r2) { // 나무 사이에 위치할때 && 대각선거리보다 짧을때.
				console.log("충돌발생");
				obj.detect();
				obj.chungdol();

			}
		}
		// 이동
		if (this.moveLeft && (0 < this.x && this.x < 640)) {
			this.x -= this.speed;
			this.img = document.querySelector("#person1");
		} else if (this.moveLeft && (this.x <= 0)) {
			this.x += this.speed;
			this.img = document.querySelector("#person1");
		}

		if (this.moveRight && (0 < this.x && this.x < 640)) {
			this.x += this.speed;
			this.img = document.querySelector("#person2");
		} else if (this.moveRight && (this.x >= 640)) {
			this.x -= this.speed;
			this.img = document.querySelector("#person2");
		}

		if (this.moveUp && (100 < this.y && this.y < 800))
			this.y -= this.speed - 2;
		else if (this.moveUp && (0 >= this.y)) {
			this.y += this.speed - 2;
		}

		if (this.moveDown && (0 < this.y && this.y < 800))
			this.y += this.speed - 2;
		else if (this.moveDown && (0 <= this.y)) {
			this.y -= this.speed - 2;
		}

		if (this.moveSpace && (-100 < this.y && this.y < 900))
			this.speed++;

	}
	move(dir) {
		switch (dir) {
			case 1:
				this.moveLeft = true;
				break;
			case 2:
				this.moveRight = true;
				break;
			case 3:
				this.moveUp = true;
				break;
			case 4:
				this.moveDown = true;
				break;
			case 4:
				this.moveSpace = true;
				break;
		}
	}
	stop(dir) {
		switch (dir) {
			case 1:
				this.moveLeft = false;
				break;
			case 2:
				this.moveRight = false;
				break;
			case 3:
				this.moveUp = false;
				break;
			case 4:
				this.moveDown = false;
				break;
			case 5:
				this.moveSpace = false;
				break;
		}
	}
}