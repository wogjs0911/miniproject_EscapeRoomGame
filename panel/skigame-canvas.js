// 스키게임
import Person from '../item/skigame/person.js'
import Snowbg from '../item/skigame/snowbg.js'
import Obj from '../item/skigame/obj.js'
import Obj2 from '../item/skigame/obj2.js'
import Score from '../item/skigame/score.js'

// 인트로
import Text from '../item/skigame/text.js';
import Intro from '../item/skigame/intro.js';
import Menu from '../item/skigame/menu.js';

// 전역변수
import skiobj from '../item/skigame/skiobj.js'
import comment from '../item/skigame/comment.js';

export default class skigameCanvas {
	constructor() {
		this.dom = document.querySelector(".skigame-canvas");
		this.dom.focus();
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.dom.getContext("2d");
		// 객체들
		this.person = new Person();
		this.snowbg = new Snowbg();
		this.obj = new Obj();
		this.obj2 = new Obj2();
		this.score = new Score();
		// 인트로 객체
		this.text = new Text();
		this.intro = new Intro();
		this.menu = new Menu();

		// 게임상태
		this.stage = "Intro"
		this.pause1 = true;
		this.pause2 = true;

		this.onSkiGameOver = null;

		// onkey
		this.dom.onkeydown = this.keyDownHandler.bind(this);
		this.dom.onkeyup = this.keyUpHandler.bind(this);

		// 충돌하고나면 없어지도록
		this.person.ondeleteObj = this.objDeleteHandler.bind(this);

		// obj(장애물) 생성용
		this.objects = [];
		this.objAppearDelay = 60 * 1;
		skiobj.objects = this.objects;

		// obj2
		this.objects2 = [];
		this.obj2AppearDelay = 60 * 1;
		skiobj.objects2 = this.objects2;

		// 전역객체  
		skiobj.point = 0;
		comment.menuNum = 1;

		// 메뉴 띄우기
		this.viewMenu2 = false;
		this.viewMenu3 = false;
		this.viewMenu4 = false;

		this.myAudio = document.getElementById("bgm") // Audio객체 취득
		this.myAudio.volume = 0.2;
		this.myAudio3 = document.getElementById("bgm3") // Audio객체 취득
		this.myAudio3.volume = 1;

	}
	//메인메뉴
	introRun() {
		if (this.pause1) {
			console.log("introRun 종료")
			return;
		}

		console.log("introRun 실행중")

		this.intro.draw(this.ctx);
		this.menu.drawLine();
		this.menu.fillText();
		this.menu.selectMenu();
		this.draw2();

		window.setTimeout(() => {
			this.introRun();
		}, 17);
	}
	run() {
		// 목표점수 도달 시 퍼즈
		if (skiobj.point >= 10) {
			this.pause2 = true;
			this.stage = "Clear"
			this.myAudio.pause();
		}

		if (this.pause2) {
			console.log("Run 종료")
			return;
		}
		console.log("Run 실행중")
		this.update();
		this.draw();

		window.setTimeout(() => {
			this.run();
		}, 17);
	}
	update() {
		this.person.update(); // 캐릭터
		this.obj2.update(); // 나무

		for (let obj of this.objects) // 장애물
			obj.update();

		this.objAppearDelay--; // 장애물 생성 딜레이

		// 랜덤 정수 얻기
		function getRandomInt(min, max) {
			min = Math.ceil(min);  // 올림 ceil
			max = Math.floor(max); // 버림 floor / 반올림 = round
			return Math.floor(Math.random() * (max - min)) + min;
		}
		// 장애물 x좌표, 생성딜레이에 랜덤값 넣어서 전역객체에 인풋.
		if (this.objAppearDelay == 0) {
			let x = getRandomInt(101, 449);
			let y = 700;
			let obj = new Obj(x, y);
			this.objects.push(obj);
			this.objAppearDelay = getRandomInt(60, 110);
			console.log("오브젝트 개수 : " + this.objects.length);
		}
	}

	draw() {
		this.snowbg.draw(this.ctx); // 배경
		this.obj.drawPoint(this.ctx); // 점수
		this.person.draw(this.ctx); // 캐릭터
		// 장애물
		for (let obj of this.objects) {
			
			obj.draw(this.ctx); // why no this??????? why
		}
	}
	draw2() {
		if (this.viewMenu2)
			this.menu.viewMenu2(this.ctx);
		if (this.viewMenu3)
			this.menu.viewMenu3(this.ctx);
		if (this.viewMenu4)
			this.menu.viewMenu4(this.ctx);
	}
	// 퍼즈 전환

	toggle2() {
		if (!this.viewMenu2) {
			this.viewMenu2 = true;
		} else if (this.viewMenu2) {
			this.viewMenu2 = false;
		}
	}
	toggle3() {
		if (!this.viewMenu3) {
			this.viewMenu3 = true;
		} else if (this.viewMenu3) {
			this.viewMenu3 = false;
		}
	}
	toggle4() {
		if (!this.viewMenu4) {
			this.viewMenu4 = true;
		} else if (this.viewMenu4) {
			this.viewMenu4 = false;
		}
	}

	objDeleteHandler() {
		console.log("objDeleteHandler On");
	}
	keyDownHandler(e) {

		switch (e.key) {
			case "ArrowLeft":
				this.person.move(1);
				break;
			case "ArrowRight":
				this.person.move(2);
				break;
			case "ArrowUp":
				if (this.stage == "Intro" && 1 < comment.menuNum && comment.menuNum < 5) {

					if(!(this.viewMenu2 || this.viewMenu3 || this.viewMenu4)){		// 메뉴에서 방향키 누르면 방향키가 적용되어서 수정
						comment.menuNum--;
						console.log(comment.menuNum)
						this.myAudio3.play();
						this.myAudio.play();
					}

				}
				if (this.stage == "run")
					this.person.move(3);
				break;
			case "ArrowDown":
				if (this.stage == "Intro" && 0 < comment.menuNum && comment.menuNum < 4) {
					if(!(this.viewMenu2 || this.viewMenu3 || this.viewMenu4)){		// 메뉴에서 방향키 누르면 방향키가 적용되어서 수정
						comment.menuNum++;	
						console.log(comment.menuNum)
						this.myAudio3.play();
						this.myAudio.play();
					}
				}
				if (this.stage == "run")
					this.person.move(4);
				break;
			case " ":
				if (this.stage == "Intro" && comment.menuNum == 1) {
					this.myAudio.play();
					this.pause1 = true;
					this.pause2 = false;
					this.run();
					this.stage = "run"
				}
				if (this.stage == "Intro" && comment.menuNum == 2) {
					this.toggle2();
				}
				if (this.stage == "Intro" && comment.menuNum == 3) {
					this.toggle3();
				}
				if (this.stage == "Intro" && comment.menuNum == 4) {
					this.toggle4();
				}
				if (this.pause2 == true && this.stage == "Clear") { // 클리어
					this.person.x = 320;
					this.person.y = 200;
					skiobj.point = 0;
					comment.menuNum == 1;
					this.onSkiGameOver();
				}

				if (this.stage == "run")
					this.person.move(5);
				break;
			case "Escape":
				this.person.x = 320;
				this.person.y = 200;
				skiobj.point = 0;
				comment.menuNum == 1;
				this.onSkiGameOver();
				this.pause1 = true;
				this.pause2 = true;
				break;
		}
	}

	keyUpHandler(e) {
		switch (e.key) {
			case "ArrowLeft":
				this.person.stop(1);
				break;
			case "ArrowRight":
				this.person.stop(2);
				break;
			case "ArrowUp":
				this.person.stop(3);
				break;
			case "ArrowDown":
				this.person.stop(4);
				break;
			case " ":
				this.person.stop(5);
				break;
		}
	}
}