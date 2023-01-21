export default class Intro{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.img = document.querySelector("#ski_menu");
        this.img2 = document.querySelector("#logo");

    }
    draw(ctx){
        ctx.drawImage(this.img, 0,0,1160,1092,this.x, this.y, 640, 800);
        ctx.drawImage(this.img2,0,0,640,264);

    }


}