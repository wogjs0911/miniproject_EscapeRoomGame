export default class Intro{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.img = document.querySelector("#menu");
    }
    draw(ctx){
        ctx.drawImage(this.img, 0,0,568,786,this.x, this.y, 640, 800);
    }


}