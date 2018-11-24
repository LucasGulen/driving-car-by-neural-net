class Circuit {

    constructor(circlePos, circleDirection, squares, startingSquare) {
       this.circlePos = {x: circlePos.x, y: circlePos.y};
       this.circleDirection = {x: circleDirection.x, y: circleDirection.y};
       this.squares = [];
       squares.forEach((square) => {
           this.squares.push({
               x: square.pos.x,
               y: square.pos.y,
               width: square.width
           });
       });
       this.starting = {x: startingSquare[0].pos.x, 
           y: startingSquare[0].pos.y,
           width: startingSquare[0].width
       };
    }

}




