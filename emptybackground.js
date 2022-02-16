class emptybackground {
    constructor(game,xStart,yStart, x,y, width, height,size) { 
        Object.assign(this, {game,xStart,yStart,x,y,width,height,size}); 
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./harborLevel2.png"), 
        xStart, yStart, width, height, 1, 1);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
    };
} 