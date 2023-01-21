export default class Answer {
    constructor() {
        this.img = document.querySelector("#notcor");
        this.img2 = document.querySelector("#cor");
    }

    draw(ctx) {
        ctx.drawImage(this.img, 225, 570);
    }

    draw2(ctx) {
        ctx.drawImage(this.img2, 225, 570);
    }
}