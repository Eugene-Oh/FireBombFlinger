class RPG {
    constructor(game, spawnX, spawnY, direction) {
        this.game = game
        this.spawnX = spawnX
        this.spawnY = spawnY
        this.direction = direction
        this.animationspeed = .15
        this.deathanimationspeed = .15
        this.size = 2.10

        this.deathCounter = 0;
        this.deathMaxCounter = 4;
        this.removeFromWorldValue = 0;

        this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./rpgsprite/rpgshooting.png"), 
        0, 0, 44, 27, 5, this.animationspeed);
        this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./rpgsprite/rpgshootingreverse.png"), 
        0, 0, 44, 27, 5, this.animationspeed);
        this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeath.png"),
        0, 0, 44, 21, this.deathMaxCounter,  this.deathanimationspeed);
        this.deathanimatorreverse = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeathreverse.png"),
        0, 0, 44, 21, this.deathMaxCounter,  this.deathanimationspeed);
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

    remove() {
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
    };

    draw(ctx) {
        if (this.removeFromWorldValue == 0) {
            if (this.direction == 1) {
                this.shootinganimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY, this.size);
            } else {
                this.shootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY, this.size);
            }
            // To see the bounding box
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        } else if (this.removeFromWorldValue == 1 && this.deathCounter <= this.deathMaxCounter) {
            if (this.direction == 1) {
                this.deathanimator.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY + 12, this.size)             
            } else {
                this.deathanimatorreverse.drawFrame(this.game.clockTick, ctx, this.spawnX, this.spawnY + 12, this.size)
            }
            this.deathCounter += .025;
        }
    };
}