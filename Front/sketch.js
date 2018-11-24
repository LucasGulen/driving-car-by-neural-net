const NO_USER_ACTION = [0,1,0];
const USER_TURN_LEFT = [1,0,0];
const USER_TURN_RIGHT = [0,0,1];

//const api_url = "http://production_backend_address/api"
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

function preload() {
    for (let i = 1; i <= 10; i++) {
        let data = loadJSON('circuits/circuit_' + i + '.json');
        circuits.push(data);
    }
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
    circle.move();
    if (frameCount % 8 == 0) {
        storeData(circle);
    }
    circle.getDistances();
    // If the user hit some squares, we reset the userData variable
    if (circle.hitSquare(squares)) {
        //Reset user Data
        userData = [];
        console.log("User Data reset");
    } else if (circle.hasFinished(starting)) {
        // If the user go through the circuit without hit any square, we generate a new
        // random circuit and send his data to the backend
        sendData(userData);
        setNewRandomCircuit();
    }
    // Each user action (press left key or right key) is stored 
    if (keyIsPressed) {
        checkKey();
        storeData(circle);
    }
}

//Get five vector distances between the front of the vehicle and the squares near it
//and store it into the local storage
function storeData(circle) {
    let distancesVect = circle.getDistances();
    if (!keyIsPressed) {
        distancesVect.push(NO_USER_ACTION);
    } else if (keyCode == RIGHT_ARROW) {
        distancesVect.push(USER_TURN_RIGHT);
    } else if (keyCode == LEFT_ARROW) {
        distancesVect.push(USER_TURN_LEFT);
    }
    userData.push(distancesVect);
}

// Send data to the backend to save it
async function sendData(pBody) {
    $.ajax({
        url: api_url + post_url,
        type: "POST",
        data: JSON.stringify({ "userVectors": pBody }),
        contentType: "application/json",
    })
        .done(
            function (data) {
                console.log("Data sent with success...not your credit card information(not yet)...just distances");
                userData = [];
            }
        )
        .fail(
            function (error) {
                console.log("Error ! Data not sent with success");
                console.log(error);
            }
        );
}

//Redraw the canvas to have a new random circuit
//Read the folder "Circuit" where ten circuits Json files are stored and choose one of them randomly
function setNewRandomCircuit() {
    squares = [];
    selectedCircuitIndex = Math.floor(Math.random() * 10);
    circuits[selectedCircuitIndex].squares.forEach((square) => {
        squares.push(new Square(square.x, square.y, square.width));
    });
    starting = new StartingSquare(circuits[selectedCircuitIndex].starting.x, circuits[selectedCircuitIndex].starting.y, circuits[selectedCircuitIndex].starting.width);
    instanciateCircle();
}

//Create new vehicle represented by a circle
function instanciateCircle() {
    circle = new Circle(circuits[selectedCircuitIndex].circlePos.x, circuits[selectedCircuitIndex].circlePos.y, 10, circuits[selectedCircuitIndex].circleDirection.x, circuits[selectedCircuitIndex].circleDirection.y);
}

//Check the key pressed by the user to know which direction the circle must use
function checkKey() {
    if (keyCode == LEFT_ARROW) {
        circle.turnLeft();
    } else if (keyCode == RIGHT_ARROW) {
        circle.turnRight();
    }
}

