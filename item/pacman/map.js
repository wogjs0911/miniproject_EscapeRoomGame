import Pacman from './Pacman.js'
import Enemy from './enemy.js'
import MovingDir from './MovingDir.js';

export default class Map {
	constructor(tileSize) {
		this.tileSize = tileSize;

		this.yellowDot = new Image();
		this.yellowDot.src = "image/pacman/yellowDot.png";

		this.wall = new Image();
		this.wall.src = "image/pacman/wall.png"

	}
	//0 dot
	//1 wall
	//4 pac man
	//5 empty space
	//6 enemy

	map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 0, 0, 6, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]

	draw(ctx) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column];
				if (tile === 1) {
					this.#drawWall(ctx, column, row, this.tileSize);
				} else if (tile === 0) {
					this.#drawDot(ctx, column, row, this.tileSize);
				}
				else {
					this.#drawBlank(ctx, column, row, this.tileSize);
				}

				// ctx.strokeStyle = "yellow"
				// ctx.strokeRect(
				//     column*this.tileSize,
				//     row* this.tileSize,
				//     this.tileSize,
				//     this.tileSize
				// )

			}
		}
	}

	setCanvasSize(canvas) {
		canvas.width = this.map[0].length * this.tileSize;
		canvas.height = this.map.length * this.tileSize;
	}
	#drawDot(ctx, column, row, size) {
		ctx.drawImage(
			this.yellowDot,
			column * this.tileSize,
			row * this.tileSize,
			size,
			size
		);
	}

	#drawWall(ctx, column, row, size) {
		ctx.drawImage(
			this.wall,
			column * this.tileSize,
			row * this.tileSize,
			size,
			size
		);
	}

	#drawBlank(ctx, column, row, size) {
		ctx.fillStyle = 'black';
		ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size)
	}
	getPacman(speed, canvas) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column];
				if (tile === 4) {
					this.map[row][column] = 0;
					return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, speed, this, canvas);
				}
			}

		}
	}

	getEnemies(speed) {
		const enemies = [];
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				const tile = this.map[row][column];
				if (tile == 6) {
					this.map[row][column] = 0;
					enemies.push(
						new Enemy(
							column * this.tileSize,
							row * this.tileSize,
							this.tileSize,
							speed,
							this));
				}
			}
		}
		return enemies;
	}

	chungdol(x, y, dir) {
		if (dir == null) {
			return;
		}

		if (
			Number.isInteger(x / this.tileSize) &&
			Number.isInteger(y / this.tileSize)
		) {
			let column = 0;
			let row = 0;
			let nextRow = 0;
			let nextColumn = 0;

			switch (dir) {
				case MovingDir.right:
					nextColumn = x + this.tileSize;
					column = nextColumn / this.tileSize;
					row = y / this.tileSize;
					break;
				case MovingDir.left:
					nextColumn = x - this.tileSize;
					column = nextColumn / this.tileSize;
					row = y / this.tileSize;
					break;
				case MovingDir.up:
					nextRow = y - this.tileSize;
					row = nextRow / this.tileSize;
					column = x / this.tileSize;
					break;
				case MovingDir.down:
					nextRow = y + this.tileSize;
					row = nextRow / this.tileSize;
					column = x / this.tileSize;
					break;

			}
			const tile = this.map[row][column];
			if (tile === 1) {
				return true;
			}

		}
		return false;
	}

	didWin() {
		return this.#dotsleft() === 0;
	}

	#dotsleft() {
		return this.map.flat().filter((tile) => tile === 0).length;
	}

	eatDot(x, y) {
		const row = y / this.tileSize;
		const column = x / this.tileSize;
		if (Number.isInteger(row) &&
			Number.isInteger(column)) {
			if (this.map[row][column] === 0) {
				this.map[row][column] = 5;
				return true;
			}
		}
		return false;
	}
}


