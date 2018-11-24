let canvasWidth = 600;
let canvasHeight = 650;
let backgroundColor;

let circle;

let squaresPerLine = 10;
let squares = [];

let carMode = false;
let debutMode = false;
let circuitMode = true;

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight);

    let squareWidth = canvasWidth / squaresPerLine;
    let verticalSquares = canvasHeight / squareWidth;

    for (let y = 0; y < verticalSquares; y++) {
        for (let x = 0; x < squaresPerLine; x++) {
            squares.push(new Square(x * squareWidth, y * squareWidth, squareWidth));
        }
    }

    backgroundColor = color(255, 200, 255);

    circle = new Circle(canvasWidth / 2, canvasHeight / 2, 10);
    
    car.addEventListener('click', () => {
        carMode = true;
        debutMode = false; 
        circuitMode = false;

    });
    debut.addEventListener('click', () => {
        carMode = false;
        circuitMode = false;
        debutMode = true;
    });
    circuit.addEventListener('click', () => {
        carMode = false;
        debutMode = false;
        circuitMode = true;
    });
    enregistrer.addEventListener('click', () => {
        let circuit = new Circuit(circle.pos, circle.direction, squares.filter((square) => square.visible && !square.debut), squares.filter((square) => square.debut ));
        saveJSON(circuit, "circuit.json");
    });
}

function draw() {
    background(backgroundColor);

    squares.forEach((square) => square.draw());

    circle.draw();
    //circle.move();

    if (keyIsPressed) {
        checkKey();
    }
}

function checkKey() {
    if (keyCode == LEFT_ARROW) {
        circle.turnLeft();
    } else if (keyCode == RIGHT_ARROW) {
        circle.turnRight();
    }
}

function mousePressed() {
    if(carMode) {
        if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > canvasHeight) {
            return;
        }
        circle.setPos(mouseX, mouseY);
    } else if (circuitMode) {
        for (let i = 0; i < squares.length; i++) {
            let square = squares[i];
            if (mouseX >= square.pos.x && mouseX <= square.pos.x + square.width ) {
                if (mouseY >= square.pos.y && mouseY <= square.pos.y + square.width ) {
                    square.visible = !square.visible;
                    return;
                }
            }
        }
    } else if (debutMode) {
        for (let i = 0; i < squares.length; i++) {
            let square = squares[i];
            if (mouseX >= square.pos.x && mouseX <= square.pos.x + square.width ) {
                if (mouseY >= square.pos.y && mouseY <= square.pos.y + square.width ) {

                    square.debut = !square.debut;
                    return;
                }
            }
        }
    } 
}



