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
let gameScene,paddle;
let gameOverScene;


//things we'll probably need for brick break
let keys=[];
let balls = []; //balls to bounce 
let bricks = []; //bricks on the level
let time = 0; //time 
let score = 0; //score amount 
let lives = 3; //player starts with only 3 lives
//let paused = true; //pausing 
//let levelNum = 1;
let bricksLeft = 0; //for bricks left to hit


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
	// #4 - Create labels for all 3 scenes
    createLabelsAndButtons();
    app.ticker.add(gameLoop);
    // #5 - keyboard event handlers
    window.addEventListener("keydown", KeysDown);
    window.addEventListener("keyup",KeysUp);
}
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
    let startButton= new PIXI.Text("Start Game");
    startButton.style=buttonStyle;
    startButton.x=225;
    startButton.y=sceneHeight/2-48;
    startButton.interactive=true;
    startButton.buttonMode=true;
    startButton.on("pointerup",startGame);
    //startButton.on('pointerover',e=>e.target.alpha=0.7);
    //startButton.on('pointerout',e=>e.target.alpha=1.0);
    startScene.addChild(startButton);

    //set up gamescene
    let textStyle= new PIXI.TextStyle({
        fill:0xFFFFFF,
        fontSize:18,
        fontFamily:"Futura",
        stroke: 0xFF0000,
        strokeThickness:4
    });
    let scoreLabel= new PIXI.Text("score: "+score);
    scoreLabel.style= textStyle;
    scoreLabel.x=5;
    scoreLabel.y=5;
    gameScene.addChild(scoreLabel);
    //increaseScoreBy(0);

    let lifeLabel= new PIXI.Text("lives: "+lives);
    lifeLabel.style=textStyle;
    lifeLabel.x=5;
    lifeLabel.y=26;
    gameScene.addChild(lifeLabel);
    //decreaseLifeBy(0);

    // 3 - set up `gameOverScene`
    // 3A - make game over text
    /*
    let gameOverText = new PIXI.Text("Game Over!\n        :-O");
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

    // 3B - make "play again?" button
    let playAgainButton = new PIXI.Text("Play Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 150;
    playAgainButton.y = sceneHeight - 100;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",startGame); // startGame is a function reference
    playAgainButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    playAgainButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    gameOverScene.addChild(playAgainButton);*/
    
}
function startGame(){
    startScene.visible=false;
    gameOverScene.visible=false;
    gameScene.visible=true;
    score=0;
    lives=3;
   
    for(let i=0;i<7;i++){
        for(let j=0; j<10;j++){
            let b= new Brick(50*i,15*j+35);
            bricks.push(b);
            gameScene.addChild(b);
        }
    }
    for(let i=0;i<3;i++){
        let b= new Ball(sceneWidth/2-185,sceneHeight/2-15);
        balls.push(b);}
        
    gameScene.addChild(balls[0]);
    paddle= new Paddle(sceneWidth/2-225,sceneHeight/2-10);
    gameScene.addChild(paddle);

}


function gameLoop(){

	// #1 - Calculate "delta time"
	let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;
	// #2 - Move paddle with A and D keys
    if(keys["68"] && paddle.x<sceneWidth/2+75){
        paddle.x+=5;
    }
    if(keys["65"] && paddle.x>-150){
        paddle.x-=5;
    }
	
	
}

setup();