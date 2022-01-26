class box { 
    constructor(game,xStart,yStart,x,y, width, height) {    
        Object.assign(this, {game,xStart,yStart,x,y,width,height}); 
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Harbor_Assets.png"), 
        this.xStart,this.yStart,width,height,1,1);
    // this.spritesheet = ASSET_MANAGER.getAsset("./Harbor_Assets.png"); 
        this.size = 3;
        this.updateBB();
    };

    update() { 

    };

    updateBB() {
    this.BB = new BoundingBox(this.x,this.y,this.width,this.height);
    };

    draw(ctx) { 
    this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);   
    //   ctx.drawImage(this.spritesheet,this.xStart,this.yStart,this.width,this.height,this.x,this.y,this.width*this.size,this.height*this.size); 
    ctx.strokeStyle = 'white';    
    ctx.strokeRect(this.x,this.y,this.width,this.height);
    };
}