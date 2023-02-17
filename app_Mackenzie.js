let canvas;
let ctx; //context for functions drawing on canvas
let gBArrayHeight = 20; //gameboard height in 20 total squares going down
let gBArrayWidth = 12; //gameboard width in squares going across the array
let startX = 4; // start drawing shapes 4 over
let startY = 0; // start drawing shapes 0 down
let coordinateArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0)); // multi-dimensional array
let curTetromino = [[1,0], [0,1], [1,1], [2,1]]; // first or current Tetromino

let tetrominos = [];
let tetrominoColors = ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red'];
let curTetrominoColor;

let gameBoardArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

let DIRECTION = { // track direction tetrominos move in
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
let direction;

class Coordinates{ // class to look up where we draw the squares that make up our Tetrominos
    constructo(x,y){
      this.x = x;
      this.y = y;
    }
}

document.addEventListener('DOMCOntentLoaded', SetupCanvas); // function that sets up objects we draw on it

function CreateCoordArray(){
    let i = 0, j = 0;
    for(let y = 9; y <= 446; y += 23){ // for loop adds squares based off dimensions of tetris game board (446 pixels top to bottotm, squares are populated 23px over from each other)
        for(let x = 11; x <= 264; x += 23){ // populates array L to R - 264px max space left to right on screen, squares are 11px height, 11px width
            coordinateArray [i][j] = new Coordinates (x,y); // pass the value of x and y coordinates through the array
            i++;
        }
        j++;
        i = 0;    
    }
}

function SetupCanvas(){
  canvas = document.getElementById('my-canvas');
  ctx = canvas.getContext('2d'); // working in 2d
  canvas.width = 936;
  canvasheight = 956;

  ctx.scale(2,2); // scale up so everything is bigger in browser window

  ctx.fillStyle = 'white';
  ctx.fillRectangle(0, 0, canvas.width, canvas.height); // draw rectangle

  ctx.strokeStyle = 'black';
  ctx.strokeRect(8, 8, 280, 462); // draw rectangle not fill it

  document.addEventListener('keydown', HandleKeyPress); // allow user to move tetrominos with keyboard
  CreateTetrominos();
  CreateTetromino();

  CreateCoordArray();
  DrawTetromino();
}

function DrawTetromino(){
    for(let i = 0; i< curTetromino.length; i++){ // move Tetromino x and y values so they show in middle of game board
        let x = curTetromino[i][0] + startX; 
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 1; // says theres a square inside here
        let coorX = coordinateArray[x][y].x; // look up x value
        let coorY = coordinateArray[x][y].y; // look up y value
        ctx.fillStyle = curTetrominoColor; // ref tetromino color var from above
        ctx.fillRect(coorX, coorY, 21, 21); // define dimension of one square
    }
}

function HandleKeyPress(key){
  if(key.keyCode === 65){ // means user hit the A key
      direction = DIRECTION.LEFT;
      DeleteTetromino();
      startX--;
      DrawTetromino();
  } else if(key.code === 68){ // means user hit the D key
    direction = DIRECTION.RIGHT;
    DeleteTetromino();
    startX++;
    DrawTetromino();
  } else if(key.keyCode === 83){ // means user hit the S key
    direction = DIRECTION.DOWN;
    DeleteTetromino();
    startY++;
    DrawTetromino();
  }
}

function DeleteTetromino(){
  for(let i = 0; i < curTetromino.length; i++){ // take current tetromino we are working with and delete it
      let x = curTetromino[i][0] + startX; 
      let y = curTetromino[i][1] + startY;
      gameBoardArray[x][y] = 0; // 1 means something is there 0 means there isn't
      let coorX = coordinateArray[x][y].x;
      let coorY = coordinateArray[x][y].y;
      ctx.fillStyle = 'white'; // fills the square in white "deletes tetromino"
      ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function CreateTetrominos(){
   // Push T Tetromino
   tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
   // Push I Tetromino
   tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
   // Push J Tetromino
   tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
   // Push Square Tetromino
   tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
   // Push L Tetromino
   tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
   // Push S Tetromino
   tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
   // Push Z Tetromino
   tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}

function CreateTetromino(){
    let randomTetromino = Math.floor(Math.random() * tetrominos.length); // generate random tetromino
    curTetromino = tetrominos[randomTetromino]; // set random tetromino picked to current tetromino
    curTetrominoColor = tetrominoColors[randomTetromino]; // assign new tetromino a color
}

