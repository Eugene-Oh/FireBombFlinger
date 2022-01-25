class Background {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./backgrounds/subway_BG.png"), 
        40, 40, 1984, 1088, 1, 1);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 0, 0, 3);
    };
} 



