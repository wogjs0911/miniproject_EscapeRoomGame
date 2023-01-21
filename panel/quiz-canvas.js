import Background from '../item/Quiz/background.js'
import TF from '../item/Quiz/tf.js';

export default class QuizCanvas {

	constructor() {
		this.dom = document.querySelector(".quiz-canvas");

		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");

		this.onGameEnd = null;
		this.bg = new Background();
		this.tf = new TF();

		this.pause = true;
		this.onQuizGameOver = null;

		this.tf.onclick = this.tfClickHandler.bind(this);
		this.dom.onclick = this.clickHandler.bind(this);
		this.dom.addEventListener("keydown", this.keyDownHandler.bind(this));
	}

	run() {
		if (this.pause)
			return;

		this.draw();

		window.setTimeout(() => {
			this.run();
		}, 16)
	}

	draw() {
		this.bg.draw(this.ctx);
		this.tf.draw(this.ctx);
	}

	clickHandler(e) {
		this.tf.notifyClick(e.x, e.y);
	}

	tfClickHandler(id) {
		switch (id) {
			case 1:
				this.onQuizGameOver();
		}
	}

	keyDownHandler(e) { 
		switch (e.key) {
			case "Escape":
				this.onQuizGameOver();
				break;
		}
	}

}