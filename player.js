class Player {
    constructor(game) {
        this.game = game;

        this.x = 50;
        this.crouchedYReduction = 12;
        this.y = 0;
        this.yBound= 600;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.04;
        this.jumpingHeight = 4;

        this.PLAYER_WIDTH = 21;
        this.PLAYER_HEIGHT = 34;

        // Crouching = -1, Not jumping = 0, jumping = 1
        this.jumping = 0;
        // Left = 0, Right = 1
        this.direction = 1;
        // Not shooting = 0, shooting = 1
        this.shooting = 0;

        this.size = 2.25;
        this.movementspeed = 1.5;
        this.animationspeed = .1

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
        
        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;    
        this.BB = new BoundingBox(this.x + this.PLAYER_WIDTH + 10, this.y, this.PLAYER_WIDTH * this.size - 5, this.PLAYER_HEIGHT * this.size - 6);
      //  this.BB = new BoundingBox(this.x+this.size+2*this.PLAYER_WIDTH,this.y+this.size*this.PLAYER_HEIGHT, this.PLAYER_WIDTH*this.size, this.PLAYER_HEIGHT*this.size); 
    };

    update() {
        const TICK = this.game.clockTick;

        // Lateral and idle movements
        if (this.game.keys["a"] && !this.game.keys["d"] && !this.game.keys["s"]) {
            this.velocity = this.movementspeed * -1;
            this.direction = 0;
        } else if (this.game.keys["d"] && !this.game.keys["a"] && !this.game.keys["s"]) {
            this.velocity = this.movementspeed;
            this.direction = 1;
        } else {
            this.velocity = 0;
        };
        this.x += this.velocity;

        // Jumping mechanics
        if (this.game.keys["w"] && !this.game.keys["s"] && this.velocityY == 0) {
            this.jumping = 1;
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
        // Y-position and velocity updates
        this.y -= this.velocityY;
        this.velocityY -= this.gravity;
        if (this.y > this.yBound) {
            this.y = this.yBound
            this.velocityY = 0;
        }
         // Shooting mechanics
        if (this.game.keys["/"]) {
            this.shooting = 1;
        } else {
            this.shooting = 0;
        }
        // Must update BB after each movement
        this.updateBB();
        
       
        var that = this; 
         // Collisions for each entity in the game.
        this.game.entities.forEach(function(entity) {
            // Can add else-if for specific collisions here.
            if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player)) {  
                if (that.velocityY < 0) { 
                    if (that.lastBB.bottom <= entity.BB.top) { 
                        console.log("floor Collide");  
                        that.yBound = entity.BB.top;
                        that.y = entity.BB.top - that.BB.height;     
                        that.velocityY = 0;
                    } else if (that.BB.bottom >= entity.BB.top && that.BB.right >= entity.BB.left) {
                        console.log("Collision here"); 
                        that.x = entity.BB.left - that.PLAYER_WIDTH*that.size-27;
                        that.velocityX = 0;
                    
                    } else if (that.BB.bottom >= entity.BB.top && that.BB.left < entity.BB.right) {
                        console.log("Right Collision here"); 
                        that.x += 50;
                        that.velocityX = 0;
                    }
                }
            // No collision is happening, thus the Y-Bound is changed to default (off the world)
            } else {
                that.yBound = 2000;
            }
        });
        this.updateBB();
    };

    draw(ctx) {
        // Grounded movement
        if (this.jumping == 0) {
            // The player is shooting
            if (this.shooting == 1) {
                if (this.velocity == this.movementspeed) {
                    this.runshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.direction == 1) {
                    this.idleshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.direction == 0) {
                    this.idleshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == this.movementspeed * -1) {
                    this.runshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            // The player is not shooting
            } else {
                if (this.velocity == this.movementspeed) {
                    this.runanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.direction == 1) {
                    this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.direction == 0) {
                    this.idleanimatorreverse.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == this.movementspeed * -1) {
                    this.runreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            } 
        // Jumping movemment
        } else if (this.jumping == 1) {
            // The player is shooting
            if (this.shooting == 1) {
                if (this.velocity == this.movementspeed || this.velocity == 0 && this.direction == 1) {
                    this.jumpshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else {
                    this.jumpshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            // The player is not shooting
            } else {
                if (this.velocity == this.movementspeed || this.velocity == 0 && this.direction == 1) {
                    this.jumpanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else {
                    this.jumpreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            }
        // Crouched movement
        } else {
            // The player is shooting
            if (this.direction == 1) {  
                if (this.shooting == 1) {
                    this.crouchedshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                } else {
                    this.crouchedanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                }
            // The player is not shooting
            } else {
                if (this.shooting == 1) {
                    this.crouchedshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                } else {
                    this.crouchedreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                }
            }
        }
        // To see the bounding box
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x + this.PLAYER_WIDTH + 10, this.y, this.PLAYER_WIDTH * this.size - 5, this.PLAYER_HEIGHT * this.size - 6);
    }
}