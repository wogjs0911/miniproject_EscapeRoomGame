export default class Obj2{
    constructor(x,y){
        this.x = x || 0;
        this.x2 = x || 545;
        this.y = y || 750;
        this.speedY = 4;
        this.speedX = -(5);
        
        this.img2 = document.querySelector("#obj2")
    }

    draw(ctx){
        // 장애물 그리기
        ctx.drawImage(this.img2,this.x,this.y,100,100);
        ctx.drawImage(this.img2,this.x2,this.y,100,100);
    }
    update(){
        // 장애물 y축 이동
        this.y-=this.speedY;
        
    }

};

