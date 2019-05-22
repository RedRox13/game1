//связь canvas с js
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 10;
var ballcolor = "#0095DD"

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
    ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballcolor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function random() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);
	return "rgb("+r+","+g+","+b+")"; 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	dx = -dx;
    	ballcolor = random();
	}
	if(y + dy < ballRadius) {
    	dy = -dy;
	} else if (y + dy > canvas.height-ballRadius) {
	    if (x > paddleX && x < paddleX + paddleWidth) {
	        dy = -dy;
	    }
	    else {
	        alert("GAME OVER");
	        document.location.reload();
	    }
	}

    x += dx;
    y += dy;

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
   		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
   		paddleX -= 7;
	}
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);
