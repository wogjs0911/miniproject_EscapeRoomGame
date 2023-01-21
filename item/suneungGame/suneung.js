export default class Suneung {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.img = document.querySelector("#suneung");
    }

    update() {

    }

    draw(ctx) {
        // class안 this 뺴먹지 말 것.
        ctx.drawImage(this.img, this.x, this.y);
    }
}