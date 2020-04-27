"use strict";

const app = new PIXI.Application(700, 700);
document.querySelector('main').appendChild(app.view);
app.renderer.backgroundColor = 0x000000;

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	
//preload sprites here
//aliases
let stage;


//game variables
let startScene;
let gameScene,paddle,ball,scoreLabel,lifeLabel;
let gameOverScene;
let gameWinScene;
//anything related to first bool is just to fix scope related mistake- ignore
let first=true;

//things we'll probably need for brick break
let keys=[];
let bricks = []; //bricks on the level
let score = 0; //score amount 
let lives = 3; //player starts with only 3 lives
//let paused = true; //pausing 
//let levelNum = 1;


//setting up the game

function setup() {
	stage = app.stage;
	// #1 - Create the `start` scene
    startScene=new PIXI.Container();
    stage.addChild(startScene);
	// #2 - Create the main `game` scene and make it invisible
    gameScene= new PIXI.Container();
    gameScene.visible=false;
    stage.addChild(gameScene);
	// #3 - Create the `gameOver` scene and make it invisible
    gameOverScene= new PIXI.Container();
    gameOverScene.visible=false;
    stage.addChild(gameOverScene);
    // #4 - Create the `gameWin` scene and make it invisible
    gameWinScene= new PIXI.Container();
    gameWinScene.visible=false;
    stage.addChild(gameWinScene);
	// #4 - Create labels for all 4 scenes
    createLabelsAndButtons();
    // #5 - keyboard event handlers
    window.addEventListener("keydown", KeysDown);
    window.addEventListener("keyup",KeysUp);
    
}

//helper functions to detect keyboard input
function KeysDown(e){
    keys[e.keyCode]=true;
}
function KeysUp(e){
    keys[e.keyCode]=false;
}

function createLabelsAndButtons(){
    let buttonStyle= new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 48,
        fontFamily: 'Futura'});
    //set up startscene
    let startButton= new PIXI.Text("Start Game");
    startButton.style=buttonStyle;
    startButton.x=225;
    startButton.y=sceneHeight/2-48;
    startButton.interactive=true;
    startButton.buttonMode=true;
    startButton.on("pointerup",startGame);
    startScene.addChild(startButton);

    //set up gamescene
    let textStyle= new PIXI.TextStyle({
        fill:0xFFFFFF,
        fontSize:18,
        fontFamily:"Futura",
        stroke: 0xFF0000,
        strokeThickness:4
    });
    scoreLabel= new PIXI.Text("score: "+score);
    scoreLabel.style= textStyle;
    scoreLabel.x=5;
    scoreLabel.y=5;
    gameScene.addChild(scoreLabel);

    lifeLabel= new PIXI.Text("lives: "+lives);
    lifeLabel.style=textStyle;
    lifeLabel.x=5;
    lifeLabel.y=26;
    gameScene.addChild(lifeLabel);

    //set up gameoverscene
    let gameOverText = new PIXI.Text("Game Over!");
    textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 64,
        fontFamily: "Futura",
        stroke: 0xFF0000,
        strokeThickness: 6
    });
    gameOverText.style = textStyle;
    gameOverText.x = 100;
    gameOverText.y = sceneHeight/2 - 160;
    gameOverScene.addChild(gameOverText);

    let playAgainButton = new PIXI.Text("Play Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 150;
    playAgainButton.y = sceneHeight - 100;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",startGame);
    gameOverScene.addChild(playAgainButton);

    //set up gamewinscene
    let gameWinText = new PIXI.Text("You win!");
    gameWinText.style = textStyle;
    gameWinText.x = 100;
    gameWinText.y = sceneHeight/2 - 160;
    gameWinScene.addChild(gameWinText);

    let playAgainButton2 = new PIXI.Text("Play Again?");
    playAgainButton2.style = buttonStyle;
    playAgainButton2.x = 150;
    playAgainButton2.y = sceneHeight - 100;
    playAgainButton2.interactive = true;
    playAgainButton2.buttonMode = true;
    playAgainButton2.on("pointerup",startGame);
    gameWinScene.addChild(playAgainButton2);

}

function startGame(){
    startScene.visible=false;
    gameOverScene.visible=false;
    gameWinScene.visible=false;
    gameScene.visible=true;
    score=0;
    lives=3;
   //create new bricks 
    for(let i=0;i<7;i++){
        for(let j=0; j<3;j++){
            let b= new Brick(50*i,15*j+35);
            bricks.push(b);
            gameScene.addChild(b);
        }
    }
    //create paddle
    paddle= new Paddle(sceneWidth/2-225,sceneHeight/2-10);
    gameScene.addChild(paddle);
    //create ball
    ball= new Ball(paddle.x+35,sceneHeight/2-20);
    gameScene.addChild(ball);
    //call gameloop function
    if(first==true){app.ticker.add(gameLoop);}
    else{gameLoop();}
    
    
}

//helper function to detect collision
function rectsIntersect(a,b){
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    
}

function gameLoop(){
    first=false;
    // #1 - Calculate "delta time"
	let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;
    //keep updating labels
    lifeLabel.text=`lives: ${lives}`;
    scoreLabel.text=`score: ${score}`;
	// #2 - Move paddle with A and D keys
    if(keys["68"] && paddle.x<sceneWidth/2+75){
        paddle.x+=5;
    }
    if(keys["65"] && paddle.x>-150){
        paddle.x-=5;
    }

    // #3 - Move the ball around 
    ball.move(dt);
    // #3A - Detect collision with bricks
	for(var i=0;i<bricks.length;i++){
        if(rectsIntersect(bricks[i],ball) && bricks[i].isAlive){
            gameScene.removeChild(bricks[i]);
            bricks[i].isAlive=false;
            score+=100;
            ball.reflectX();
            ball.reflectY();
            
        }
    }
    // #3B - Detect collision with paddle
    if(rectsIntersect(paddle,ball)){
        ball.reflectY();
        if(keys["65"]){
            ball.fwd.x-=0.5;
        }
        else if(keys["68"]){
            ball.fwd.x+=0.5;
        }
    }
    // #3C - Detect collision with walls
    if(ball.x<=ball.radius-170||ball.x>=sceneWidth-ball.radius-165){
        ball.reflectX();}
    if(ball.y<=ball.radius-350){
        ball.reflectY();}
    // #3D - When ball goes out of bounds
    if(ball.y>=sceneHeight-ball.radius-200){
        //reset position of ball and paddle, decrease life
        paddle.x=sceneWidth/2-225;
        paddle.y=sceneHeight/2-10;
        ball.x= paddle.x+35;
        ball.y= sceneHeight/2-20;
        ball.fwd={x:0,y:-1};
        lives-=1;
        
    }
    //game over
    if (lives<=0){
        gameOverScene.visible=true;
        gameScene.visible=false;
        end();
        return;
        }

    else if(ifWin()){
        gameWinScene.visible=true;
        gameScene.visible=false;
        end();
        return;

    }
}

function ifWin(){
    for(var i=0;i<bricks.length;i++){
        if(bricks[i].isAlive==true){
            return false;
        }
    }
    return true;
}
function end(){
    bricks.forEach(c=>gameScene.removeChild(c));
    bricks=[];
    gameScene.removeChild(ball);
    gameScene.removeChild(paddle);
    }

setup();