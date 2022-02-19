class Background {
    constructor(game, width, height, picture, size, offset) {
        this.game = game;
        this.size = size;
        this.offset = offset;
        this.animator = new Animator(picture, 0, 0, width, height, 1, 1);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.offset - this.game.camera.x, 0, this.size);
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

