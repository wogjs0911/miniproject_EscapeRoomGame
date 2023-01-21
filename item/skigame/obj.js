import skiobj from './skiobj.js'


export default class Obj {
	constructor(x, y) {
		this.x = x || 200;
		this.y = y || 750;
		this.speedY = 4;
		this.speedX = -(5);

		this.img = document.querySelector("#obj")
		this.img2 = document.querySelector("#obj2")

		this.passed = false;

		this.imgEffect = document.querySelector("#effect");
		this.effectFrame = 0;
		this.isDetect = false;          // 충돌 감지
		this.esw = 100;             // 이펙트 크기
		this.esh = 100;

	}
	detect() {
		this.isDetect = true;
	}

	chungdol() {
		const myAudio2 = document.getElementById("bgm2") // Audio객체 취득
		myAudio2.volume = 1;

		if (!this.passed) {
			console.log("1point ++")
			myAudio2.play();
			skiobj.point += 1; //전객체
			this.passed = true;
		}
	}

	draw(ctx) {
		const myAudio4 = document.getElementById("bgm4") // Audio객체 취득
		// 장애물 그리기
		ctx.drawImage(this.img, this.x, this.y, 100, 100);

		if (this.isDetect && this.effectFrame < 29) {
			this.eix = this.effectFrame % 6;
			this.eiy = Math.floor(this.effectFrame / 6);

			this.effectFrame++;

			this.sx = this.esw * this.eix;
			this.sy = this.esh * this.eiy;

			ctx.drawImage(this.imgEffect, this.sx, this.sy, this.esw, this.esh,
				this.centerX - 90, this.centerY - 130, this.esw * 2, this.esh * 2);
		}

		// 나무 그리기
		ctx.drawImage(this.img2, 0, this.y, 100, 100);
		ctx.drawImage(this.img2, 550, this.y, 100, 100);

		// 목표점수 설정
		if (skiobj.point >= 10) {
			myAudio4.play();
			ctx.font = "80px 굴림체"
			ctx.fillText("Hint : 5", 200, 400);
		}
	}
	drawPoint(ctx) {
		//점수표시
		ctx.font = "30px 굴림체"
		
		ctx.fillText("score : " + skiobj.point, 430, 50);

	}
	update() {
		// 장애물 y축 이동
		this.y -= this.speedY;
		
		this.x += this.speedX;
		// 장애물 x축 이동
		if (this.x < 100) {
			this.speedX *= (-1);
			
		}
		if (this.x > 450) {
			this.speedX *= (-1);
			
		}

	}
	//장애물 좌표 (센터 보정 필요.)
	get centerX() {
		return this.x + 30;
	}

	get centerY() {
		return this.y + 80;
	}
};

