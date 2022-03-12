class MeleeEnemy {
    constructor(game, spawnX, spawnY, direction, mainplayer) {
	
		Object.assign(this, { game, spawnX, spawnY, direction, mainplayer });

		this.x = this.spawnX;
		this.y = this.spawnY;

		this.state = 0;// 0 walking, 1 attacking, 2 dead

        this.animationspeed = 0.2;
        this.deathanimationspeed = .15;
        this.size = 1.50;

		this.totalHealth = 5;
		this.health = this.totalHealth;

        this.deathCounter = 0;
        this.deathMaxCounter = .7;
        this.removeFromWorld = false;

		this.velocityX = 0;
		this.velocityY = 0;
		
		this.wakeDetection = 10;
		this.wakeTime = 2.3;
		
		this.isIdle = true;
		this.isWalking = false;	
		this.isAttacking = false;
		
		this.movementspeed = 200;
		
		this.attackRate = 0.8;
		this.moveDetection = 150;
		
		this.elapsedTime = 0;
		this.elapsedDeathTime = 0;
		this.elapsedDeathTimeMax = 2.50;
		
		this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./monstersprite/monsterIdle.png"), 
        0, 0, 140, 70, 8, this.animationspeed);		

        this.walkanimator = new Animator(ASSET_MANAGER.getAsset("./monstersprite/monsterWalk.png"), 
        0, 0, 140, 70, 8, this.animationspeed);
        this.walkreverseanimator = new Animator(ASSET_MANAGER.getAsset("./monstersprite/monsterWalkReverse.png"), 
        0, 0, 140, 70, 8, this.animationspeed);

		this.attackanimator = new Animator(ASSET_MANAGER.getAsset("./monstersprite/monsterAttack.png"), 
        0, 0, 140, 70, 8, this.animationspeed);
		this.attackreverseanimator = new Animator(ASSET_MANAGER.getAsset("./monstersprite/monsterAttackReverse.png"), 
        	0, 0, 140, 70, 8, this.animationspeed);

		this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./monstersprite/monsterDeath.png"), 
        0, 0, 140, 72, 16, this.animationspeed);

        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;   
        if (this.direction == 1) {
            this.BB = new BoundingBox(this.x + 120 - this.game.camera.x, this.y, 88, 100);
        } else {
            this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y, 88, 100);
        }
    };

    update() {
		const TICK = this.game.clockTick;
		this.elapsedTime += this.game.clockTick;
		
			//if isIdle = true then stand still animation
			//if player get close within certain x range set isIdle = false, isWake = true
			//if isWake = true -> walking animation
			//if boundingBox of thunderArmor collide with boundingBox of Player -> isWake = false, isAttacking = true
			//if isAttacking = true -> attack animation
		
		if (this.health > 0) {
			
			//Waking mechanism
			if ( this.isWalking == false) {
                this.elapsedTime += TICK
            }
            if (this.x - this.game.camera.x > 600) {
                this.direction = 0;
            } else {
                this.direction = 1;
            }
		
			// Player detection
            if ((this.x - this.game.camera.x > 0 + this.wakeDetection  && this.x - this.game.camera.x < 1280 - this.wakeDetection) || (this.health < this.totalHealth)) {
              
				this.isIdle = false;
                this.isWalking = true;
            } else if (this.isWalking == true && !(this.wakeTime < 0)) {
                this.wakeTime -= TICK;
            } else if (this.wakeTime < 0 && this.isWalking != false) {
                this.health = this.totalHealth;
                this.isWalking = false;
                this.isIdle = true;
            } else {
				this.isWalking = false;
				this.isIdle = true;
			}

			// Moves the enemy in the direction of the player
            if (this.isWalking == true) {
                if (this.x <= this.mainplayer.x - this.moveDetection) {
                    this.velocityX = this.movementspeed;
                } else if (this.x >= this.mainplayer.x + this.moveDetection) {
                    this.velocityX = -1 * this.movementspeed;
                } else {
                    this.velocityX = 0;
                }
            }

			
			//Collision
			var that = this;
			this.game.entities.forEach(function(entity) {
				if (entity.BB && that.BB.collide(entity.BB) && (entity instanceof boundingfloor) ) {
					if (that.BB.right >= entity.BB.left && (that.BB.left < entity.BB.left)) {
						that.velocityX = 0;
					} else if (that.BB.left <= entity.BB.right && (that.BB.right > entity.BB.right)){
						that.velocityX = 0;
					}
				} else if (entity.BB && that.BB.collide(entity.BB) && (entity instanceof Player)) {
					
					that.velocityX = 1;
					that.isIdle = false;
					that.isWalking = false;
					that.isAttacking = true;
				}
			});
			
			this.x += this.velocityX * TICK;
			
		}
		
		
		if (this.health <= 0){
			this.removeFromWorld = true;
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
				this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size) 
			} else if (this.isWalking == true) {
				if (this.direction == 0) {
					this.walkanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size)
				} else {
					this.walkreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size)
				}
			} else if (this.isAttacking == true) {
				if (this.direction == 1) {
					this.attackreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size)
				} else {
					this.attackanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size)
				}
				
			}

		} else {
			if (this.removeFromWorld == true){
				this.deathanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size)

			}
		}
        
        // To see the bounding box
        if (params.debug) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}