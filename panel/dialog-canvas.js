export default class DialogCanvas {

	constructor() {
		this.dom = document.querySelector(".dialog-canvas");
		// this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");

		this.dom.onkeydown = this.KeyDownHandler.bind(this);
		// this.dom.onkeyup = this.KeyUpHandler.bind(this);
		this.img = document.querySelector("#dlg");
		this.gameStartSound = document.querySelector("#game-start");

		this.script = ["너는 평소 수업시간을 소중히 여기지 않았지",
			"비밀번호를 알아내지 못하면...",  "영원히 집에 갈 수 없을 거야...",
			"자 그럼, 게임을 시작하지."]

		this.count = 0;

		// 정답 맞히기
		this.pause = true;
		this.onDialogOver = null;
	}

	run() {
		if (this.pause)
			return;
		this.update();
		this.draw();

		window.setTimeout(() => {
			this.run();
		}, 16)
	}

	update() {
	}

	draw() {
		this.ctx.drawImage(this.img, 0, 0);
		this.drawScript(this.ctx, this.script)
	}

	drawScript(ctx, script) {
		let { x, y, width, height } = this;

		//흰색 배경에 검정 테두리  
		ctx.fillStyle = '#FFF';
		ctx.fillRect(x, y, width, height);

		ctx.fillStyle = '#000';
		ctx.strokeRect(x, y, width, height);

		ctx.fillStyle = "black"
		ctx.font = "25px '맑은 고딕'"
		ctx.fillText(script[this.count], 30, 620);
	}

	KeyDownHandler(e) {
		switch (e.key) {
			case " ":
				this.count++;
				console.log(this.count);
				if (this.count == this.script.length - 1){
					this.gameStartSound.play();
				}
				if (this.count == this.script.length)
					this.onDialogOver();
				break;
			case "Escape":
				this.onDialogOver();
				break;
		}
	}
}