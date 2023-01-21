import comment from './comment.js';

export default class Menu {
    constructor() {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = document.querySelector(".skigame-canvas").getContext('2d');

        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = 3

        this.x = 148;
        this.y = 365;
        this.space = 12.5;
        this.width = 347;
        this.height = 78;

        // this.menuNum = 1;

        this.img = document.querySelector("#ski_menu2");
        this.img2 = document.querySelector("#ski_menu3");
        this.img3 = document.querySelector("#ski_menu4");

    }

    drawLine() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        // #1
        this.ctx.strokeRect(this.x, this.y,
            this.width, this.height)
        this.ctx.fillRect(this.x, this.y,
            this.width, this.height)
        // #2
        this.ctx.strokeRect(this.x, this.y + this.height + this.space,
            this.width, this.height)
        this.ctx.fillRect(this.x, this.y + this.height + this.space,
            this.width, this.height)
        // #3
        this.ctx.strokeRect(this.x, this.y + this.height * 2 + this.space * 2,
            this.width, this.height)
        this.ctx.fillRect(this.x, this.y + this.height * 2 + this.space * 2,
            this.width, this.height)
        // #4
        this.ctx.strokeRect(this.x, this.y + this.height * 3 + this.space * 3,
            this.width, this.height)
        this.ctx.fillRect(this.x, this.y + this.height * 3 + this.space * 3,
            this.width, this.height)
    }
    fillText(){
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        // #1
        this.ctx.font = "48px 굴림"
        this.ctx.fillText("Game Start",this.x+70, this.y+57)
        // #2
        this.ctx.font = "48px 굴림"
        this.ctx.fillText("How to play",this.x+70, this.y+57+90)
        // #3
        this.ctx.font = "48px 굴림"
        this.ctx.fillText("Setting",this.x+70, this.y+57+90+90)
        // #4
        this.ctx.font = "48px 굴림"
        this.ctx.fillText("Hint",this.x+70, this.y+57+90+90+90)
    }
    viewMenu2(ctx){
        ctx.drawImage(this.img,0,0,640,800);
    }
    viewMenu3(ctx){
        ctx.drawImage(this.img2,0,0,640,800);
    }
    viewMenu4(ctx){
        ctx.drawImage(this.img3,0,0,640,800);
    }

    selectMenu() {
        let curMenu = comment.menuNum - 1
        this.ctx.lineWidth = 3
        switch (comment.menuNum) {
            case 1:
                this.ctx.strokeRect(this.x, this.y,
                    this.width, this.height)
                this.ctx.fillStyle = 'rgba(0, 0, 255, 1)'
                this.ctx.font = "48px 굴림"
                this.ctx.fillText("Game Start",this.x+70, this.y+57)
                break;
            case 2:
                this.ctx.strokeRect(this.x, this.y + this.height + this.space,
                    this.width, this.height)
                this.ctx.fillStyle = 'rgba(0, 0, 255, 1)'
                this.ctx.font = "48px 굴림"
                this.ctx.fillText("How to play",this.x+70, this.y+57+90)
                break;
            case 3:
                this.ctx.strokeRect(this.x, this.y + this.height * 2 + this.space * 2,
                    this.width, this.height)
                this.ctx.fillStyle = 'rgba(0, 0, 255, 1)'
                this.ctx.font = "48px 굴림"
                this.ctx.fillText("Setting",this.x+70, this.y+57+90+90)
                break;
            case 4:
                this.ctx.strokeRect(this.x, this.y + this.height * 3 + this.space * 3,
                    this.width, this.height)
                this.ctx.fillStyle = 'rgba(0, 0, 255, 1)'
                this.ctx.font = "48px 굴림"
                this.ctx.fillText("Hint",this.x+70, this.y+57+90+90+90)
                break;
            }
            this.ctx.strokeStyle = "rgba(0, 0, 255, 0.8)";

        this.ctx.strokeRect(this.x, this.y + this.height * curMenu + this.space * curMenu,
            this.width, this.height)
        this.ctx.strokeStyle = "grey";


    }

}