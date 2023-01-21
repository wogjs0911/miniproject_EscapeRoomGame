import IntroCanvas from './panel/intro-canvas.js'
import GameCanvas from './panel/game-canvas.js'
import ExitCanvas from './panel/exit-canvas.js'
import SkiGameCanvas from './panel/skigame-canvas.js'
import PuzzleCanvas from './panel/puzzle-canvas.js'
import SuneungGamecanvas from './panel/suneunggame-canvas.js'
import QuizCanvas from './panel/quiz-canvas.js'
import DialogCanvas from './panel/dialog-canvas.js'
import PackmanCanvas from './panel/pacman-canvas.js'
import OutroCanvas from './panel/outro-canvas.js'
import comment from './static/comment.js';

window.addEventListener("load", function () {
	
	const introCanvas = new IntroCanvas();
	introCanvas.run();
	
	const gameCanvas = new GameCanvas();
	const skigameCanvas = new SkiGameCanvas();
	const puzzleCanvas = new PuzzleCanvas();
	const suneungGamecanvas = new SuneungGamecanvas();
	const exitCanvas = new ExitCanvas();
	const quizCanvas = new QuizCanvas();
	const dialogCanvas = new DialogCanvas();
	const packmanCanvas = new PackmanCanvas();
	const outroCanvas = new OutroCanvas();

	introCanvas.onintroOver = (e) => {
		introCanvas.menuSound.pause();
		introCanvas.pause1 = true;
		introCanvas.dom.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.introPause = false;
		gameCanvas.dom.focus();
		gameCanvas.introRun();
		gameCanvas.initItems();
	}

	/*---------- Dialog ----------*/
	gameCanvas.onDialog = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		dialogCanvas.dom.classList.remove("d-none");
		dialogCanvas.pause = false;
		dialogCanvas.dom.focus();
		dialogCanvas.run();
	}
	
	dialogCanvas.onDialogOver = (e) => {
		dialogCanvas.pause = true;
		dialogCanvas.dom.classList.add("d-none");
		dialogCanvas.count = 0;
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		gameCanvas.dom.focus();
		gameCanvas.run();
	}
	/*---------- Dialog ----------*/

	/*---------- ski game ----------*/
	gameCanvas.onSkiGame = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		skigameCanvas.dom.classList.remove("d-none");
		skigameCanvas.pause1 = false;
		skigameCanvas.stage = "Intro";
		skigameCanvas.dom.focus();
		skigameCanvas.introRun();
		// skigameCanvas.run();
	}
	skigameCanvas.onSkiGameOver = (e) => {
		skigameCanvas.pause2 = true;
		skigameCanvas.myAudio.pause();
		skigameCanvas.dom.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		comment.menuNum == 1;
		gameCanvas.dom.focus();
		gameCanvas.run();
	}
	/*---------- ski game ----------*/


	/*---------- puzzle game ----------*/
	gameCanvas.onPuzzleGame = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		puzzleCanvas.dom.classList.remove("d-none");
		puzzleCanvas.pause = false;
		puzzleCanvas.dom.focus();
		puzzleCanvas.run();
	}
	puzzleCanvas.onPuzzleGameOver = (e) => {
		puzzleCanvas.pause = true;
		puzzleCanvas.dom.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		gameCanvas.dom.focus();
		gameCanvas.run();
	}
	/*---------- puzzle game ----------*/


	/*---------- suneung game ----------*/
	gameCanvas.onSuneungGame = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		suneungGamecanvas.dom.classList.remove("d-none");
		suneungGamecanvas.pause = false;
		suneungGamecanvas.dom.focus();
		suneungGamecanvas.run();
	}
	suneungGamecanvas.onSuneungGameOver = (e) => {
		suneungGamecanvas.reset();
		suneungGamecanvas.dom.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		gameCanvas.dom.focus();
		gameCanvas.run();
	}
	/*---------- suneung game ----------*/

	
	/*---------- Quiz game ----------*/
	gameCanvas.onQuizGame = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		quizCanvas.dom.classList.remove("d-none");
		quizCanvas.pause = false;
		quizCanvas.dom.focus();
		quizCanvas.run();
	}
	
	quizCanvas.onQuizGameOver = (e) => {
		quizCanvas.pause = true;
		quizCanvas.dom.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		gameCanvas.dom.focus();
		gameCanvas.run();
	}
	
	/*---------- Quiz game ----------*/
	
	
	/*---------- Packman game ----------*/
		gameCanvas.onPackmanGame = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		packmanCanvas.canvas.classList.remove("d-none");
		packmanCanvas.pause2 = false;
		packmanCanvas.canvas.focus();
		packmanCanvas.run();
	}
	
	packmanCanvas.onPackmanGameOver = (e) => {
		packmanCanvas.reset();
		packmanCanvas.canvas.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		gameCanvas.dom.focus();
		gameCanvas.run();
	}
	/*---------- Packman game ----------*/


	/*---------- exit stage ----------*/
	gameCanvas.onExitStage = (e) => {
		gameCanvas.pause = true;
		gameCanvas.dom.classList.add("d-none");
		exitCanvas.dom.classList.remove("d-none");
		exitCanvas.dom.focus();
		exitCanvas.draw();
	}

	exitCanvas.onExitStageEscape = (e) => {
		exitCanvas.dom.classList.add("d-none");
		gameCanvas.dom.classList.remove("d-none");
		gameCanvas.pause = false;
		gameCanvas.stage = "gameRun";
		gameCanvas.dom.focus();
		gameCanvas.run();
	}

	exitCanvas.onGameClear = (e) => {
		exitCanvas.dom.classList.add("d-none");
		outroCanvas.dom.classList.remove("d-none");
		outroCanvas.dom.focus();
		outroCanvas.run();
	}

	/*---------- exit stage ----------*/
});