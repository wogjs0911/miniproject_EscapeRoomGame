export default class Box {
    constructor() {
        this.boxwidth = 370;
        this.boxheight = 40;
        this.ix = 140;
        this.iy = 555;

        this.dy = 43;

        this.moveDown = false;
        this.moveUp = false;

        this.one = true;

        this.answercnt = 1;
        this.correct = false;
    }

    update() {
        if (this.moveUp && this.one) {
            if (this.iy == 555) {
                this.iy = 555 + this.dy * 4;
                this.one = false;
                this.answercnt = 5;
                return;
            }
            this.iy -= this.dy;
            this.one = false;
            --this.answercnt;
        }
        if (this.moveDown && this.one) {
            if (this.iy == (555 + this.dy * 4)) {
                this.iy = 555;
                this.one = false;
                this.answercnt = 1;
                return;
            }
            this.iy += this.dy;
            this.one = false;
            ++this.answercnt;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "rgb(169,169,169,0.3)"
        ctx.fillRect(this.ix, this.iy, this.boxwidth, this.boxheight);

        //ctx.fillStyle = "rgb(169,169,169,0.3)"
        //ctx.fillRect(this.ix, this.iy + 43, this.boxwidth, this.boxheight);
    }

    move(dir) {
        switch (dir) {
            case 1:
                this.moveUp = true;
                break;
            case 2:
                this.moveDown = true;
                break;
        }
    }

    stop(dir) {
        switch (dir) {
            case 1:
                this.moveUp = false;
                this.one = true;
                break;
            case 2:
                this.moveDown = false;
                this.one = true;
                break;
        }
    }

    isCorrect() {
        if (this.answercnt == 3) {
            this.correct = true;
            return this.correct;
        }
        else {
            return this.correct;
        }
    }
}