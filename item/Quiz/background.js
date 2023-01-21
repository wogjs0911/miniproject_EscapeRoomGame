export default class Background {

    constructor() {
        this.img = document.querySelector(".bg");

        this.x = 0;
        this.y = 0;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }
    
}