let snake = [{x:150, y:100}, {x:140, y:100}, {x:130, y:100}, {x:120, y:100}];
var gameCanvas = document.getElementById("myCanvas");
var ctx =  gameCanvas.getContext("2d");
score = 0; dx = 10; dy = 0;
foodX = 0; foodY = 0;
changingDirection = false;

createFood()
main();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function drawSnakePart(snakePart){
    ctx.fillStyle = 'cyan';  
    ctx.strokestyle = 'dark';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake(){
    snake.forEach(part => {
        drawSnakePart(part)
    });
}

function advanceSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const didEatFood = (snake[0].x === foodX && snake[0].y === foodY);  if (didEatFood) {    createFood();  } else {    snake.pop();  }
    if (didEatFood) {    score += 10;    document.getElementById('score').innerHTML = score;}
    //snake.pop();
}

function clearCanvas() {  
    ctx.fillStyle = "white";  
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function main() {
    if (didGameEnd()) return;
    setTimeout(function onTick() {  clearCanvas();    drawFood();    advanceSnake();   drawSnake(); main();  document.addEventListener("keydown", changeDirection); changingDirection = false;}, 100);
}

function changeDirection(event){
    const LEFT_KEY = 37;  const RIGHT_KEY = 39;  const UP_KEY = 38;  const DOWN_KEY = 40;
    const keyPressed = event.keyCode;  const goingUp = (dy === -10);  const goingDown = (dy === 10);  const goingRight = (dx === 10);  const goingLeft = (dx === -10);

    if (changingDirection) return;
    changingDirection = true;

    if (keyPressed === LEFT_KEY && !goingRight) {    dx = -10;    dy = 0;  }
    if (keyPressed === UP_KEY && !goingDown) {    dx = 0;    dy = -10;  }
    if (keyPressed === RIGHT_KEY && !goingLeft) {    dx = 10;    dy = 0;  }
    if (keyPressed === DOWN_KEY && !goingDown) {    dx = 0;    dy = 10;  }
}

function randomTen(min, max) {  
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;

}

function createFood() {  
    foodX = randomTen(0, gameCanvas.width - 10);  
    foodY = randomTen(0, gameCanvas.height - 10);
    snake.forEach(function isFoodOnSnake(part)  {    const foodIsOnSnake = (part.x === foodX && part.y === foodY);    if (foodIsOnSnake)      createFood();  });
}

function drawFood() { 
    ctx.fillStyle = 'red'; 
    ctx.strokestyle = 'darkred'; 
    ctx.fillRect(foodX, foodY, 10, 10); 
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function didGameEnd() {  
    for (let i = 4; i < snake.length; i++) {    
        const didCollide = (snake[i].x === snake[0].x && snake[i].y === snake[0].y);
        if (didCollide) return true;
    }
    const hitLeftWall = snake[0].x < 0;  const hitRightWall = snake[0].x > gameCanvas.width - 10;  const hitToptWall = snake[0].y < 0;  const hitBottomWall = snake[0].y > gameCanvas.height - 10;
    return hitLeftWall ||  hitRightWall ||  hitToptWall ||  hitBottomWall;
}

function EndScreen(){
    return;
}