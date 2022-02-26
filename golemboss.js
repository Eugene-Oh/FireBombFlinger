class golemboss {
    constructor(game, spawnX, spawnY, mainplayer) {
        Object.assign(this, {game, spawnX, spawnY, mainplayer}); 
        this.mainplayer = mainplayer;
        this.game = game;
        this.x = spawnX;
        this.y = spawnY;

        this.direction = 0;
        this.size = 3.5;
        this.totalHealth = 50;
        this.health = this.totalHealth;
        this.elapsedTime = 0;
        this.BOSS_WIDTH = 100;
        this.BOSS_HEIGHT = 50;

        this.animationspeed = .18;
        this.wakeanimationspeed = .3;
        this.shootinganimationspeed = .18;
        
        this.removeFromWorld = false;

        this.sleepanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-sleep.png"),
        0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 1, this.animationspeed);
        this.wakeanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-wake.png"),
        0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 8, this.wakeanimationspeed);
        this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-idle.png"),
        0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 4, this.animationspeed);
        this.idlereverseanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-idle-reverse.png"),
        0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 4, this.animationspeed);
        this.shootanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-shoot.png"),
        0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 9, this.shootinganimationspeed);
        this.shootreverseanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-shoot-reverse.png"),
        0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 9, this.shootinganimationspeed);
        this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-death.png"),
        0, 0, this.BOSS_WIDTH, 100, 14, this.animationspeed);
        this.deathreverseanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-death-reverse.png"),
        0, 0, this.BOSS_WIDTH, 100, 14, this.animationspeed);

        this.wakeDetection = 200;
        this.wakeTime = 2.3;

        this.isSleeping = true;
        this.isWake = false;
        this.isIdle = false;
        this.isShooting = false;

        this.movementspeed = 350;
        this.velocityX = 0;

        this.bulletSpeed = 1000;
        this.moveDetection = 150;
        this.firerate = .7;
        this.firelength = .8;
        this.elapsedTime = 0;

        this.elapsedDeathTime = 0;
        this.elapsedDeathTimeMax = 2.50;

        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + this.BOSS_WIDTH - this.game.camera.x - 35, this.y + 10, this.BOSS_HEIGHT * this.size - 5, this.BOSS_HEIGHT * this.size - 5);
    };

    update() {
        const TICK = this.game.clockTick
        // Waking mechanism
        if (this.health > 0) {
            if (this.isSleeping == false && this.isWake == false) {
                this.elapsedTime += TICK
            }
            if (this.x - this.game.camera.x > 540) {
                this.direction = 0;
            } else {
                this.direction = 1;
            }
    
            // Player detection
            if (((this.spawnX - this.game.camera.x > 0 + this.wakeDetection  && this.spawnX - this.game.camera.x < 1280 - this.wakeDetection) && this.isSleeping == true) ||
                 (this.health < this.totalHealth && this.isSleeping == true)) {
                this.isSleeping = false;
                this.isWake = true;
            } else if (this.isWake == true && !(this.wakeTime < 0)) {
                this.wakeTime -= TICK;
            } else if (this.wakeTime < 0 && this.isWake != false) {
                this.health = this.totalHealth;
                this.isWake = false;
                this.isIdle = true;
            }
            // Shooting mechanics
            if (this.elapsedTime >= this.firerate && this.removeFromWorld == false) {
                if (this.elapsedTime - this.firerate > this.firelength) {
                    if (this.direction == 1) {
                        this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 120 * 2, this.y + 30, true, this.direction, .021, this.bulletSpeed / 1.75));
                        this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 120 * 2, this.y + 30, true, this.direction, .021, this.bulletSpeed / 10));
                        this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 150, this.y + 165, true, this.direction, .021, 0));
                    } else {
                        this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 120, this.y + 30, true, this.direction, .021, this.bulletSpeed / 1.75));
                        this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 120, this.y + 30, true, this.direction, .021, this.bulletSpeed / 10));
                        this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 210, this.y + 165, true, this.direction, .021, 0));
                    }
                    
                    this.elapsedTime = 0;
                }
                this.isIdle = false;
                this.isShooting = true;
            } else {
                this.isIdle = true;
                this.isShooting = false;
            }
    
            // Moves the boss in the direction of the player
            if (this.isSleeping == false && this.isWake == false) {
                if (this.x <= this.mainplayer.x - this.moveDetection - this.BOSS_WIDTH) {
                    this.velocityX = this.movementspeed;
                } else if (this.x >= this.mainplayer.x + this.moveDetection - this.BOSS_WIDTH) {
                    this.velocityX = -1 * this.movementspeed;
                } else {
                    this.velocityX = 0;
                }
            }
            
            var that = this; 
            this.game.entities.forEach(function(entity) {
                // Collisions with other enemies and strucutres.
                if (entity.BB && that.BB.collide(entity.BB) && (entity instanceof boundingfloor)) {
                    if (that.BB.right >= entity.BB.left && (that.BB.left < entity.BB.left)) {
                        that.velocityX = 0;
                    } else if (that.BB.left <= entity.BB.right && (that.BB.right > entity.BB.right)) {
                        that.velocityX = 0;
                    } 
                }
            }); 
            this.x += this.velocityX * TICK;
        }

        if (this.removeFromWorld == false) {
            this.updateBB();
        }
        if (this.health <= 0) {
            this.remove();
        }
    };

    remove() {
        if (this.health <= 0) {
            ASSET_MANAGER.playAsset("./sounds/enemies/Die.mp3")
            this.BB = new BoundingBox(0, 0, 0, 0);
        } else {
            ASSET_MANAGER.playAsset("./sounds/enemies/Hurt.wav")
            this.health -= 1
        }
    };

    draw(ctx) {
        const TICK = this.game.clockTick
        if (this.health > 0) {
            if (this.isSleeping == true) {
                this.sleepanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size) 
            } else if (this.isWake == true) {
                this.wakeanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size) 
            } else if (this.isIdle == true) {
                // To reset the shooting animations back to frame 1 and to sync shooting and animation
                this.shootanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-shoot.png"),
                0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 9, this.animationspeed);
                this.shootreverseanimator = new Animator(ASSET_MANAGER.getAsset("./boss-sprite/boss-shoot-reverse.png"),
                0, 0, this.BOSS_WIDTH, this.BOSS_HEIGHT, 9, this.animationspeed);
    
                if (this.direction == 0) {
                    this.idlereverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size) 
                } else {
                    this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size) 
                }
            } else if (this.isShooting == true) {
                if (this.direction == 1) {
                    this.shootanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.spawnY, this.size);
                } else {
                    this.shootreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.spawnY, this.size);
                }
            }
        } else if (this.health <= 0 && this.elapsedDeathTime < this.elapsedDeathTimeMax) {
            if (this.direction == 1) {
                this.deathanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size)
            } else {
                this.deathreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size) 
            }
            this.elapsedDeathTime += TICK;
        } else if (this.health <= 0 && this.elapsedDeathTime >= this.elapsedDeathTimeMax) {
            this.game.addEntityToFrontOfList(new pot(gameEngine, this.x + 120, 610 - 45, 3));
            this.removeFromWorld = true;
        }
        ctx.strokeStyle = 'White';
        // To see the bounding box
        if (this.health > 0 && (this.isSleeping == false && this.isWake == false)) {
            ctx.font = "30px Arial";
            ctx.fillStyle = 'White';
            ctx.fillText("Boss Health: " + this.health + "/" + this.totalHealth, 620, 35);
        }
        if (params.debug) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }; 
}