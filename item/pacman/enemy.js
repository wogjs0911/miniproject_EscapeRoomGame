import MovingDir from "./MovingDir.js";

export default class Enemy {

    constructor(x, y, tileSize, speed, map) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.speed = speed;
        this.map = map;

        this.#loadImages();

        this.movingDir = Math.floor(
            Math.random() * Object.keys(MovingDir).length
        );

        this.directionTimerDefault = this.#random(10, 25)
        this.directionTimer = this.directionTimerDefault;
    }
    draw(ctx, pause) {
        if (!pause) {
            this.#move();
            this.#changeDir();
        }

        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    collideWith(pacman) {
        this.size = this.tileSize / 2;
        if (this.x < pacman.x + this.size &&
            this.x + this.size > pacman.x &&
            this.y < pacman.y + this.size &&
            this.y + this.size > pacman.y
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    #changeDir() {
        this.directionTimer--;
        let newMoveDir = null;
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault;
            newMoveDir = Math.floor(
                Math.random() * Object.keys(MovingDir).length
            );
        }

        if (newMoveDir != null && this.movingDir != newMoveDir) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if (!this.map.chungdol(this.x, this.y, newMoveDir)) {
                    this.movingDir = newMoveDir;
                }
            }
        }
    }

    #move() {
        if (!this.map.chungdol(this.x, this.y, this.movingDir)) {
            switch (this.movingDir) {
                case MovingDir.up:
                    this.y -= this.speed
                    break;
                case MovingDir.down:
                    this.y += this.speed
                    break;
                case MovingDir.left:
                    this.x -= this.speed
                    break;
                case MovingDir.right:
                    this.x += this.speed
                    break;

            }
        }
    }
    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #loadImages() {
        this.normalGhost = new Image();
        this.normalGhost.src = "../image/pacman/ghost.png"

        this.image = this.normalGhost;
    }
}