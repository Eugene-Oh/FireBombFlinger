class Player {
    constructor(game) {
        this.game = game;

        this.totalHealth = 5;
        this.health = this.totalHealth;
        
        this.x = 50;
        this.crouchedYReduction = 12;
        this.y = 0;
        this.yBound= 600;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.04;
        this.jumpingHeight = 4;

        this.elapsedTime = 0;
        this.fireRate = .2;

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
        this.BB = new BoundingBox(this.x + this.PLAYER_WIDTH + 10 - this.game.camera.x, this.y, this.PLAYER_WIDTH * this.size - 5, this.PLAYER_HEIGHT * this.size - 6);
    };

    update() {
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;

        // Lateral and idle movements
        if (this.game.keys["a"] && !this.game.keys["d"] && !this.game.keys["s"]) {
            this.velocityX = this.movementspeed * -1;
            this.direction = 0;
        } else if (this.game.keys["d"] && !this.game.keys["a"] && !this.game.keys["s"]) {
            this.velocityX = this.movementspeed;
            this.direction = 1;
        } else {
            this.velocityX = 0;
        };
        this.x += this.velocityX;

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
        // Y-position and velocityX updates
        this.y -= this.velocityY;
        this.velocityY -= this.gravity;
        if (this.y > this.yBound) {
            this.y = this.yBound
            this.velocityY = 0;
        }
         // Shooting mechanics
        if (this.game.keys["/"] && this.elapsedTime > this.fireRate) {
            if (this.jumping == -1) {
                this.game.addEntityToFrontOfList(new Bullet(gameEngine, 0, 0, this.x + 90, this.y + 35, 13, 6, true, this.direction, 2.5, 1000));
            } else {
                this.game.addEntityToFrontOfList(new Bullet(gameEngine, 0, 0, this.x + 90, this.y + 20, 13, 6, true, this.direction, 2.5, 1000));
            }
            this.elapsedTime = 0;
        } 
        if (this.game.keys["/"]) {
            this.shooting = 1;
        } else {
            this.shooting = 0;
        }
        // Must update BB after each movement
        this.updateBB();

        // Collisions for each entity in the game.
        var that = this; 
        this.game.entities.forEach(function(entity) {
            // Collisions with other enemies and strucutres.
            if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && !(entity instanceof Bullet) && 
                !(entity instanceof EnemyBullet)) { 
                if (that.lastBB.bottom <= entity.BB.top && that.velocityY < 0) {  
                    that.yBound = entity.BB.top;
                    that.y = entity.BB.top - that.BB.height;     
                    that.velocityY = 0;
                } else if (that.BB.right >= entity.BB.left && that.velocityX >= 0 && (that.lastBB.top < entity.BB.bottom) && (that.BB.left < entity.BB.left)) {
                    that.x = entity.BB.left - that.PLAYER_WIDTH * that.size - 27 + that.game.camera.x;
                    that.velocityX = 0;
                } else if (that.BB.left <= entity.BB.right && that.velocityX <= 0 && (that.lastBB.top < entity.BB.bottom) && (that.BB.right > entity.BB.right)) {
                    that.x = entity.BB.right - that.PLAYER_WIDTH - 10 + that.game.camera.x;
                    that.velocityX = 0;
                } else if (that.BB.top <= entity.BB.bottom && that.velocityY >= 0) {
                    that.y = entity.BB.bottom;
                    that.velocityY = .01;
                }
            // Collisions with bullets.
            } else if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Player) && entity instanceof EnemyBullet) {
                entity.remove();
                that.health -= 1;
            } else {
                that.yBound = 2000;
            }
        });
        that.updateBB();
    };

    draw(ctx) {
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
                    this.crouchedshootinganimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + this.crouchedYReduction, this.size);
                } else {
                    this.crouchedanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + this.crouchedYReduction, this.size);
                }
            // The player is not shooting
            } else {
                if (this.shooting == 1) {
                    this.crouchedshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + this.crouchedYReduction, this.size);
                } else {
                    this.crouchedreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + this.crouchedYReduction, this.size);
                }
            }
        }
        ctx.strokeStyle = 'White';
        // To see the bounding box
        if (params.debug) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}