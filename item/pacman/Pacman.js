import MovingDir from "./MovingDir.js";

export default class Pacman {
	constructor(x, y, tileSize, speed, map, canvas) {
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.speed = speed;
		this.map = map;

		this.currentMovingDir = null;
		this.requestedMovingDir = null;

		this.pacmanAnimationTimerDefault = 7;

		this.pacmanAnimationTimer = null;
		this.pacmanRotation = this.Rotation.right;
		this.wakaSound = new Audio("audio/pacman/waka.wav")

		this.madeFirstMove = false;

		canvas.addEventListener("keydown", this.#keydown.bind(this))

		this.#loadPacmanImages();

	}

	Rotation = {
		right: 0,
		down: 1,
		left: 2,
		up: 3,
	}

	draw(ctx, pause) {
		if (!pause) {
			this.#move();
			this.#animate();
		}

		this.#eatDot();

		const size = this.tileSize / 2;

		//이미지를 인덱스에 맞게 90도로 돌리고 다시 저장하는 기능
		ctx.save();
		ctx.translate(this.x + size, this.y + size)
		ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
		ctx.drawImage(this.pacmanImages[this.pacmanImageIndex],
			-size,
			-size,
			this.tileSize,
			this.tileSize);
		ctx.restore();
		// ctx.drawImage(
		//     this.pacmanImages[this.pacmanImageIndex],
		//     this.x,
		//     this.y,
		//     this.tileSize,
		//     this.tileSize);
	}
	//현재 위치를 타일사이즈로 나눠서 정수값을 얻고
	//충돌하지않으면 계속 진행, 충돌해서 전부값이0 멈추고 멈췄을때 이미지 지정
	#move() {
		if (this.currentMovingDir !== this.requestedMovingDir) {
			if (
				Number.isInteger(this.x / this.tileSize) &&
				Number.isInteger(this.y / this.tileSize)
			) {
				if (!this.map.chungdol(
					this.x,
					this.y,
					this.requestedMovingDir
				)
				)
					this.currentMovingDir = this.requestedMovingDir;
			}
		}

		if (
			this.map.chungdol(
				this.x,
				this.y,
				this.currentMovingDir
			)
		) {
			this.pacmanAnimationTimer = null;
			this.pacmanImageIndex = 1;
			return;
		}
		else if (this.currentMovingDir != null &&
			this.pacmanAnimationTimer == null
		) {
			this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
		}

		//현재 위치방향을 보고 속도 조절, 가는 방향으로 팩맨 몸이 돌아가는 코드

		switch (this.currentMovingDir) {
			case MovingDir.up:
				this.y -= this.speed;
				this.pacmanRotation = this.Rotation.up;
				break;
			case MovingDir.down:
				this.y += this.speed;
				this.pacmanRotation = this.Rotation.down;
				break;
			case MovingDir.left:
				this.x -= this.speed;
				this.pacmanRotation = this.Rotation.left;
				break;
			case MovingDir.right:
				this.x += this.speed;
				this.pacmanRotation = this.Rotation.right;
				break;
		}
	}

	//멈춰있으면 아무것도 안하고 움직일때 그림이 계속 돌아가는 코드
	#animate() {
		if (this.pacmanAnimationTimer == null) {
			return;
		}
		this.pacmanAnimationTimer--;
		if (this.pacmanAnimationTimer == 0) {
			this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
			this.pacmanImageIndex++;
			if (this.pacmanImageIndex == this.pacmanImages.length)
				this.pacmanImageIndex = 0;
		}
	}

	#loadPacmanImages() {
		const pacmanImage1 = new Image();
		pacmanImage1.src = "image/pacman/pac0.png";

		const pacmanImage2 = new Image();
		pacmanImage2.src = "image/pacman/pac1.png";

		const pacmanImage3 = new Image();
		pacmanImage3.src = "image/pacman/pac2.png";

		const pacmanImage4 = new Image();
		pacmanImage4.src = "image/pacman/pac1.png";

		this.pacmanImages = [
			pacmanImage1,
			pacmanImage2,
			pacmanImage3,
			pacmanImage4];

		this.pacmanImageIndex = 0;
	}

	//위아래, 양옆 방향전환을 빠르게 해주는 코드
	#keydown = (e) => {
		console.log("pacman handler");
		if (e.keyCode == 38) {
			if (this.currentMovingDir == MovingDir.down)
				this.currentMovingDir = MovingDir.up;
			this.requestedMovingDir = MovingDir.up;
			this.madeFirstMove = true;
		}
		if (e.keyCode == 40) {
			if (this.currentMovingDir == MovingDir.up)
				this.currentMovingDir = MovingDir.down;
			this.requestedMovingDir = MovingDir.down;
			this.madeFirstMove = true;
		}
		if (e.keyCode == 37) {
			if (this.currentMovingDir == MovingDir.right)
				this.currentMovingDir = MovingDir.left;
			this.requestedMovingDir = MovingDir.left;
			this.madeFirstMove = true;
		}
		if (e.keyCode == 39) {
			if (this.currentMovingDir == MovingDir.left)
				this.currentMovingDir = MovingDir.right;
			this.requestedMovingDir = MovingDir.right;
			this.madeFirstMove = true;
		}
	}

	#eatDot() {
		if (this.map.eatDot(this.x, this.y)) {
			this.wakaSound.play();
		}
	}
}

// Pacman(
//     column * this.tileSize, row * this.tileSize, this.tileSize, speed, this
// ) 