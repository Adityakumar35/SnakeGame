// //game constants & variables

let inputDir = {x:0, y:0};
const foodSound = new Audio('point.mp3');
const gameOver = new Audio('gameend.wav');
const moveSound = new Audio('turn.mp3');
const musicSound = new Audio('bgsound.mp3');
let speed = 5;
let score=0;
// let highscore=0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13 , y:15}
]
food = {x:6 , y:7};

// game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}

function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}
function gameEngine(){
    // part1: updating the snake array
    if(isCollide(snakeArr)){
        gameOver.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game over");
        snakeArr = [{x:13 , y:15}];
        musicSound.play();
        score = 0;
        highscore = score;
        // highscore = Math.max(score,highscore);
    }
    
    // if u have eaten the food increment score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        // highscore += 1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore" + highscoreval;
        }
        scoreBox.innerHTML = "Score" + score;
        if(score>0){
            speed=5+1.*score;
        }
        // highscoreBox.innerHTML = "HighScore" + highscore;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake
    for (let i = snakeArr.length-2; i>=0; i--){
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};      
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part2: display snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
        snakeElement.classList.add('head');
        }else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}
// // main logic starts here
let highscore = localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}else{
    highscoreval = JSON.parse(highscore)
    highscoreBox.innerHTML = "Highscore" + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0 , y:1} //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;            
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});

