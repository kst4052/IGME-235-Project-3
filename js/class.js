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
        this.beginFill(0xFF0000);
        this.lineStyle(5,0xFFFFFF);
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
        this.isAlive=true;
    }

}