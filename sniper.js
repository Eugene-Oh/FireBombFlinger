class Sniper {
    // Direction 0 = Left, 1 = Right
    constructor(game, spawnX, spawnY, direction) {
        this.game = game
        this.spawnX = spawnX
        this.spawnY = spawnY
        this.direction = direction
        this.animationspeed = .10;
        this.deathanimationspeed = .15
        this.size = 2.10

        this.health = 1;

        this.fireRate = 1;
        this.elapsedTime = 2
        this.bulletSpeed = 750;

        this.deathCounter = 0;
        this.deathMaxCounter = .7;
        this.removeFromWorldValue = 0;

        this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/sniperidle.png"), 
        0, 0, 44, 20, 1, this.animationspeed);
        this.idlereverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/sniperidlereverse.png"), 
        0, 0, 44, 20, 1, this.animationspeed);


        this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershooting.png"), 
        0, 0, 44, 20, 8, this.animationspeed);
        this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershootingreverse.png"), 
        0, 0, 44, 20, 8, this.animationspeed);

        this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeath.png"),
        0, 0, 44, 21, 5, this.deathanimationspeed);
        this.deathanimatorreverse = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeathreverse.png"),
        0, 0, 44, 21, 5, this.deathanimationspeed);
        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;   
        if (this.direction == 1) {
            this.BB = new BoundingBox(this.spawnX + 22 - this.game.camera.x, this.spawnY, 34, 44);
        } else {
            this.BB = new BoundingBox(this.spawnX + 50 - this.game.camera.x, this.spawnY, 34, 44);
        }
    };

    update() {
        const TICK = this.game.clockTick
        this.elapsedTime += TICK
        if ((this.spawnX - this.game.camera.x > 100 && this.spawnX - this.game.camera.x < 1280)) {
            if (this.elapsedTime >= this.fireRate && this.removeFromWorldValue != 1) {
                ASSET_MANAGER.playAsset("./sounds/enemies/Snipershoot.mp3")
                this.game.addEntityToFrontOfList(new EnemyBullet(gameEngine, this.spawnX + 90, this.spawnY + 3, true, this.direction, 2.5, this.bulletSpeed));
                this.elapsedTime = 0;
            }
        }
        if (this.removeFromWorldValue != 1) {
            this.updateBB();
        } 
    
    };

    remove() {
        if (this.health <= 0) {
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
        // The enemy is shooting animation
        if (this.removeFromWorldValue == 0 && this.elapsedTime < .85) {
            if (this.direction == 1) {
                this.shootinganimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
            } else {
                this.shootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
            }
        // The enemy has died animation
        } else if (this.removeFromWorldValue == 1 && this.deathCounter <= this.deathMaxCounter) {
            if (this.direction == 1) {
                this.deathanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size)             
            } else {
                this.deathanimatorreverse.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size)
            }
            this.deathCounter += TICK;
        // To reset the animation back to frame 1 and to sync shooting and animation
        } else if (this.removeFromWorldValue == 0) {
            // To reset the animation back to frame 1 and to sync shooting and animation
            this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershooting.png"), 
            0, 0, 44, 20, 8, this.animationspeed);
            this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershootingreverse.png"), 
            0, 0, 44, 20, 8, this.animationspeed);
            if (this.direction == 1) {
                this.idleanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size)
            } else {
                this.idlereverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size)
            }
        }
        // To see the bounding box
        if (params.debug) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
         }
    }
}