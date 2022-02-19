class pot { 
    constructor(game,x,y,size) {    
        Object.assign(this, {game,x,y,size}); 
        this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/pot.png"), 
        0, 0 ,12, 15,1,1);
    // this.spritesheet = ASSET_MANAGER.getAsset("./Harbor_Assets.png"); 
        this.updateBB();
    };

    update() { 
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,12 * this.size,15 * this.size);
    };

    draw(ctx) { 
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);   
        //   ctx.drawImage(this.spritesheet,this.xStart,this.yStart,this.width,this.height,this.x,this.y,this.width*this.size,this.height*this.size); 
        if (params.debug) {
            ctx.strokeStyle = 'white';    
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}