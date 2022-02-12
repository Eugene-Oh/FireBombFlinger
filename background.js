class Background { 
    
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./backgrounds/harbor.png"), 
        0, 0, 1984, 1088, 1, 1);
    };  /*
    constructor(game, xStart,yStart,x,y,width,height) { 
        this.game = game; 
        this.animator = new Animator(ASSET_MANAGER.getAsset("./backgrounds/harbor.png"), 
        xStart, yStart, width, height, x, y);
    }; */

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 0 - this.game.camera.x, 0, .665);
    };
}