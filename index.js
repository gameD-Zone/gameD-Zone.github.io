var canvas = document.createElement("CANVAS");
canvas.width = 300;
canvas.height = 500;
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
        this.ballVelocityX = 3;
        this.ballVelocityY = -3;
    }   
}

class Paddle {
    constructor() {
        this.paddleW = 80;
        this.paddleH = 50;
        this.paddleX = (canvas.width-this.paddleW)/2;
        this.paddleY = canvas.height-this.paddleH-50;
        this.paddleVelocity = 6;
    }    
}

class Brick {
    
}
var ball = new Ball();
var paddle = new Paddle();

function draw() {
    if (ball.ballY >= paddle.paddleY + paddle.paddleH) {
        alert("GAME OVER!");
        location.reload();
    }

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
    console.log("ballY: " + ball.ballY)

    drawPaddle();
    if (ball.ballX >= paddle.paddleX && 
        ball.ballX <= paddle.paddleX + paddle.paddleW && 
        ball.ballY + ball.ballVelocityY >= paddle.paddleY - ball.radius) {
            ball.ballVelocityY = -ball.ballVelocityY;
    }

    if (ball.ballY >= paddle.paddleY &&
        ball.ballY <= paddle.paddleY + paddle.paddleH &&
        ball.ballX < paddle.paddleX &&
        ball.ballX + ball.ballVelocityX >= paddle.paddleX - ball.radius) {
            ball.ballVelocityX = -ball.ballVelocityX;
    }

    if (ball.ballY >= paddle.paddleY &&
        ball.ballY <= paddle.paddleY + paddle.paddleH &&
        ball.ballX > paddle.paddleX + paddle.paddleW &&
        ball.ballX + ball.ballVelocityX <= paddle.paddleX + paddle.paddleW + ball.radius) {
            ball.ballVelocityX = -ball.ballVelocityX;
    }
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

function drawBrick() {

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
});


