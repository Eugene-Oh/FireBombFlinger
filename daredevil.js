class Daredevil {
    constructor(game, spawnX, spawnY, direction) {
        this.game = game
        this.spawnX = spawnX
        this.spawnY = spawnY
        this.direction = direction
        this.animationspeed = 1
        this.deathanimationspeed = .15
        this.size = 2.10

        this.health = 2;

        this.fireRate = 1;
        this.elapsedTime = .5;
        this.bulletSpeed = 90;

        this.deathCounter = 0;
        this.deathMaxCounter = .7;
        this.removeFromWorldValue = 0;

		this.spritesheet = ASSET_MANAGER.getAsset("./daredevil/punch.png");

        this.punchanimator = new Animator(this.spritesheet, 0, 0, 29, 49, 8, this.animationspeed);
        

        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;   
        if (this.direction == 1) {
            this.BB = new BoundingBox(this.spawnX + 25 - this.game.camera.x, this.spawnY + 4, 50, 70);
        } else {
            this.BB = new BoundingBox(this.spawnX + 35 - this.game.camera.x, this.spawnY + 6, 50, 70);
        }
    };

    update() {

    };

    remove() {
        if (this.health == 0) {
            ASSET_MANAGER.playAsset("./sounds/enemies/Die.mp3")
            this.removeFromWorldValue = 1;
            this.BB = new BoundingBox(0, 0, 0, 0);
        } else {
            ASSET_MANAGER.playAsset("./sounds/enemies/Hurt.wav")
            this.health -= 1
        }
    };

    draw(ctx) {
        const TICK = this.game.clockTick
		if (this.direction == 1){
			this.punchanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
		} else {
			this.punchanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
		}
        
        // To see the bounding box
        if (params.debug) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}