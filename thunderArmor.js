class ThunderArmor {
    constructor(game, spawnX, spawnY, direction, mainplayer) {
	
		Object.assign(this, { game, spawnX, spawnY, direction, mainplayer });
/*
        this.game = game;
        this.spawnX = spawnX;
        this.spawnY = spawnY;
        this.direction = direction; // Left = 0, Right = 1
*/

		this.x = this.spawnX;
		this.y = this.spawnY;

		this.state = 0;// 0 walking, 1 attacking, 2 dead

        this.animationspeed = 0.2;
        this.deathanimationspeed = .15;
        this.size = 2.10;

		this.totalHealth = 50;
		this.health = this.totalHealth;

        this.deathCounter = 0;
        this.deathMaxCounter = .7;
        this.removeFromWorld = false;

		this.velocityX = 0;
		this.velocityY = 0;
		
		this.wakeDetection = 200;
		this.wakeTime = 2.3;
		
		this.isSleeping = true;
		this.isWake = false;
		this.isIdle = false;
		this.isAttacking = false;
		
		this.movementspeed = 200;
		
		this.attackRate = 0.8;
		this.moveDetection = 150;
		
		this.elapsedTime = 0;
		this.elapsedDeathTime = 0;
		this.elapsedDeathTimeMax = 2.50;
		
		this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/thunderarmorsleep.png"), 
        0, 0, 47, 51, 1, this.animationspeed);		

        this.walkanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/thunderarmorwalk.png"), 
        0, 0, 47, 51, 5, this.animationspeed);
        this.walkreverseanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/thunderarmorwalkreverse.png"), 
        0, 0, 47, 51, 5, this.animationspeed);

		this.attackanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attack.png"), 
        0, 0, 49.5, 51, 4, this.animationspeed);

		this.attackreverseanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attackreverse.png"), 
        	0, 0, 49.5, 51, 4, this.animationspeed);

        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;   
        if (this.direction == 1) {
            this.BB = new BoundingBox(this.x + 20 - this.game.camera.x, this.y + 4, 70, 100);
        } else {
            this.BB = new BoundingBox(this.x + 20 - this.game.camera.x, this.y + 6, 70, 100);
        }
    };

    update() {
		const TICK = this.game.clockTick;
		this.elapsedTime += this.game.clockTick;
		
		if (this.health > 0) {
			
			//Waking mechanism
			if ( this.isWake == false) {
                this.elapsedTime += TICK
            }
            if (this.x - this.game.camera.x > 600) {
                this.direction = 0;
            } else {
                this.direction = 1;
            }

			// Player detection
            if ((this.x - this.game.camera.x > 0 + this.wakeDetection  && this.x - this.game.camera.x < 1280 - this.wakeDetection) || (this.health < this.totalHealth)) {
               // this.isSleeping = false;
                this.isWake = true;
            } else if (this.isWake == true && !(this.wakeTime < 0)) {
                this.wakeTime -= TICK;
            } else if (this.wakeTime < 0 && this.isWake != false) {
                this.health = this.totalHealth;
                this.isWake = false;
                this.isIdle = true;
            } else {
				this.isWake = false;
				this.isIdle = true;
			}

			// Moves the boss in the direction of the player
            if (this.isWake == true) {
                if (this.x <= this.mainplayer.x - this.moveDetection) {
                    this.velocityX = this.movementspeed;
                } else if (this.x >= this.mainplayer.x + this.moveDetection) {
                    this.velocityX = -1 * this.movementspeed;
                } else {
                    this.velocityX = 0;
                }
            }

			//Attack mechanics
			if (this.elapsedTime >= this.attackRate && this.removeFromWorld == false) {
				
				
				this.isIdle = false;
				this.isAttacking = true;
				console.log("attacking");
				
			} else {
				this.isIdle = true;
				this.isAttacking = false;
			}
			
			//Collision
			var that = this;
			this.game.entities.forEach(function(entity) {
				if (entity.BB && that.BB.collide(entity.BB) && (entity instanceof boundingfloor)) {
					if (that.BB.right >= entity.BB.left && (that.BB.left < entity.BB.left)) {
						that.velocityX = 0;
					} else if (that.BB.left <= entity.BB.right && (that.BB.right > entity.BB.right)){
						that.velocityX = 0;
					}
				}
			});
			
			this.x += this.velocityX * TICK;
		}
		
		
		if (this.health <= 0){
			this.remove;
		}
		
		if (this.removeFromWorld == false) {
			this.updateBB();
		}


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
        
		if (this.health > 0) {
			if (this.isIdle == true) {
				this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
			} else if (this.isWake == true) {
				
				this.attackanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attack.png"), 
        			0, 0, 49.5, 51, 4, this.animationspeed);

				this.attackreverseanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attack.png"), 
        			0, 0, 49.5, 51, 4, this.animationspeed);

				if (this.direction == 1) {
					console.log("walking");
					this.walkanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
				} else {
					console.log("walking reverse");
					this.walkreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
				}
			} else if (this.isAttacking == true) {
				if (this.direction = 1) {
					this.attackanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attack.png"), 
        				0, 0, 49.5, 51, 4, this.animationspeed);
				} else {
					this.attackreverseanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attack.png"), 
        				0, 0, 49.5, 51, 4, this.animationspeed);
				}
			}
			
			
		}
        
        // To see the bounding box
        if (params.debug) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}