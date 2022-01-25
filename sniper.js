class Sniper {
    // Direction 0 = Left, 1 = Right
    constructor(game, spawnX, spawnY, direction) {
        this.game = game
        this.spawnX = spawnX
        this.spawnY = spawnY
        this.direction = direction
        this.animationspeed = .1
        this.size = 2.10

        this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershooting.png"), 
        0, 0, 44, 20, 8, this.animationspeed);
        this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershootingreverse.png"), 
        0, 0, 44, 20, 8, this.animationspeed);
    };

    update() {

    };

    draw(ctx) {
        if (this.direction == 1) {
            this.shootinganimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY, this.size);
        } else {
            this.shootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY, this.size);
        }
    };
}