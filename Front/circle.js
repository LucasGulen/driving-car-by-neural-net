class Circle {

    /*
    0 - Still inside starting square
    1 - Already outside starting square but did not finish yet
    2 - Has finished
    */

    constructor(x, y, width, xDirection, yDirection) {
        this.pos = createVector(x, y);
        this.width = width;
        this.direction = createVector(xDirection, yDirection);
        this.state = State.hasStarted;
    }

    draw() {
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.width, this.width);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.direction.heading());
        let offset = 7;
        noStroke();
        triangle(this.width / 2 + offset, 0, offset, this.width / 2, offset, -this.width / 2);
        pop();
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

    isTouchingSquare(square) {
        let deltaX = this.pos.x - Math.max(square.pos.x, Math.min(this.pos.x, square.pos.x + square.width));
        let deltaY = this.pos.y - Math.max(square.pos.y, Math.min(this.pos.y, square.pos.y + square.width));
        return ((deltaX * deltaX + deltaY * deltaY) + 15 < (this.width * this.width));
    }

    hitSquare(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (this.isTouchingSquare(squares[i])) {
                return true;
            }
        }
        return false;        
    }

    hasFinished(startingSquare) {
        if (this.state == State.hasStarted) {
            if (!this.isTouchingSquare(startingSquare)) {
                // has left starting square
                this.state = State.hasLeftStartingSquare;
                return false;
            }
        } else if (this.state == State.hasLeftStartingSquare) {
            if (this.isTouchingSquare(startingSquare)) {
                // has left starting square
                this.state = State.hasFinished;
                return true;
            }
        } else if(this.state == State.hasFinished) {
            return true;
        }
    }

    getDistances() {
        let distance;

        let startingPoint = createVector(this.pos.x, this.pos.y);
        startingPoint.add(p5.Vector.mult(this.direction, 7));
        push();7
        stroke(color(255, 100, 100));
        
        distance = this.getDistantPointByAngle(startingPoint, -HALF_PI);   
        const distLeft = Math.trunc(dist(this.pos.x, this.pos.y, distance.x, distance.y));

        distance = this.getDistantPointByAngle(startingPoint, -HALF_PI/2);    
        const distFrontLeft = Math.trunc(dist(this.pos.x, this.pos.y, distance.x, distance.y));

        distance = this.getDistantPointByAngle(startingPoint, HALF_PI);    
        const distRight = Math.trunc(dist(this.pos.x, this.pos.y, distance.x, distance.y));

        distance = this.getDistantPointByAngle(startingPoint, HALF_PI/2);    
        const distFrontRight = Math.trunc(dist(this.pos.x, this.pos.y, distance.x, distance.y));
        
        distance = this.getDistantPointByAngle(startingPoint, 0);    
        const distFront = Math.trunc(dist(this.pos.x, this.pos.y, distance.x, distance.y));
        pop();
        return [distLeft, distFrontLeft, distFront, distFrontRight, distRight];
    }

    getDistantPointByAngle(startingPoint, angle) {
        let newStartingPoint = createVector(startingPoint.x, startingPoint.y);
        let distance = createVector(newStartingPoint.x, newStartingPoint.y);
        let newDirection = createVector(this.direction.x, this.direction.y);
        newDirection.rotate(angle);
        while (get(distance.x, distance.y, 1, 1)[1] != 0) {
            distance.add(newDirection);
        }
        return distance;
    }

}




