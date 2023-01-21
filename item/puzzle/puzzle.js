export default class Puzzle {

	constructor(x, y) {

		this.clearPz = false;
		this.x = x || 20;
		this.y = y || 10;
		this.clickScore = 0;

		this.clickSound = document.querySelector("#puzzle-click");
		this.clearSound = document.querySelector("#puzzle-clear");

		// 012
		// 345
		// 67 
		//   8

		// 301
		// 642
		// 75 
		//   8
		
		// 기본 배열
		// this.pzXY = [{ sx: 0, sy: 0, idx: 0 }, { sx: 200, sy: 0, idx: 1 }, { sx: 400, sy: 0, idx: 2 },
		// { sx: 0, sy: 200, idx: 3 }, { sx: 200, sy: 200, idx: 4 }, { sx: 400, sy: 200, idx: 5 },
		// { sx: 0, sy: 400, idx: 6 }, { sx: 200, sy: 400, idx: 7 }];

		//수동 셔플 배열, 직접 해보고 클리어 가능 확인 함
		// this.pzXY = [{ sx: 0, sy: 400, idx: 6 }, { sx: 200, sy: 200, idx: 4 }, { sx: 0, sy: 200, idx: 3 },
		// { sx: 200, sy: 0, idx: 1 }, { sx: 200, sy: 400, idx: 7 }, { sx: 0, sy: 0, idx: 0 },
		// { sx: 400, sy: 200, idx: 5 }, { sx: 400, sy: 0, idx: 2 }
		// ];

		this.pzXY = [{ sx: 0, sy: 200, idx: 3 }, { sx: 0, sy: 0, idx: 0 }, { sx: 200, sy: 0, idx: 1 }, { sx: 0, sy: 400, idx: 6 }, { sx: 200, sy: 200, idx: 4 }, { sx: 400, sy: 0, idx: 2 }, { sx: 200, sy: 400, idx: 7 }, { sx: 400, sy: 200, idx: 5 }];


		// 자동 셔플 후 담기 / 셔플 클리어 조건 확실하지 않아서 일단 셔플 빼고 임의로 고정
		// this.pzXY.sort(() => Math.random() - 0.5);

		this.pzTmp1 = { idx: 9 };
		this.pzTmp2 = { sx: 400, sy: 400, idx: 8 };

		this.pzXY.splice(8, 0, this.pzTmp1);
		this.pzXY.splice(9, 0, this.pzTmp2);


		this.cI = 0;



		// this.fx = 0;

		// -----------------------이미지 그리기 변수
		this.img = document.querySelector("#QRCode");
		this.ix = 0;
		this.iy = 0;
		// ------------------
		this.sw = this.img.width / 3;
		this.sh = this.img.height / 3;
		this.sx = this.sw * this.ix;
		this.sy = this.sh * this.iy;

	}


	draw(ctx) {

		if (this.clearPz) {
			ctx.drawImage(this.img, this.x, this.y);
			return;
		}

		for (let i = 0, pzI = 0; i < 3; i++) {
			this.iy = i;
			this.sy = this.sh * this.iy;
			for (let j = 0; j < 3; j++, pzI++) {
				this.ix = j;
				this.sx = this.sw * this.ix;
				if (!(this.pzXY[pzI].idx == 9)) {
					ctx.drawImage(this.img,
						this.pzXY[pzI].sx, this.pzXY[pzI].sy, this.sw, this.sh,
						this.sx + this.x, this.sy + this.y, this.sw, this.sh);
				}
				if (pzI == 8) {
					pzI++;
					this.sy += this.sh;
					ctx.drawImage(this.img,
						this.pzXY[pzI].sx, this.pzXY[pzI].sy, this.sw, this.sh,
						this.sx + this.x, this.sy + this.y, this.sw, this.sh);
				}

			}

		}

	}
	drawScore(ctx) {

		ctx.font = "50px Arial";
		ctx.fillText(`Click: ${this.clickScore}`, 60, 720);
	}

	update() {
		if (!(this.pzXY[this.cI].idx == 9)) {
			switch (this.cI) {
				case 0:
					if (this.pzXY[1].idx == 9) {
						this.switchArray(0, 1);
					} else if (this.pzXY[3].idx == 9) {
						this.switchArray(0, 3);
					}
					break;
				case 1:
					if (this.pzXY[0].idx == 9) {
						this.switchArray(1, 0);
					} else if (this.pzXY[2].idx == 9) {
						this.switchArray(1, 2);
					} else if (this.pzXY[4].idx == 9) {
						this.switchArray(1, 4);
					}

					break;
				case 2:
					if (this.pzXY[1].idx == 9) {
						this.switchArray(2, 1);
					} else if (this.pzXY[5].idx == 9) {
						this.switchArray(2, 5);
					}

					break;
				case 3:
					if (this.pzXY[0].idx == 9) {
						this.switchArray(3, 0);
					} else if (this.pzXY[4].idx == 9) {
						this.switchArray(3, 4);
					} else if (this.pzXY[6].idx == 9) {
						this.switchArray(3, 6);
					}

					break;
				case 4:
					if (this.pzXY[1].idx == 9) {
						this.switchArray(4, 1);
					} else if (this.pzXY[3].idx == 9) {
						this.switchArray(4, 3);
					} else if (this.pzXY[5].idx == 9) {
						this.switchArray(4, 5);
					} else if (this.pzXY[7].idx == 9) {
						this.switchArray(4, 7);
					}
					break;
				case 5:
					if (this.pzXY[2].idx == 9) {
						this.switchArray(5, 2);
					} else if (this.pzXY[4].idx == 9) {
						this.switchArray(5, 4);
					} else if (this.pzXY[8].idx == 9) {
						this.switchArray(5, 8);
					}

					break;
				case 6:
					if (this.pzXY[3].idx == 9) {
						this.switchArray(6, 3);
					} else if (this.pzXY[7].idx == 9) {
						this.switchArray(6, 7);
					}

					break;
				case 7:
					if (this.pzXY[4].idx == 9) {
						this.switchArray(7, 4);
					} else if (this.pzXY[6].idx == 9) {
						this.switchArray(7, 6);
					} else if (this.pzXY[8].idx == 9) {
						this.switchArray(7, 8);
					}
					break;
				case 8:
					if (this.pzXY[5].idx == 9) {
						this.switchArray(8, 5);
					} else if (this.pzXY[7].idx == 9) {
						this.switchArray(8, 7);
					} else if (this.pzXY[9].idx == 9) {
						this.switchArray(8, 9);
					}
					break;
				case 9:
					if (this.pzXY[8].idx == 9) {
						// splice 연습
						// let tmp = this.pzXY.splice(9,1);
						// this.pzXY.splice(8,0,tmp[0]);
						// console.log(this.pzXY);
						this.switchArray(9, 8);

					}
					break;

				default:
					break;

			}

		}
		// --------------- 완료 검사
		for (let i = 0; i < this.pzXY.length; i++) {
			if (!(this.pzXY[i].idx == i)) {
				this.clearPz = false;
				this.img = document.querySelector("#QRCode");
				break;
			}
			this.clearPz = true;
			this.img = document.querySelector("#QRCodeClear");
		}

		if (this.clearPz) {
			this.clearSound.play();
		}
	};


	move(x, y) {
		if ((x > 1 && x < 200) && (y > 1 && y < 200)) {
			this.cI = 0;
		}
		if ((x > 200 && x < 400) && (y > 1 && y < 200)) {
			this.cI = 1;
		}
		if ((x > 400 && x < 600) && (y > 1 && y < 200)) {
			this.cI = 2;
		}
		if ((x > 1 && x < 200) && (y > 200 && y < 400)) {
			this.cI = 3;
		}
		if ((x > 200 && x < 400) && (y > 200 && y < 400)) {
			this.cI = 4;
		}
		if ((x > 400 && x < 600) && (y > 200 && y < 400)) {
			this.cI = 5;
		}
		if ((x > 1 && x < 200) && (y > 400 && y < 600)) {
			this.cI = 6;
		}
		if ((x > 200 && x < 400) && (y > 400 && y < 600)) {
			this.cI = 7;
		}
		if ((x > 400 && x < 600) && (y > 400 && y < 600)) {
			this.cI = 8;
		}
		if ((x > 400 && x < 600) && (y > 600 && y < 800)) {
			this.cI = 9;
		}
		console.log(this.cI);

	}
	switchArray(cIdx, pIdx) {
		let tmp;
		tmp = this.pzXY[cIdx];
		this.pzXY[cIdx] = this.pzXY[pIdx];
		this.pzXY[pIdx] = tmp;
		this.clickScore++;
		this.clickSound.pause();
		this.clickSound.load();
		this.clickSound.play();
	}

};