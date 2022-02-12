class rope { 

    constructor(game,xStart,yStart,x,y, width, height, size) {    
        Object.assign(this, {game,xStart,yStart,x,y,width,height,size}); 
        this.animator = new Animator(ASSET_MANAGER.getAsset("./rope.png"), 
        this.xStart,this.yStart,width,height,1,1);
    // this.spritesheet = ASSET_MANAGER.getAsset("./Harbor_Assets.png"); 
        this.updateBB();
    };

    update() { 
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,this.width*this.size,this.height*this.size);
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