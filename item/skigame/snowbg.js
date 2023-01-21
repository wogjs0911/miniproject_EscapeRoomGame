export default class Snowbg{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 640;
        this.height = 800;

        this.img = document.querySelector("#snowbg");
    }

    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }

}