"use strict";

const app = new PIXI.Application(700, 700);
document.querySelector('main').appendChild(app.view);
app.renderer.backgrounColor = 0x000000;


//preload sprites here


//aliases
let stage;


//game variables
let startScene;
let gameScene;
let gameOverScene;

//things we'll probably need for brick break

let balls = []; //balls to bounce 
let bricks = []; //bricks on the level
let time = 0; //time 
let score = 0; //score amount 
let lives = 3; //player starts with only 3 lives
let levelNum = 1; //level number
let paused = true; //pausing 
let bricksLeft = 0; //for bricks left to hit


//setting up the game
function setup(){
}