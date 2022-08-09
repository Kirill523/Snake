const canvas=document.getElementById('game')
const ctx=canvas.getContext('2d')

let speed =15;

let titleCount=20;
let titleSize=canvas.width/titleCount-20;
let headX=20;
let headY=20;
const snakeParts=[];
let tailLength=2;

let foodGoldX=-1;
let foodGoldY=-1;

let foodX=10;
let foodY=10;

let xVelocity=0;
let yVelocity=0;
let lvl=1;
let score=0;



//основная функция
function drawGame(){
    checkGoldFoodCollision();
    checkFoodCollision();
    changeSnakePosition();
    goldenFoodLoop();
    let result= gameOver();
    //заморозка игры
    if(result){
        return;
    }
    teleportSnake();
    claerScreen();
    drawGoldFood();
    lvlUp();
    drawFood();
    drawSnake();
    drawScore();
    drawLvl(); 
    setTimeout(drawGame,1000/speed);
}
//условия появления желтого квадрата.
function goldenFoodLoop(){
    if(headX===Math.floor(Math.random()*(titleCount*2))&&headY===Math.floor(Math.random()*(titleCount*2))){
        randomGoldFood();
    }
}
//Набор уровня
function lvlUp(){
    if(score>10){
        lvl=2;
        speed=20
    }
    if(score>20){
        lvl=3;
        speed=25
    }
    if(score>30){
        lvl=4;
        speed=28
    }
    if(score>40){
        lvl=5;
        speed=30
    }
    if(score>50){
        lvl=6;
        speed=35
    }
    if(score>100){
        lvl=7;
        speed=40
    }
}
//Телепорт змейки 
function teleportSnake(){
    if(headX<0){
        headX=40
    }else if (headX>40){
        headX=0
    }else if (headY<0){
        headY=40
    }else if (headY>40){
        headY=0
    }
}
//Конец игры
function gameOver(){
    let gameOverr=false;
//Убираем конец игры при старте игры
    if(yVelocity===0&&xVelocity===0){
        return false;
    }
//Если голова змеи совпадет с частью тела змеи 
    for (let i=0 ; i< snakeParts.length;i++){
        let part =snakeParts[i];
        if(part.x===headX&&part.y===headY){
            gameOverr=true;
            break;
        }
    }
//Стилизация надписи об окончаниии игры 
if(gameOverr){
    ctx.fillStyle='silver';
    ctx.font='50px Roboto';
    ctx.fillText("Вы заработали: "+score+" очков!",canvas.width-650,500)
    
    document.getElementById('game-over').style.display='block'
}
    return gameOverr;
}
document.getElementById('reset').onclick=function(){
    window.location.reload();
}

//Стилизация текста очков
function drawScore(){
    ctx.fillStyle='silver';
    ctx.font='30px Roboto';
    ctx.fillText("Очки: "+score,650,40)
}
//Стилизация текста уровня
function drawLvl(){
    ctx.fillStyle='silver';
    ctx.font='30px Roboto';
    ctx.fillText("Уровень: "+lvl,50,40)
}
//Фон игры
function claerScreen(){
    ctx.fillStyle ='#161618';
   ctx.fillRect(0,0,canvas.width,canvas.height);
}
//Змейка
function drawSnake(){
    //Стилизация тела змейки
    ctx.fillStyle='green';
    for(let i =0;i<snakeParts.length;i++){
        let part =snakeParts[i];
        ctx.fillRect(part.x*titleCount,part.y*titleCount,titleSize,titleSize)
    }
    snakeParts.push({x:headX,y:headY});

    while(snakeParts.length>tailLength){
        snakeParts.shift();
     }
    //Стилизация головы змеи
    ctx.fillStyle='lime'
    ctx.fillRect(headX*titleCount,headY*titleCount,titleSize,titleSize)
}
//Стилизация еды
function drawFood(){
    ctx.fillStyle='red'
    ctx.fillRect(foodX*titleCount,foodY*titleCount,titleSize,titleSize)
}
function drawGoldFood(){
    ctx.fillStyle='gold'
    ctx.fillRect(foodGoldX*titleCount,foodGoldY*titleCount,titleSize,titleSize)
}

function checkFoodCollision(){
    if(foodX===headX&&foodY===headY){
        foodX=Math.floor(Math.random()*(titleCount*2));
        foodY=Math.floor(Math.random()*(titleCount*2));
        tailLength++;
        score++;
    }
}

function randomGoldFood(){
    foodGoldX=Math.floor(Math.random()*(titleCount*2));
    foodGoldY=Math.floor(Math.random()*(titleCount*2));
}
function checkGoldFoodCollision(){
    if(foodGoldX===headX&&foodGoldY===headY){
        foodGoldX=-1;
        foodGoldY=-1;
        tailLength+=3;
        score+=30;
    }
}


function  changeSnakePosition(){
    headX=headX+xVelocity;
    headY=headY+yVelocity;
}
//Управление змейкой
document.body.addEventListener('keydown',keyDown);
function keyDown(event){
if(event.keyCode==38){
    if(yVelocity==1)
        return;
    xVelocity=0;
    yVelocity=-1;
}
if(event.keyCode==40){
    if(yVelocity==-1)
        return;
    xVelocity=0;
    yVelocity=1;
}
if(event.keyCode==37){
    if(xVelocity==1)
    return;
    xVelocity=-1;
    yVelocity=0;
}
if(event.keyCode==39){
    if(xVelocity==-1)
    return;
    xVelocity=1;
    yVelocity=0;
}
}

drawGame();
