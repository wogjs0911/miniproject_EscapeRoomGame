import comment from '../static/comment.js';

export default class Menu {
    constructor() {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = document.querySelector(".intro-canvas").getContext('2d');

        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = 3

        this.x = 148;
        this.y = 365;
        this.space = 12.5;
        this.width = 347;
        this.height = 78;

        // this.menuNum = 1;


    }

    drawLine() {

        // #1
        this.ctx.strokeRect(this.x, this.y,
            this.width, this.height)
        // #2
        this.ctx.strokeRect(this.x, this.y + this.height + this.space,
            this.width, this.height)
        // #3
        this.ctx.strokeRect(this.x, this.y + this.height * 2 + this.space * 2,
            this.width, this.height)
        // #4
        this.ctx.strokeRect(this.x, this.y + this.height * 3 + this.space * 3,
            this.width, this.height)
    }

    selectMenu() {
        let curMenu = comment.menuNum - 1
        this.ctx.lineWidth = 3
        switch (comment.menuNum) {
            case 1:
                // console.log("here"+comment.menuNum)
                this.ctx.strokeRect(this.x, this.y,
                    this.width, this.height)

                break;
            case 2:
                this.ctx.strokeRect(this.x, this.y + this.height + this.space,
                    this.width, this.height)
                break;
            case 3:
                this.ctx.strokeRect(this.x, this.y + this.height * 2 + this.space * 2,
                    this.width, this.height)
                break;
            case 4:
                this.ctx.strokeRect(this.x, this.y + this.height * 3 + this.space * 3,
                    this.width, this.height)
                break;
            }
            this.ctx.strokeStyle = "red";

        this.ctx.strokeRect(this.x, this.y + this.height * curMenu + this.space * curMenu,
            this.width, this.height)
        this.ctx.strokeStyle = "green";


    }

}