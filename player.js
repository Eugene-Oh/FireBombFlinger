class Player {
    constructor(game) {
        this.game = game;

        this.x = 100;
        this.crouchedYReduction = 12;
        this.y = 440;
        this.yBound= 440;
        this.velocityX = 0;
        this.velocityY = 600;
        this.gravity = 0.01;
        this.gravitySpeed = 0;

        this.PLAYER_WIDTH = 21;
        this.PLAYER_HEIGHT = 34;

        // Crouching = -1, Not jumping = 0, jumping = 1
        this.jumping = 0;
        // Left = 0, Right = 1
        this.direction = 1;
        // Not shooting = 0, shooting = 1
        this.shooting = 0;

        this.size = 2.25;
        this.movementspeed = 2;
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
        if (this.game.keys["w"] && !this.game.keys["s"]) {
            this.jumping = 1;
            this.y -= this.velocityY * TICK;
        } else if (this.game.keys["s"] && !this.game.keys["w"]) {
            // Crouched mechanics
            if (this.game.keys["a"] && !this.game.keys["d"]) {
                this.direction = 0;
            } else if (this.game.keys["d"] && !this.game.keys["a"]) {
                this.direction = 1;
            }
            this.jumping = -1;
            if (this.y <= this.yBound) {
                this.y += this.velocityY * TICK;
            }
        } else {
            if (this.game.keys["a"] && !this.game.keys["d"]) {
                this.direction = 0;
            } else if (this.game.keys["d"] && !this.game.keys["a"]) {
                this.direction = 1;
            }
            this.jumping = 0;
        }

        // Shooting mechanics
        if (this.game.keys["/"]) {
            this.shooting = 1;
        } else {
            this.shooting = 0;
        }
        this.updateBB();
          // collision start 
        var that = this; 
        this.game.entities.forEach(function(entity) {
            if(entity.BB && that.BB.collide(entity.BB) && !Player) { 
                console.log(entity);
                if (entity instanceof box) {
                    console.log("Collision here");
                }
            }
        });
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
        ctx.strokeRect(this.x + this.PLAYER_WIDTH + 10, this.y, this.PLAYER_WIDTH * this.size - 5, this.PLAYER_HEIGHT * this.size - 6);
    }
}