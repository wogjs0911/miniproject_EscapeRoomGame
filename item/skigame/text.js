import comment from './comment.js';



export default class Text{
    constructor(x,y, textArry){
        this.x = x || 100;
        this.y = y || 500;
        this.comments = textArry;
        this.count = 0;
        
        /** @type {CanvasRenderingContext2D} */ 
        this.ctx = document.querySelector(".skigame-canvas").getContext('2d');
        //텍스트 내용 입력
        this.textsrc = "sample text(bold 30px 굴림)"
        //대사 입력
        comment.comments = ["1","22","333"];
    }

    draw(x,y){
        this.ctx.fillStyle = "white"
        this.ctx.font = "bold 30px 굴림"
        // this.ctx.fillText(this.textsrc, x, y)
        if(this.count != comment.comments.length){
            console.log("현재 배열 값 : "+comment.comments[this.count])
            this.ctx.fillText(comment.comments[this.count], x, y)
        }
    };
    drawTextBackGronund(x,y){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x,y,640,100);
        this.ctx.strokeRect(0,0,640,700);
    };

};