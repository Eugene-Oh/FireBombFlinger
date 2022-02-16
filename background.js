class Background {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./backgrounds/harbor.png"), 
        0, 0, 1984, 1088, 1, 1);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 0 - this.game.camera.x, 0, .665);
    };
}  

class BackgroundDynamic { 


    constructor(game,xStart,yStart,width,height,x,y,size) { 
        Object.assign(this, {game,xStart,yStart,x,y,width,height,size}); 
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./backgrounds/harbor.png"), 
        xStart, yStart,width , height, 1, 1);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y, this.size);
    };


}