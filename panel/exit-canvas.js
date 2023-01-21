export default class ExitCanvas {
	#password

	constructor() {
		this.dom = document.querySelector(".exit-canvas");
		// this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");

		this.img = document.querySelector("#exit_lock");// 412*810

		this.lockerButton = document.querySelector("#locker_button");
		this.lockerOpen = document.querySelector("#locker_open");

		this.dom.addEventListener("click", this.clickHandler.bind(this));
		this.dom.addEventListener("keydown", this.keyDownHandler.bind(this));

		this.text = ["반응이 없다", "문이 열렸다"]

		this.x = (this.dom.width / 2) - (this.img.width / 4);
		this.y = 50;
		this.pwdX = 253;
		this.pwdY = 330;
		this.pwdOrder = 0;

		// 게임 상태변수
		this.inputPwd = "";
		this.#password = 3859;

		this.onExitStageEscape = null;
		this.onGameClear = null;
	}

	draw() {
		this.ctx.drawImage(this.img, 0, 0);
	}

	// ----- event handlers -----
	clickHandler(e) {
		console.log(`x : ${e.x - 7}, y : ${e.y - 7}`);

		let { x, y } = e

		let keypad = [
			['1', '2', '3'],
			['4', '5', '6'],
			['7', '8', '9'],
			['*', '0', '#']
		]

		let pressedKey = null;

		let keypadCol = null;
		if (263 < x && x <= 303) {
			keypadCol = 0;
		} else if (303 < x && x <= 343) {
			keypadCol = 1;
		} else if (343 < x && x <= 383) {
			keypadCol = 2;
		}

		let keypadRow = null;
		if (135 < y && y <= 175) {
			keypadRow = 0;
		} else if (175 < y && y <= 215) {
			keypadRow = 1;
		} else if (215 < y && y <= 255) {
			keypadRow = 2;
		} else if (255 < y && y <= 295) {
			keypadRow = 3;
		}

		if (293 < x && x < 335 && 358 < y && y < 385) {
			if (this.pwdOrder == 4) {
				if (this.inputPwd == this.#password) {
					this.lockerOpen.play();
					this.drawText(1);
					this.onGameClear();
				}
				else {
					this.drawText(0);
				}
				return;
			}
		}

		if (keypadRow != null && keypadCol != null)
			pressedKey = keypad[keypadRow][keypadCol];

		this.ctx.fillStyle = "red"
		this.ctx.font = "bold 30px '맑은 고딕'"
		if (pressedKey != null && this.pwdOrder < 4) {
			this.lockerButton.pause();
			this.lockerButton.load();
			this.lockerButton.play();
			this.ctx.fillText(pressedKey, this.pwdX += 25, this.pwdY);
			this.pwdOrder++;
			this.inputPwd += pressedKey;
		}
	}

	keyDownHandler(e) { // stage가 gameRun일 때의 keyDownHandler
		switch (e.key) {
			case "Escape":
				this.onExitStageEscape();
				break;
			case " ":
				this.ctx.clearRect(0, 0, 640, 800);
				this.ctx.drawImage(this.img, 0, 0);
				this.pwdX = 253;
				this.pwdOrder = 0;
				this.inputPwd = "";
				break;
		}
	}

	drawText(i) {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 600, 640, 200);
		this.ctx.font = "35px '맑은 고딕'";
		this.ctx.fillStyle = "white";
		this.ctx.globalAlpha = 1.0;
		this.ctx.fillText(this.text[i], 50, 700);
	}

}