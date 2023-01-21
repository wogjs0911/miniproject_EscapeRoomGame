import Boy from '../item/boy.js'
import Background from '../item/background.js'
import Interaction from '../item/interaction.js'
import Comments from '../intro/comments.js';
import Intro from '../intro/intro.js';
import comment from '../static/comment.js';

export default class GameCanvas {
	constructor() {
		this.dom = document.querySelector(".game-canvas");
		this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");
		this.boy = new Boy(585, 710);
		this.bg = new Background();
		this.interactions = []
		// 게임 상태변수
		this.gameover = false;

		this.onNext = null;
		this.onExitStage = null;
		this.onSkiGame = null;
		this.onPuzzleGame = null;
		this.onSuneungGame = null;
		this.onQuizGame = null;
		this.onDialog = null;
		this.onPackmanGame = null;

		this.stage = "Intro"; // 상태 변수(스페이스바에 따른 상황을 구분짓기 위함)
		this.curComment = null;
		this.dlgBg = false;

		this.introPause = false;
		this.introPause2 = true;

		this.pause = true;
		this.pause2 = true;

		this.exitPause = true;

		// ------------- intro --------------------
		this.intro = new Intro();

		// ------------- comments --------------------

		this.openingScripts = comment.introScript;
		this.openingScriptObj = new Comments(100, 630,
			this.openingScripts);


		//----- game2 -----
		this.textX = 640 / 2;
		this.textY = 800 / 2;
		//-----------------

		this.interActionKeyPressed = false;

		this.dom.onclick = this.clickHandler.bind(this);
		this.dom.addEventListener("keydown", this.dlgKeyDownHandler.bind(this));
		this.dom.addEventListener("keydown", this.introKeydownHandler.bind(this));
		this.dom.addEventListener("keydown", this.keyDownHandler.bind(this));
		this.dom.addEventListener("keyup", this.keyUpHandler.bind(this));
	}

	initItems() { // Interaction으로 이동하거나 전역객체로 분리???
		//dir => up : 0, right : 1, down : 2, left : 3
		//dir => down : 0, left : 1, right : 2, up : 3
		this.interactions = [
			new Interaction(460, 120, "Notice", 50, 70, 2),
			new Interaction(80, 50, "PuzzleGame", 50, 100, 3),
			new Interaction(260, 110, "Quiz", 110, 50, 3),
			new Interaction(490, 243, "SkiGame", 50, 90, 3),
			new Interaction(250, 410, "PackmanGame", 50, 90, 3),
			new Interaction(100, 690, "SuneungGame", 100, 100, 1),
			new Interaction(450, 740, "exitStage", 150, 50, 0),
		]
	}

	introRun() {
		if (this.introPause == true) {
			return;
		}
		this.introDraw();

		window.setTimeout(() => {
			this.introRun();
		}, 17);
	}

	// 인트로 화면 출력
	introDraw() {
		this.intro.drawOpening(this.ctx);
	}

	// 대사 출력
	showComments() {
		if (this.introPause2) {
			return;
		}
		this.intro.clear(this.ctx);
		this.ctx.fillStyle = "black"
		this.ctx.fillRect(0, 0, 640, 800);
		this.openingScriptObj.drawTextBox(this.ctx);
		this.openingScriptObj.writeText(this.ctx);
	}

	////----------Main-------------///
	run() {
		if (this.pause)
			return;
		// 60프레임으로 다시 그리는 코드
		this.update();
		this.draw();

		window.setTimeout(function () {
			this.run();
		}.bind(this), 16)
	}

	exitStageRun() {
		if (this.exitPause)
			return;

		// 60프레임으로 다시 그리는 코드
		window.setTimeout(this.miniGameRun.bind(this), 16);
	}

	update() {
		this.boy.update()
		for (let interaction of this.interactions)
			interaction.update();
	}
	draw() {
		this.bg.draw(this.ctx);
		this.boy.draw(this.ctx);
		this.bg.drawMoniter(this.ctx);

		if (this.stage == "dlg") {
			if (this.dlgBg)
				comment.drawDlg(this.ctx, this.curComment);
			comment.drawScript(this.ctx, this.curComment);
		}
	}

	// ----- event handlers -----
	clickHandler(e) {
		console.log(`x : ${e.x - 8}, y : ${e.y - 8}`);
		if (!this.pause2) {
			if (0 <= e.x && e.x <= this.dom.width / 2 && 0 <= e.y && e.y < this.dom.height) {
				alert("정답")
				this.pause = false;
				this.pause2 = true;
				this.run();
			}
			else if (this.dom.width / 2 < e.x && e.x <= this.dom.width && 0 <= e.y && e.y < this.dom.height) {
				alert("오답")
			}
		}
	}

	introKeydownHandler(e) { // stage가 Intro, IntroScript일 때의 keyDownHandler
		if (!(this.stage == "Intro" || this.stage == "IntroScript"))
			return;
		switch (e.key) {
			case " ":
				if (this.stage == "Intro") {
					this.introPause = true;
					this.introPause2 = false;
					this.stage = "IntroScript";
				}
				if (this.stage == "IntroScript") {
					this.showComments();
					if (this.openingScriptObj.count == this.openingScripts.length) {
						this.ctx.clearRect(0, 0, 680, 800);
						this.stage = "gameRun";
						this.introPause2 = true;
						this.pause = false;
						this.run();
						this.dom.removeEventListener("keydown", this.introKeydownHandler, false);
					}
					this.openingScriptObj.count++;
				}
				break;
		}
	}

	dlgKeyDownHandler(e) { // stage가 dlg일 때의 keyDownHandler
		
		if (!(this.stage == "dlg"))
			return;
		switch (e.key) {
			case " ":
				comment.count++;
				console.log(comment.count, this.curComment.length);
				if (comment.count == this.curComment.length) {
					this.stage = "gameRun";
					comment.count = 0;
					if (this.onNext) {
						this.onNext();
					}
				}
				break;
			case "Escape":
				comment.count = 0;
				console.log(this.stage);
				this.stage = "gameRun";
				break;
		}
	}

	keyDownHandler(e) { // stage가 gameRun일 때의 keyDownHandler
		console.log("main handler - stage : ", this.stage);
		if (!(this.stage == "gameRun"))
			return;
		switch (e.key) {
			case "ArrowUp":
				this.boy.move(1);
				break;
			case "ArrowRight":
				this.boy.move(2);
				break;
			case "ArrowDown":
				this.boy.move(3);
				break;
			case "ArrowLeft":
				this.boy.move(4);
				break;
			case " ":
				this.boy.moveUp = false;
				this.boy.moveRight = false;
				this.boy.moveDown = false;
				this.boy.moveLeft = false;
				this.collisionDetection()
				break;
			case "Escape":
				if (this.pause == true) {
					this.pause = false;
					this.pause2 = true;
					this.exitPause = true;
					this.run();
				}
				break;
		}
	}

	keyUpHandler(e) {	// stage가 gameRun일 때의 keyUpHandler
		if (!(this.stage == "gameRun"))
			return;
		switch (e.key) {
			case "ArrowUp":
				this.boy.stop(1);
				break;
			case "ArrowRight":
				this.boy.stop(2);
				break;
			case "ArrowDown":
				this.boy.stop(3);
				break;
			case "ArrowLeft":
				this.boy.stop(4);
				break;
			
		}
	}

	collisionDetection() {
		for (let interaction of this.interactions) {
			if (this.boy.x > interaction.x && this.boy.x < interaction.x + interaction.width
				&& this.boy.y > interaction.y && this.boy.y < interaction.y + interaction.height
				&& interaction.state == true && this.boy.iy == interaction.dir) {
				this.interactionControll(interaction)
				console.log(interaction.interactionName);
			}
		}
	}

	interactionControll(interaction) {

		// 룰고지 이벤트 추가
		// ---

		if (interaction.interactionName == "Notice") {
			this.stage = "dlg";
			this.curComment = comment.teacherSay;
			this.onNext = this.onDialog;
		}
		else if (interaction.interactionName == "Quiz") {
			this.stage = "dlg";
			this.curComment = comment.screenScript;
			this.onNext = this.onQuizGame;
		}
		else if (interaction.interactionName == "PuzzleGame") {
			this.stage = "dlg";
			this.curComment = comment.qrScript;
			this.onNext = this.onPuzzleGame;
		}
		else if (interaction.interactionName == "SkiGame") {
			this.stage = "dlg";
			this.curComment = comment.skiScript;
			this.onNext = this.onSkiGame;
		}
		else if (interaction.interactionName == "PackmanGame") {
			this.stage = "dlg";
			this.curComment = comment.packmanScript;
			this.onNext = this.onPackmanGame;
		}
		else if (interaction.interactionName == "SuneungGame") {
			this.stage = "dlg";
			this.curComment = comment.lockerScript;
			this.onNext = this.onSuneungGame;
		}
		else if (interaction.interactionName == "exitStage") {
			this.stage = "dlg";
			this.curComment = comment.exitScript;
			this.onNext = this.onExitStage;
		}
	}
}
