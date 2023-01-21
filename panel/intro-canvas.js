import Text from '../item/text.js';
import Intro from '../item/intro.js';
import comment from '../static/comment.js';
import Menu from '../item/menu.js';

export default class IntroCanvas {
	constructor() {
		this.dom = document.querySelector(".intro-canvas")
		this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");
		this.text = new Text();
		this.intro = new Intro();
		this.menu = new Menu();
		this.soundPlay = false;

		this.onintroOver = null;
		this.menuSound = document.querySelector("#menu-sound");
		// this.menuSound.play();
		
		//상태변수
		this.stage = "Intro"
		this.pause1 = false;
		this.pause2 = true;

		// this.dom.onload = () => {
		// 	const menuSound = document.querySelector("#menu-sound");
		// 	menuSound.play();
		// }
		this.dom.onkeydown = this.keyDownHandler.bind(this);

		comment.menuNum = 1;
	}
	//메인메뉴
	run() {
		if (this.pause1) {
			return;
		}

		this.intro.draw(this.ctx);
		this.menu.drawLine();
		this.menu.selectMenu();


		window.setTimeout(() => {
			this.run();
		}, 17);
	}


	//IntroScript
	introScriptRun() {
		if (this.pause2) {
			console.log("introScriptRun 종료")
			return;
		}
		console.log("introScriptRun 실행중")

		// this.draw();

		// window.setTimeout(()=>{
		//     this.introScriptRun();
		// }, 17);
	}
	// draw(){
	//     this.text.drawTextBackGronund(0,700); //배경 출력

	//     // this.text.draw(20,750); //텍스트 출력
	// }
	pause() {
		this.pause = true;
	}
	showComment() {
		this.text.drawTextBackGronund(0, 700); //배경 출력
		this.text.draw(20, 750)
	}

	// 퍼즈 전환
	togglePause1() {
		if (!this.pause1) {
			console.log("togglePause1=true");
			this.pause1 = true;
		} else if (this.pause1) {
			console.log("togglePause1=false");
			this.pause1 = false;
		}
	}
	togglePause2() {
		if (!this.pause2) {
			console.log("togglePause2=true");
			this.pause2 = true;
		} else if (this.pause2) {
			console.log("togglePause2=false");
			this.pause2 = false;
		}
	}

	keyDownHandler(e) {
		// console.log("down  "+e.key);
		switch (e.keyCode) {
			case 32: //space bar
				if (this.stage == "Intro") {
					this.stage = "GameRun"
					this.onintroOver();
				}
				break;
			//move key
			case 38: //ArrowUp
				if (this.stage == "Intro" && 1 < comment.menuNum && comment.menuNum < 5) {
					// this.menu.selectMenu(this.menuNum);
					comment.menuNum--;
					console.log(comment.menuNum)
				}
				break;
			case 40: //ArrowDown
				if (this.stage == "Intro" && 0 < comment.menuNum && comment.menuNum < 4) {
					comment.menuNum++;
					// this.menu.selectMenu(this.menuNum);
					console.log(comment.menuNum)
				}
				break;
			case 80: // p
				this.menuSound.load();
				this.menuSound.play();
				break;
		}
	}
};