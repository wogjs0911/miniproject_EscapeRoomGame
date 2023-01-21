class Context {
	constructor() {
		// this.#comments = null;

		this.x = 10;
		this.y = 540;
		this.width = 620;
		this.height = 250;
		
		
		// blood 이펙트 좌표
		this.sw = 326;
		this.sh = 400;
		this.dropblood = 0;
		this.pauseblood = true;
		
		this.img = document.querySelector("#dlg");
		this.blood = document.querySelector("#blood");
		

		this.outComments1 = ["문이 열렸다.", "...", "......", ".........", "(사람들이 대화하는 소리들린다)", "    \'안녕하세요 뉴렉입니다.\'"];
		this.outComments2 = ["    \'안녕하세요 뉴렉입니다.\'", "휴...", "꿈이었구나....", "오늘은 수업 열심히 들어야지...."];
		this.outComments3 = ["...", "......", ".........", "\'후후.. 과연 이 모든게 꿈이었을까..?\'"];
		this.introScript = ['......'
		,'여기가 어디지..?'
		,'분명 수업중이었는데...'
		,'내가 잠깐 졸았나 보다.'
		,'그런데 다들 어디갔지...?'
		,'일단 불부터 켜야겠다.'
		, '(딸깍)'];
		this.teacherSay = ["기괴한 인형이 자리에 앉아있다."
		, "너무 리얼해서 무서운데...?", "갑자기 인형에서 소리가 들려왔다."]
		// this.teacherSay = ["너는 평소에 수업시간을 소중히 여기지 않았지...", ""]

		this.qrScript = ["아, 맞다 퇴실...!", "그런데 QR 모양이 왜 이러지??"];
		this.screenScript = ["화면에 무언가 쓰여있다.", "이건 뭐야?"];
		this.skiScript = ["컴퓨터가 켜져있다", "이게 뭐지?", "게임인가?"];
		this.packmanScript = ["컴퓨터가 켜져있다", "이게 뭐지?", "게임인가?"];
		this.lockerScript = ["케비넷이 있다.", "열어보자.", "(철컥)", "열어보니 문제가 적힌 종이가 놓여있다."];
		this.exitScript = ["문이 잠겨있다."];
		this.outroScript = ["문이 열렸다."];
		
		this.count = 0;
	}

	drawScript(ctx, script) {
		let { x, y, width, height } = this;

		//흰색 배경에 검정 테두리  
		ctx.fillStyle = '#FFF';
		ctx.fillRect(x, y, width, height);

		ctx.fillStyle = '#000';
		ctx.strokeRect(x, y, width, height);

		ctx.fillStyle = "black"
		ctx.font = "30px '맑은 고딕'"
		ctx.fillText(script[this.count], 50, 620);
	}

	drawScriptRed(ctx, script) {
		let { x, y, width, height } = this;


		//흰색 배경에 검정 테두리  
		ctx.fillStyle = '#FFF';
		ctx.fillRect(x, y, width, height);

		ctx.fillStyle = '#000';
		ctx.strokeRect(x, y, width, height);

		ctx.fillStyle = "red"
		ctx.font = "bold 34px '맑은 고딕'"
		ctx.fillText(script[this.count], 50, 620);
	}

	    drawDlg(ctx, script) {
		let { x, y, width, height } = this;
		
		ctx.drawImage(this.img, 0, 0);
	}
	updateBloodFx(){                      
		
        this.dropblood++;
    }

	drawBloodFx(ctx){

        ctx.drawImage(this.blood, 0, 0, this.sw, this.sh,
            0, -450, 640, 800+this.dropblood*5);
        
    }
}

export default new Context();