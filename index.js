var canvas = document.createElement("CANVAS");
canvas.width = 300;
canvas.height = 300;
canvas.style.borderStyle = "solid";
canvas.style.borderWidth = "1px";
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var interval = setInterval(draw, 16.67);

class Ball {
    constructor() {
        this.radius = 7.5;
        this.ballX = 20;
        this.ballY = 250;
        this.ballVelocityX = 2;
        this.ballVelocityY = -2;
    }   
}

class Paddle {
    constructor() {
        this.paddleW = 80;
        this.paddleH = 15;
        this.paddleX = (canvas.width-this.paddleW)/2;
        this.paddleY = canvas.height-this.paddleH;
        this.paddleVelocity = 4;
    }    
}
var ball = new Ball();
var paddle = new Paddle();

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    ball.ballX += ball.ballVelocityX;
    ball.ballY += ball.ballVelocityY;
    if (ball.ballX + ball.ballVelocityX > canvas.width-ball.radius || ball.ballX + ball.ballVelocityX < 0+ball.radius) {
        ball.ballVelocityX = -ball.ballVelocityX;
    }
    if (ball.ballY + ball.ballVelocityY > canvas.height-ball.radius || ball.ballY + ball.ballVelocityY < 0+ball.radius) {
        ball.ballVelocityY = -ball.ballVelocityY;
    } 

    drawPaddle();
    
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.ballX, ball.ballY, ball.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "green";
    ctx.fill();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.paddleX, paddle.paddleY, paddle.paddleW, paddle.paddleH);
    ctx.fillStyle = "red";
    ctx.fill();
}

document.addEventListener("keydown", function(event){
    console.log(event.which);
    var key = event.which || event.keyCode;
    if (key == 37) { //left
        if (paddle.paddleX - paddle.paddleVelocity > 0) {
            paddle.paddleX -= paddle.paddleVelocity;
        } else {
            paddle.paddleX = 0;
        }
    }
    if (key == 39) { //right
        if (paddle.paddleX + paddle.paddleW + paddle.paddleVelocity < canvas.width) {
            paddle.paddleX += paddle.paddleVelocity
        } else {
            paddle.paddleX = canvas.width-paddle.paddleW;
        }
    }
})


