import Map from "../item/pacman/map.js"

export default class PackmanCanvas {

	constructor() {
		this.tileSize = 32;
		this.speed = 2;

		this.canvas = document.querySelector(".packman-canvas");
		this.canvas.focus();
		this.ctx = this.canvas.getContext("2d");

		this.pause2 = true;

		this.map = new Map(this.tileSize);
		this.pacman = this.map.getPacman(this.speed, this.canvas);
		this.enemies = this.map.getEnemies(this.speed);

		this.gameOver = false;
		this.gameWin = false;
		this.gameWinSound = new Audio("audio/pacman/gameWin.wav");
		this.gameOverSound = new Audio("audio/pacman/gameOver.wav");
		this.map.setCanvasSize(this.canvas);

		this.onPackmanGameOver = null;
		this.canvas.addEventListener("keydown", this.keyDownHandler.bind(this));
	}

	run() {
		if (this.pause2)
			return;
		// console.log("packman-run");
		this.map.draw(this.ctx);
		this.drawGameEnd();
		this.pacman.draw(this.ctx, this.pause());
		this.checkGameWin();
		this.enemies.forEach((enemy) => enemy.draw(this.ctx, this.pause(), this.pacman));
		this.checkGameOver();

		setTimeout(() => {
			this.run();
		}, 10);
	};

	checkGameWin() {
		if (!this.gameWin) {
			this.gameWin = this.map.didWin();
			if (this.gameWin) {
				this.gameWinSound.play();
			}
		}
	}

	checkGameOver() {
		if (!this.gameOver) {
			this.gameOver = this.isGameOver();
			if (this.gameOver) {
				this.gameOverSound.play();
			}
		}
	}

	isGameOver() {
		return this.enemies.some(
			(enemy) => enemy.collideWith(this.pacman))
	}

	pause() {
		return !this.pacman.madeFirstMove || this.gameWin || this.gameOver;
	}

	drawGameEnd() {
		if (this.gameWin || this.gameOver) {
			let text = "   You Win!";
			if (this.gameOver) {
				text = "  Game Over";
			}

			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, this.canvas.height / 3.2, this.canvas.width, 80);

			this.ctx.font = "80px comic sans";
			const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
			gradient.addColorStop("0", "magenta");
			gradient.addColorStop("0.5", "blue");
			gradient.addColorStop("1.0", "red");

			this.ctx.fillStyle = gradient;
			this.ctx.fillText(text, 10, this.canvas.height / 2);
		}
	}

	reset(){
		const tileSize = 32;
		const speed = 2;

		this.pause2 = true;

		this.map = new Map(tileSize);
		this.pacman = this.map.getPacman(speed, this.canvas);
		this.enemies = this.map.getEnemies(speed);

		this.gameOver = false;
		this.gameWin = false;
		this.map.setCanvasSize(this.canvas);

	}

	keyDownHandler(e) { // stage가 gameRun일 때의 keyDownHandler
		switch (e.key) {
			case "Escape":
				this.onPackmanGameOver();
				break;
		}
	}

}
