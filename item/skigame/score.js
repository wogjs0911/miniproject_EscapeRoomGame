export default class Score{
    constructor(x,y){
        this.dom = document.querySelector(".skigame-canvas");
        this.x = x || this.dom.width/2;
        this.y = y || 100;
        this.point = 0;
    }

    draw(ctx){
        ctx.font = "48px serif"
        ctx.fillText("점수 : "+this.point,this.x-90,this.y);
    }
    update(){
        //if(조건을통과한다면)
        //score+=1
    }
}