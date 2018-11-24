class Circle {

    constructor(x, y, width) {
        this.pos = createVector(x, y);
        this.width = width;
        this.direction = createVector(0, -1);
    }

    draw() {
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.width, this.width);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.direction.heading());
        let offset = 7;
        triangle(this.width / 2 + offset, 0, offset, this.width / 2, offset, -this.width / 2);
        pop();
    }

    setPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    move() {
        this.pos.add(this.direction);
    }

    turnLeft() {
        this.direction.rotate(-0.1);
    }

    turnRight() {
        this.direction.rotate(0.1);
    }

    hitSquare(squares) {
        for (let i = 0; i < squares.length; i++) {
            let deltaX = this.pos.x - Math.max(squares[i].pos.x, Math.min(this.pos.x, squares[i].pos.x + squares[i].width));
            let deltaY = this.pos.y - Math.max(squares[i].pos.y, Math.min(this.pos.y, squares[i].pos.y + squares[i].width));
            if ((deltaX * deltaX + deltaY * deltaY) + 15 < (this.width * this.width)) {
                return true;
            }
        }
        return false;        
    }


}




