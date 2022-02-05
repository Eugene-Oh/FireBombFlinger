class RPG {
    constructor(game, spawnX, spawnY, direction) {
        this.game = game
        this.spawnX = spawnX
        this.spawnY = spawnY
        this.direction = direction
        this.animationspeed = .15
        this.size = 2.10

        this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./rpgsprite/rpgshooting.png"), 
        0, 0, 44, 27, 5, this.animationspeed);
        this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./rpgsprite/rpgshootingreverse.png"), 
        0, 0, 44, 27, 5, this.animationspeed);
        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;   
        if (this.direction == 1) {
            this.BB = new BoundingBox(this.spawnX + 25, this.spawnY + 4, 35, 54);
        } else {
            this.BB = new BoundingBox(this.spawnX + 35, this.spawnY + 6, 35, 54);
        }
    };

    update() {

    };

    draw(ctx) {
        if (this.direction == 1) {
            this.shootinganimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY, this.size);
        } else {
            this.shootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY, this.size);
        }
        // To see the bounding box
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}