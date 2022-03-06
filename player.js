class Player {
    constructor(game, spawnX, spawnY) {
        this.game = game;

        this.totalHealth = 50;
        this.health = this.totalHealth;
        
        this.gamewon = false;

        this.x = spawnX;
        this.crouchedYReduction = 12;
        this.y = spawnY;
        this.yBound= 600;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 2000;
        this.jumpingHeight = 1000;

        this.elapsedTime = 0;
        this.elapsedTimeWalk = 0;
        this.walkSoundRate = .4
        this.elapsedDeathTime = 0;
        this.fireRate = .30;
        
        this.jumpcooldown = .8;
        this.elapsedjumptime = 10;

        this.canmoveleft = false;
        this.canmoveright = false;

        this.PLAYER_WIDTH = 21;
        this.PLAYER_HEIGHT = 34;

        // Crouching = -1, Not jumping = 0, jumping = 1
        this.jumping = 0;
        // Left = 0, Right = 1
        this.direction = 1;
        // Not shooting = 0, shooting = 1
        this.shooting = 0;

        this.size = 2.25;
        this.movementspeed = 525;
        this.animationspeed = .1

        this.deathMaxCounter = 4;
        this.deathanimationspeed = .30

        this.runanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/run.png"),
        0, 0, 45, 34, 8, this.animationspeed);
        this.runreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/runreverse.png"),
        0, 0, 45, 34, 8, this.animationspeed);
        this.runshootinganimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/runshooting.png"),
        0, 0, 45, 34, 8, this.animationspeed);
        this.runshootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/runshootingreverse.png"),
        0, 0, 45, 34, 8, this.animationspeed);

        this.jumpanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/jump.png"),
        0, 0, 45, 31, 1, this.animationspeed);
        this.jumpreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/jumpreverse.png"),
        0, 0, 45, 31, 1, this.animationspeed);
        this.jumpshootinganimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/jumpshooting.png"),
        0, 0, 45, 31, 2, this.animationspeed);
        this.jumpshootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/jumpshootingreverse.png"),
        0, 0, 45, 31, 2, this.animationspeed);

        this.crouchedanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/crouched.png"),
        0, 0, 45, 24, 1, this.animationspeed);
        this.crouchedreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/crouchedreverse.png"),
        0, 0, 45, 24, 1, this.animationspeed);
        this.crouchedshootinganimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/crouchedshooting.png"),
        0, 0, 45, 24, 2, this.animationspeed);
        this.crouchedshootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/crouchedshootingreverse.png"),
        0, 0, 45, 24, 2, this.animationspeed);

        this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/idle.png"),
        0, 0, 45, 30, 6, this.animationspeed + .1);
        this.idleanimatorreverse = new Animator(ASSET_MANAGER.getAsset("./playersprite/idlereverse.png"),
        0, 0, 45, 30, 6, this.animationspeed + .1);
        this.idleshootinganimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/idleshoot.png"),
        0, 0, 45, 30, 2, this.animationspeed + .1);
        this.idleshootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/idleshootreverse.png"),
        0, 0, 45, 30, 2, this.animationspeed + .1);

        this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./playersprite/playerdeath.png"),
        0, 0, 44, 21, this.deathMaxCounter, this.deathanimationspeed);
        this.deathanimatorreverse = new Animator(ASSET_MANAGER.getAsset("./playersprite/playerdeathreverse.png"),
        0, 0, 44, 21, this.deathMaxCounter, this.deathanimationspeed);
        
        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;    
        if (this.jumping != -1)  {
            this.BB = new BoundingBox(this.x + this.PLAYER_WIDTH + 10 - this.game.camera.x, this.y, this.PLAYER_WIDTH * this.size - 5, this.PLAYER_HEIGHT * this.size - 6);
        }  else {
            this.BB = new BoundingBox(this.x + this.PLAYER_WIDTH + 10 - this.game.camera.x, this.y, this.PLAYER_WIDTH * this.size - 5, this.PLAYER_HEIGHT * this.size - 6 - this.crouchedYReduction);
        }
    };

    update() {
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;
        this.elapsedTimeWalk += TICK;
        this.elapsedjumptime += TICK;
        this.canmoveleft = true;
        this.canmoveright = true;
        // Lateral and idle movements
        if (this.y > 720) {
            this.health = 0;
        }
        if (this.health > 0) {
    
            // Jumping mechanics
            if (this.game.keys["w"] && !this.game.keys["s"] && this.velocityY == 0 && this.elapsedjumptime >= this.jumpcooldown) {
                ASSET_MANAGER.playAsset("./sounds/player/Jump.wav")
                this.jumping = 1;
                this.elapsedjumptime = 0;
                this.velocityY = this.jumpingHeight;
            } else if (this.game.keys["s"] && !this.game.keys["w"]) {
                // Crouched mechanics
                if (this.game.keys["a"] && !this.game.keys["d"]) {
                    this.direction = 0;
                } else if (this.game.keys["d"] && !this.game.keys["a"]) {
                    this.direction = 1;
                }
                this.jumping = -1;
            } else {
                if (this.game.keys["a"] && !this.game.keys["d"]) {
                    this.direction = 0;
                } else if (this.game.keys["d"] && !this.game.keys["a"]) {
                    this.direction = 1;
                }
                this.jumping = 0;
            }
            // Y-position and velocityX updates
            this.y -= this.velocityY * TICK;
            this.velocityY -= this.gravity * TICK;

             // Shooting mechanics for keyboard
            // if (this.game.keys["m"] && this.elapsedTime > this.fireRate) {
            //     const target = { x: this.x, y: this.y};
            //     if (this.jumping == -1) {
            //         if (this.direction == 1) {
            //             this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90, this.y + 20, true, 2.5, 1000, target));
            //         } else {
            //             this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90 - this.PLAYER_WIDTH, this.y + 20, true, 2.5, 1000, target));
            //         }
                    
            //     } else {
            //         if (this.direction == 1) {
            //             this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90, this.y + 18, true,  2.5, 1000, target));
            //         } else {
            //             this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90 - this.PLAYER_WIDTH, this.y + 18, true,  2.5, 1000, target));
            //         }
            //     }
            //     ASSET_MANAGER.playAsset("./sounds/player/Shoot.wav")
            //     this.elapsedTime = 0;
            // } 

            this.shooting = 0;
            // Shooting bullets on mouse click
            if (this.game.click && this.game.shoot == true && this.elapsedTime > this.fireRate) {
                ASSET_MANAGER.playAsset("./sounds/player/Shoot.wav")
				if (this.elapsedTime > this.fireRate) {
				
				const target = { x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y};
				
				if (this.jumping == -1) {
                    if (this.direction == 1) {
                        this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90 - (this.PLAYER_WIDTH), this.y + 20, true, 1.5, 1000, target));
                    } else {
                        this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90 - (this.PLAYER_WIDTH * 4), this.y + 20, true, 1.5, 1000, target));
                    }
	            } else {
					if (this.direction == 1) {
                        this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90 - (this.PLAYER_WIDTH), this.y + 18, true, 1.5, 1000, target));
                    } else {
                        this.game.addEntityToFrontOfList(new Bullet(gameEngine, this.x + 90 - (this.PLAYER_WIDTH * 4), this.y + 18, true, 1.5, 1000, target));
                    }
	            }
	            this.elapsedTime = 0;
				
			} 
				this.game.shoot = false;
				
			} else if (this.game.click) {
				this.shooting = 0;
			}
			
			if (this.game.click && this.game.shoot == true) {
				this.shooting = 1;	
			} else if (this.game.mouseup) {
				this.shooting = 0;
			}

            // Must update BB after each movement
            this.updateBB();
    
            // Collisions for each entity in the game.
            var that = this; 
            this.game.entities.forEach(function(entity) {
                // Collisions with other enemies and strucutres.
                if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && !(entity instanceof Bullet) && 
                    !(entity instanceof EnemyBullet) && !(entity instanceof rope) && !(entity instanceof Explosion) && 
                    !(entity instanceof Rocket) && !(entity instanceof pot) && !(entity instanceof Drone) && !(entity instanceof golemboss)) { 
                    if (that.lastBB.bottom <= entity.BB.top && that.velocityY < 0) {  
                        that.yBound = entity.BB.top;
                        that.y = entity.BB.top - that.BB.height;     
                        that.velocityY = 0;
                    } else if (that.BB.right >= entity.BB.left && (that.BB.left < entity.BB.left)) {
                        that.canmoveright = false;
                        that.velocityX = 0;
                    } else if (that.BB.left <= entity.BB.right  && (that.BB.right > entity.BB.right)) {
                        console.log("lknasdf")
                        that.canmoveleft = false;
                        that.velocityX = 0;
                    } else if (that.BB.top <= entity.BB.bottom && that.velocityY >= 0) {
                        // Add for ceiling collision if wanted.
                    }
                // Collisions with bullets.
                } else if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && entity instanceof EnemyBullet) {
                    entity.remove();
                    ASSET_MANAGER.playAsset("./sounds/player/Hurt.wav")
                    that.health -= 2;
                } else if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && entity instanceof Explosion && entity.damageDone == false) {
                    that.health -= 5;
                    ASSET_MANAGER.playAsset("./sounds/player/Hurt.wav")
                    entity.damageDone = true
                } else if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && (entity instanceof rope)) {
                    //  that.velocityY +=that.gravity;  
                      if (that.game.keys["c"]) {   
                        that.velocityY =that.gravity* that.game.clockTick;   
                        that.y += that.velocityY * that.game.clockTick;
                      if (that.game.keys["w"]) { 
                          that.y-=500 * that.game.clockTick;   
                         // that.velocityY +=gravity;  
                      } else if (that.game.keys["s"] && that.BB.bottom <= entity.BB.bottom) {  
      
                          that.y+=500 * that.game.clockTick;   
                          /* w
                          if (that.y > that.yBound) {
                              that.y = that.yBound
                              that.velocityY = 0;
                          } */
                      } 
                    }
                } else if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && entity instanceof pot) {
                    that.gamewon = true;
                }
            });
            that.updateBB();
            if (this.game.keys["a"] && !this.game.keys["d"] && !this.game.keys["s"] && this.canmoveleft) {
                if (this.elapsedTimeWalk > this.walkSoundRate) {
                    ASSET_MANAGER.playAsset("./sounds/player/Walk.wav")
                    this.elapsedTimeWalk = 0;
                    
                }
                this.velocityX = this.movementspeed * -1;
                this.direction = 0;
            } else if (this.game.keys["d"] && !this.game.keys["a"] && !this.game.keys["s"] && this.canmoveright) {
                if (this.elapsedTimeWalk > this.walkSoundRate) {
                    ASSET_MANAGER.playAsset("./sounds/player/Walk.wav")
                    this.elapsedTimeWalk = 0;
                }
                this.velocityX = this.movementspeed;
                this.direction = 1;
            } else {
                this.velocityX = 0;
            };
            this.x += this.velocityX * TICK;
        }
        if (this.health <= 0) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.health = 0;
            this.elapsedDeathTime += TICK;
        }
    };

    draw(ctx) {
        if (this.health > 0) {
            // Grounded movement
            if (this.jumping == 0) {
                // The player is shooting
                if (this.shooting == 1) {
                    if (this.velocityX == this.movementspeed) {
                        this.runshootinganimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else if (this.velocityX == 0 && this.direction == 1) {
                        this.idleshootinganimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else if (this.velocityX == 0 && this.direction == 0) {
                        this.idleshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else if (this.velocityX == this.movementspeed * -1) {
                        this.runshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    }
                // The player is not shooting
                } else {
                    if (this.velocityX == this.movementspeed) {
                        this.runanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else if (this.velocityX == 0 && this.direction == 1) {
                        this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else if (this.velocityX == 0 && this.direction == 0) {
                        this.idleanimatorreverse.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else if (this.velocityX == this.movementspeed * -1) {
                        this.runreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    }
                } 
            // Jumping movemment
            } else if (this.jumping == 1) {
                // The player is shooting
                if (this.shooting == 1) {
                    if (this.velocityX == this.movementspeed || this.velocityX == 0 && this.direction == 1) {
                        this.jumpshootinganimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else {
                        this.jumpshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    }
                // The player is not shooting
                } else {
                    if (this.velocityX == this.movementspeed || this.velocityX == 0 && this.direction == 1) {
                        this.jumpanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else {
                        this.jumpreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    }
                }
            // Crouched movement
            } else {
                // The player is shooting
                if (this.direction == 1) {  
                    if (this.shooting == 1) {
                        this.crouchedshootinganimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else {
                        this.crouchedanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    }
                // The player is not shooting
                } else {
                    if (this.shooting == 1) {
                        this.crouchedshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    } else {
                        this.crouchedreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
                    }
                }
            }
        // Player death animations
        } else if (this.health == 0 && this.elapsedDeathTime < 1) {
            if (this.direction == 1) {
                this.deathanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 22, this.size)
            } else {
                this.deathanimatorreverse.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 22, this.size) 
            }
        }
        ctx.strokeStyle = 'White';
        // To see the bounding box
        if (params.debug) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}
