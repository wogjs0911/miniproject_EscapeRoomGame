export default class Boy {
	#speed;
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;

		this.vx = 0;
		this.vy = 0;

		this.dx = 0;
		this.dy = 0;

		// ----- 상호작용을 위한 hitbox -----
		this.boxWidth = 5;
		this.boxXR = this.boxWidth / 2;
		this.boxheight = 5;
		this.boxYR = this.boxheight / 2;
		// -----------------------------------

		this.walkDelay = 20;

		this.dir = 0;
		this.#speed = 5;

		this.yLevel = 0;

		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;


		// ----- 이미지를 그리기 위한 변수 -----

		this.img = document.querySelector("#boy");

		this.ix = 1;
		this.iy = 2;

		this.sw = this.img.width / 3;
		this.sh = this.img.height / 4;

		this.sx = this.sw * this.ix;
		this.sy = this.sh * this.iy;

	}

	set speed(value) {
		this.#speed = value;
	}
	get speed() {
		return this.#speed;
	}

	calcYLevel(y) {
		if (y - this.boxYR <= 220)
			return 0
		else if (220 < y && y <= 320)
			return 1;
		else if (320 < y && y <= 380)
			return 2;
		else if (380 < y && y <= 480)
			return 3;
		else if (480 < y && y <= 540)
			return 4;
		else if (540 < y && y <= 640)
			return 5;
		else if (640 < y && y <= 670)
			return 6;
		else if (670 < y)
			return 7;
	}

	draw(ctx) {
		this.yLevel = this.calcYLevel(this.y);
		// console.log(this.yLevel);
		/*--- hitbox rendering ---*/
		// ctx.fillStyle = "red";
		// ctx.fillRect(this.x - this.boxXR, this.y - this.boxYR, this.boxWidth, this.boxheight);
		/*------------------------*/

		this.sx = this.sw * this.ix;
		this.sy = this.sh * this.iy;
		
		let boyPride = 1.8;
		ctx.drawImage(this.img,
			this.sx, this.sy, this.sw, this.sh,
			this.x - (this.sw * boyPride / 2), this.y - this.sh * boyPride, this.sw * boyPride, this.sh * boyPride);
	}
	update() {
		if (this.moveLeft || this.moveRight || this.moveUp || this.moveDown) {
			this.walkDelay--;
			if (this.walkDelay == 0) {
				this.ix = (this.ix == 2) ? 0 : 2;
				this.walkDelay = 20;
			}
		}
		if (!(this.moveLeft || this.moveRight || this.moveUp || this.moveDown))
			this.ix = 1;

		// ----- 키보드 이동 -----
		if (this.moveLeft) {
			// this.iy = 3;
			this.iy = 1;
			let leftLimit = 60;
			switch (this.yLevel) {
				case 1:
				case 3:
				case 5:
					leftLimit = 320;
					break;
				case 7:
					leftLimit = 180;
					break;
			}
			if (this.x - this.boxXR > leftLimit)
				this.x -= this.#speed;
		}
		if (this.moveRight) {
			// this.iy = 1;
			this.iy = 2;
			let rightLimit = 590;
			switch (this.yLevel) {
				case 0:
					rightLimit = 480
					break;
				case 1:
				case 3:
				case 5:
					rightLimit = 400;
					break;
			}
			if (this.x + this.boxXR < rightLimit)
				this.x += this.#speed;
		}
		if (this.moveUp) {
			// this.iy = 0;
			this.iy = 3;
			let upLimit = 140;
			let hasSpace = true;
			let nextYLevel = this.calcYLevel(this.y - this.#speed);
			switch (nextYLevel) {
				case 1:
				case 3:
				case 5:
					if (320 <= this.x && this.x <= 400)
						hasSpace = true;
					else
						hasSpace = false;
					break;
			}
			// console.log(`yLevel : ${this.yLevel} nextYLevel : ${this.nextYLevel}, ${hasSpace}`);
			if (this.y > upLimit + this.boxYR && hasSpace)
				this.y -= this.#speed;
		}
		if (this.moveDown) {
			// this.iy = 2;
			this.iy = 0;
			let downLimit = 770;
			let hasSpace = true;
			let nextYLevel = this.calcYLevel(this.y + this.#speed);
			switch (nextYLevel) {
				case 1:
				case 3:
				case 5:
					if (320 <= this.x && this.x <= 400)
						hasSpace = true;
					else
						hasSpace = false;
					break;
				case 7:
					if (180 <= this.x)
						hasSpace = true;
					else
						hasSpace = false;
					break;
			}
			if (this.y < downLimit && hasSpace)
				this.y += this.#speed;
		}
	}
	moveTo(dx, dy) {
		this.ix = 0;

		let w = dx - this.x;
		let h = dy - this.y;
		let d = Math.sqrt(w * w + h * h)

		this.vx = (w / d) * this.#speed;
		this.vy = (h / d) * this.#speed;

		this.dx = dx;
		this.dy = dy;
	}
	move(dir) {
		switch (dir) {
			case 1: // 북쪽
				this.moveUp = true;
				break;
			case 2: // 동쪽
				this.moveRight = true;
				break;
			case 3: // 남쪽
				this.moveDown = true;
				break;
			case 4: // 서쪽
				this.moveLeft = true;
				break;
		}
	}
	stop(dir) {
		switch (dir) {
			case 1: // 북쪽
				this.moveUp = false;
				break;
			case 2: // 동쪽
				this.moveRight = false;
				break;
			case 3: // 남쪽
				this.moveDown = false;
				break;
			case 4: // 서쪽
				this.moveLeft = false;
				break;
		}
	}
}