export default class Text {
    constructor(x, y, text) {
        this.x = 0 || 50;
        this.y = 0 || 700;

        this.text = ["그림을 맞추고...>", "스마트폰으로 찍어보자 ...>"] || text;

        this.font = "35px '맑은 고딕'";

        this.textCount = 0;
        this.needText = true;

    }

    // ----- 텍스트
    drawText(ctx) {
        if (this.textCount < this.text.length) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 600, 640, 200);
            ctx.font = this.font;
            ctx.fillStyle = "white";
            ctx.globalAlpha = 1.0;
            ctx.fillText(this.text[this.textCount], 50, 700);
        } else  {
            this.needText = false;
        }

    }
    update(){
        this.textCount++;
    }

}