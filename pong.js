var canvas;
var canvasContext;

// Ball
var ballWidth = 20;
var ballHeight = 20;
var ballColor = 'red';
var ballSpeed = 5;

// Paddles
var paddleHeight = 100;
var paddleWidth = 10;

// Coordinates for the starting position of the ball
var ballX = 50;
// Frames
var framesPerSecond = 30;

window.onload = function() {
    //console.log('testing');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    setInterval(gameControl,1000/framesPerSecond);

}

function gameControl() {
  draw();
  update();
}

function update() {
    ballX += ballSpeed;

    if(ballX == canvas.width - 5 || ballX == 5) {
      ballSpeed *= -1;
    }
}

function draw() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
  canvasContext.fillStyle = ballColor;
  canvasContext.fillRect(ballX,canvas.height/2,ballWidth,ballHeight);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(5,canvas.height/2 - paddleHeight/2,paddleWidth,paddleHeight);

}
