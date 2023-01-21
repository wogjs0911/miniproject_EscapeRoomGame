export default class TF {

    constructor() {
        this.x = 100;
        this.y = 10;

        this.answer = null;

        this.onclick = null;
        this.check = true;

        this.imgT = document.querySelector(".t");
        this.imgF = document.querySelector(".f");
        this.imgC = document.querySelector(".close");
        this.imgH = document.querySelector('.hint');
    }

    draw(ctx) {
        switch (this.answer) {
            case 'F':
                ctx.drawImage(this.imgC, this.x, this.y);
                ctx.drawImage(this.imgF, this.x, this.y);
                break;
            case 'T':
                ctx.drawImage(this.imgC, this.x, this.y);
                ctx.drawImage(this.imgT, this.x, this.y);
                ctx.drawImage(this.imgH, 20, 370);
                break;
            default:
        }
    }

    notifyClick(x, y) {
        if (100 < x && x < 150 && 10 < y && y < 60) {
            this.answer = null;
            this.check = true;
        }

        if (570 < x && x < 634 && 5 < y && y < 72)
            if (this.onclick)
                this.onclick(1);

        if (this.check) {
            if (60 < x && x < 95 && 400 < y && y < 440)
                this.answer = 'F';
            if (60 < x && x < 95 && 490 < y && y < 530)
                this.answer = 'F';
            if (60 < x && x < 95 && 580 < y && y < 620)
                this.answer = 'F';
            if (60 < x && x < 95 && 670 < y && y < 710) {
                this.answer = 'T';
                this.check = false;
            }
        }
    }

}