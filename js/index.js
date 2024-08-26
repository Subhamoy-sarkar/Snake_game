// Game constants & variables : 
let inputDir= { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOver = new Audio('music/game_over.wav');
const move = new Audio('music/move.wav');
const bg_music=new Audio('music/bg_music.mp3');
let speed=5;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function itCollide(snake){
    // if snake bump into itself :
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            score=0;
            gameOver.play();
            bg_music.pause();
            return true;
        }
    }
    // if you bump into the wall : 
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
        score=0;
        gameOver.play();
        bg_music.pause();
        return true;
    }
    return false;
}
function gameEngine(){
    // part1 :  Updating the snake array 
    if(itCollide(snakeArr)){
        inputDir={x:0,y:0};
        speed=5;
        alert('Game Over . Press any key to play again !');
        scoreBox.innerHTML="Score : "+ score;
        snakeArr=[
            {x:13,y:15}
        ]
        bg_music.play();
    }
    // if you have eaten the food, increament the score and regenerate the food:
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(speed<15) speed+=0.5;
        scoreBox.innerHTML="Score : "+ score;
        if(score>hiScoreval){
            hiScoreval=score;
            localStorage.setItem("highScoreBox",JSON.stringify(hiScoreval));
            highScoreBox.innerHTML="High Score : "+ hiScoreval;
        }
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=17;
        food={x:Math.round(a+(b-a)* Math.random()),y:Math.round(a+(b-a)* Math.random())}   //random no. between a and b 
    }

    // moving the snake:
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part2 : display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // part3 : display the food 
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}


// main logic :
bg_music.play();
let hiScore=localStorage.getItem("highScoreBox");
if(hiScore===null){
    hiScoreval=null;
    localStorage.setItem("highScoreBox",JSON.stringify(hiScoreval));
}
else{
    hiScoreval=JSON.parse(hiScore);
    highScoreBox.innerHTML="High Score : "+ hiScoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    bg_music.play();
    move.play();
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