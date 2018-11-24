class Square {

    constructor(x, y, width) {
        this.pos = createVector(x, y);
        this.width = width;
    }

    draw() {
        rect(this.pos.x, this.pos.y, this.width, this.width);
    }

}

class StartingSquare extends Square {

    draw() {
        push();
        noStroke();
        fill(color(75, 244, 66));
        super.draw();
        pop();
    }

}


