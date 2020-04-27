//this will contain the classes needed for the game
class Brick extends PIXI.Graphics{
    constructor(x=0,y=0){
        super();
        this.beginFill(0xFF0000);
        this.lineStyle(5,0xFFFFFF);
        this.drawRect(x,y,100,30);
        this.endFill();
        this.x=x;
        this.y=y;
        this.isAlive=true;
    }
}

class Paddle extends PIXI.Graphics{
    constructor(x=0,y=0){
        super();
        this.beginFill(0xFFFFFF);
        this.drawRect(x,y,150,20);
        this.endFill();
        this.x=x;
        this.y=y;
    }
}

class Ball extends PIXI.Graphics{
    constructor(x=0,y=0){
        super();
        this.beginFill(0xFFFF00);
        this.drawCircle(x,y,10);
        this.endFill();
        this.x=x;
        this.y=y;
        this.radius=10;
        this.speed=400;
        this.fwd={x:0,y:-1};
    }
    move(dt=1/60){
        this.x+=this.fwd.x*this.speed*dt;
        this.y+=this.fwd.y*this.speed*dt;

    }
    reflectX(){
        this.fwd.x*=-1;
    }
    reflectY(){
        this.fwd.y*=-1;
    }
}