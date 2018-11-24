const NO_USER_ACTION = 0;
const USER_TURN_LEFT = 1;
const USER_TURN_RIGHT = 2;
let model;
let modelLoaded = false;
let IA_MUST_START = false;

const api_url = "http://127.0.0.1:8000/api"
const post_url = "/multipleData";

let userData = [];
let canvasWidth = 600;
let canvasHeight = 650;
let backgroundColor;

let circle;

let squares = [];

let circuits = [];
let selectedCircuitIndex = -1;

let starting;

async function preload() {
    for(let i = 1; i <= 10; i++) {
        let data = loadJSON('circuits/circuit_' + i + '.json');
        circuits.push(data);
    }
    model = tf.sequential();
    model = await tf.loadModel('./car_simulation_model.json'); 
    modelLoaded = true;
}

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    backgroundColor = color(255, 200, 255);
    setNewRandomCircuit();
}

function draw() {
    background(backgroundColor);
    starting.draw();
    strokeWeight(2);
    squares.forEach((square) => square.draw());

    circle.draw();
    if (IA_MUST_START) {
        circle.move();
    }
    if (frameCount % 7 == 0 && modelLoaded && IA_MUST_START) {
        let distancesVect = circle.getDistances();
        //predict movement
        const predictions = model.predict(tf.tensor2d(distancesVect, [1 , 5]));
        var readable_output = predictions.dataSync();
        if (readable_output[0] > readable_output[1] && readable_output[0] > readable_output[2] ) {
            //Turn left (just verify that the first output given by the NN is really the left direction)
            circle.turnLeft();
        } else if (readable_output[2] > readable_output[1] && readable_output[2] > readable_output[0]) {
            circle.turnRight();
        }
    }
    circle.getDistances();
    if (circle.hitSquare(squares)) {
        setNewRandomCircuit();
    } else if (circle.hasFinished(starting)) {
        setNewRandomCircuit();
    }
}

function startIA () {
    IA_MUST_START = true;
}

function stopIA () {
    IA_MUST_START = false;
}

function setNewRandomCircuit() {
    squares = [];
    selectedCircuitIndex = Math.floor(Math.random()*10);
    circuits[selectedCircuitIndex].squares.forEach((square) => {
        squares.push(new Square(square.x, square.y, square.width));
    });
    starting = new StartingSquare(circuits[selectedCircuitIndex].starting.x, circuits[selectedCircuitIndex].starting.y, circuits[selectedCircuitIndex].starting.width);
    instanciateCircle();
}

function instanciateCircle() {
    circle = new Circle(circuits[selectedCircuitIndex].circlePos.x, circuits[selectedCircuitIndex].circlePos.y, 10, circuits[selectedCircuitIndex].circleDirection.x, circuits[selectedCircuitIndex].circleDirection.y);
}

