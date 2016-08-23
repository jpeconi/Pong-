var canvas;
var canvasContext;
var canvasColor = 'black';

// Ball
var ballWidth = 20;
var ballHeight = 20;
var ballColor = 'red';
var ballSpeed = 10;
var vertialBallSpeed = 4;

// Coordinates for the starting position of the ball
var ballX = 50;
var ballY = 200;

// Paddles
var paddleHeight = 100;
var paddleWidth = 10;
var paddleColor = 'white';

// Coordinates of the paddles 
var paddle1Y = 250 - paddleHeight / 2;
var paddle2Y = 250 - paddleHeight / 2;

// Frames
var framesPerSecond = 30;

// Scores
var player1Score = 0;
var player2Score = 0;
const VICTORY = 1;
var isGameOver = false;

window.onload = function() {
    //console.log('testing');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    setInterval(gameControl,1000/framesPerSecond);
    canvas.addEventListener('keydown',movePaddle, false);

}

// Handle moving the paddle with the key press
function movePaddle(e) {
    console.log(e.keyCode);
    
    if(e.keyCode == '87' && paddle1Y > 0) {
        paddle1Y -= 15;
        console.log('test');
    } 
    
    if(e.keyCode == '83' && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += 15;
    }
    
    
}
// Update the moving pieces and redraw the background 
function gameControl() {
  draw();
  update();
}

// Functionality to handle the moving pieces
function update() {
    if(isGameOver) {
        return;
    }
    
    ballX += ballSpeed;
    ballY += vertialBallSpeed;
    
    // This will be the variable that handles the angle of where the ball is hit.
    // This will increase the speed of the ball depending on where abouts on your paddle the ball is hit.
    var deltaY = 0;
    // When you get the angle from where the ball is hit. You must multiply it by a smaller value than 1
    // to make the ball speed manageable. Was insane fast if this wasnt added.
    var factor = 0.1;
    
    // Start up the computer AI
    computerAI();
    
    // Player 1 scores
    if(ballX > canvas.width - 15) {
         // Player 2 returns the ball
         if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
              ballSpeed *= -1;
              deltaY = ballY - (paddle2Y - paddleHeight / 2);
              vertialBallSpeed = deltaY * factor;
        } else {
          player1Score++;
          reset();
        }
      
    }
    
    // Player 2 scores
    if(ballX < 5) {
         // Player 1 returns the ball
        if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
          ballSpeed *= -1;
          deltaY = ballY - (paddle1Y - paddleHeight / 2);
          vertialBallSpeed = deltaY * factor;
        } else {
          player2Score++;
          reset(); 
        }
     }
    
    // Vertical collisions
     if(ballY > canvas.height - 5 || ballY < 0) {
            vertialBallSpeed *= -1;
        }
     
    //console.log(player1Score);
}

// Drawing the canvas to the screen
function draw() {
    // The canvas 
    drawRectangle(0,0,canvas.width,canvas.height,canvasColor);
    // If a player has won show the win screen
    if(isGameOver) {
        if(player1Score > player2Score) {
            canvasContext.fillStyle = 'red';
            canvasContext.font = "30px Arial";
            canvasContext.fillText("Player 1 WINS! " + player1Score + " - " + player2Score, 250, canvas.height / 2);
            canvasContext.font="italic small-caps bold 12px arial";
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Click to continue", 340, canvas.height / 2 + 40);
        }
        return;
    }
    
    // Draw the ball
    drawCircle(ballX,ballY,8,'white');
    // Player 1 paddle
    drawRectangle(5,paddle1Y,paddleWidth,paddleHeight,paddleColor);
    // Player 2 paddle
    drawRectangle(canvas.width - 5 - paddleWidth,paddle2Y,paddleWidth,paddleHeight,paddleColor);
    
    canvasContext.fillText("Player 1 ", 80 , 40);
    canvasContext.fillText(player1Score, 95, 60);
    canvasContext.fillText("Player 2 ", 680 , 40);
    canvasContext.fillText(player2Score, 695, 60);
}

// Universal function for drawing a rectangle to be used for the paddles and the canvas
function drawRectangle(x,y,width,height,color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height);
}

// Function that for drawing a circle to the screen ( The ball )
function drawCircle(x,y,radius,color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x,y,radius,0,Math.PI*2, true);
    canvasContext.fill();
}

// The computer AI
function computerAI() {
    var computerSpeed = 6;
    // The number of pixels off center that the paddle will wait before moving
    // Steadies the battle a bit
    var steadyPixels = 25;
    var paddle2Center = paddle2Y + (paddleHeight / 2);
    
    if(paddle2Center > ballY + steadyPixels) {
        paddle2Y -= computerSpeed;
    } else if (paddle2Center < ballY - steadyPixels) {
        paddle2Y += computerSpeed;
    }
}

// Reset the ball to the middle
function reset() {
    if(player1Score == VICTORY || player2Score == VICTORY) {
        isGameOver = true;
    }
    
    ballSpeed *= -1;
    ballX = canvas.width / 2 - ballWidth;
    ballY = canvas.height / 2;
}
