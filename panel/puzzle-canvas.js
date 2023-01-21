import puzzle from "../item/puzzle/puzzle.js";
import Background from "../item/puzzle/background.js";
import Text from "../item/puzzle/text.js";

export default class PuzzleCanvas {
	constructor() {
		this.dom = document.querySelector(".puzzle-canvas");
		this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");
		this.puzzle = new puzzle();
		this.background = new Background(0, 0);
		this.introTextBox = true;
		this.endTextBox = false;
		this.pause = true;
		this.text = new Text();

		this.onPuzzleGameOver = null;

		this.dom.onclick = this.clickHandler.bind(this);
		this.dom.addEventListener("keydown", this.keyDownHandler.bind(this));

		//추가 필요 사항 - 시작과 끝 텍스트박스?
	}
	run() {
		if (this.pause)
			return;

		this.update();
		this.draw();

		window.setTimeout(function () {
			this.run();
			// console.log("time out");
		}.bind(this), 16)
	}

	draw() {
		this.background.draw(this.ctx);
		this.puzzle.draw(this.ctx);
		this.puzzle.drawScore(this.ctx);

		// ----- 텍스트
		if (this.text.needText) {
			this.text.drawText(this.ctx);
		}
	}

	update() {
		if (!this.puzzle.clearPz) { // 퍼즐 클리어 시 무효
			this.puzzle.update();
		}
	}

	clickHandler(e) {
		if (!this.puzzle.clearPz && !this.text.needText) { // 퍼즐 클리어 시 무효
			console.log("x: " + e.x + "  y: " + e.y);
			this.puzzle.move(e.x, e.y);
		}
	}

	keyDownHandler(e) { // stage가 gameRun일 때의 keyDownHandler
		switch (e.key) {
			case "Escape":
				this.onPuzzleGameOver();
				break;
			case " ":
				this.text.update();
				break;
		}
	}
}
