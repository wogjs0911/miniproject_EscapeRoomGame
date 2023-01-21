import Suneung from "../item/suneungGame/suneung.js";
import Box from "../item/suneungGame/box.js";
import Answer from "../item/suneungGame/answer.js";

export default class SuneungGamecanvas {
	constructor() {
		this.dom = document.querySelector(".suneungGame-canvas");
		this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");

		this.suneung = new Suneung();
		this.box = new Box();
		this.ans = new Answer();

		this.dom.onkeydown = this.KeyDownHandler.bind(this);
		this.dom.onkeyup = this.KeyUpHandler.bind(this);

		// 정답 맞히기
		this.toggle = true;
		this.answer = false;

		this.pause = true;

		this.onSuneungGameOver = null;
	}

	run() {
		if (this.pause)
			return;
		this.update();
		this.draw();

		// console.log("SNrun");

		window.setTimeout(() => {
			this.run();
		}, 16)
	}

	update() {
		this.box.update();
	}

	draw() {
		if (this.toggle) {
			this.suneung.draw(this.ctx);
			this.box.draw(this.ctx);
		}
		else if (this.toggle == false && this.answer == false) {
			this.suneung.draw(this.ctx);
			this.box.draw(this.ctx);
			this.ans.draw(this.ctx);
		}
		else if (this.toggle == false && this.answer == true) {
			this.suneung.draw(this.ctx);
			this.box.draw(this.ctx);
			this.ans.draw2(this.ctx);
			this.pause = false;
		}
	}

	reset() {
		this.pause = true;
		this.toggle = true;
		this.answer = false;
		this.box.correct = false;
		this.box.ix = 140;
		this.box.iy = 555;
		this.box.answercnt = 1;
	}

	KeyDownHandler(e) {
		switch (e.key) {
			case "ArrowUp":
				this.box.move(1);
				break;
			case "ArrowDown":
				this.box.move(2);
				break;
			case " ":
				this.answer = this.box.isCorrect();
				this.toggle = false;
				console.log(this.toggle);
				break;
			case "Escape":
				this.toggle = true;
				// if(this.toggle == true)
				this.onSuneungGameOver();
				break;

		}

	}

	KeyUpHandler(e) {
		switch (e.key) {
			case "ArrowUp":
				this.box.stop(1);
				break;
			case "ArrowDown":
				this.box.stop(2);
				break;
		}

	}

}