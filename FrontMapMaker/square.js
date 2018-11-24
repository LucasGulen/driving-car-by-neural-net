class Square {

    constructor(x, y, width) {
        this.pos = createVector(x, y);
        this.width = width;
        this.visible = true;
        this.debut = false;
    }

    draw() {
        if (this.visible) {
            if (this.debut) {
                fill(color(75, 244, 66));
            }
            rect(this.pos.x, this.pos.y, this.width, this.width);
            fill(255);
        }
    }



}




