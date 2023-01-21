export default class Background{
    constructor(){

        this.x = 0;
        this.y = 0;

        this.img = document.querySelector("#background1");
    }

    draw(ctx){
        // 전역 객체에 퍼즐 완료 값에 따라 배경 이미지 변경?
        ctx.drawImage(this.img, this.x, this.y);
    }

    update(){
        // this.img = document.querySelector("#background2");
    }



}