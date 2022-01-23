class Player {
    constructor(game) {
        this.game = game;

        this.x = 100;
        this.crouchedYReduction = 20;
        this.y = 385;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.01;
        this.gravitySpeed = 0;

        // Not jumping = 0, jumping = 1
        this.jumping = 0;
        // Not crouching = 0, crouching = 1
        this.crouching = 0;
        // Left = 0, Right = 1
        this.crouchedDirection = 1;
        // Not shooting = 0, shooting = 1
        this.shooting = 0;

        this.size = 3;
        this.movementspeed = 2.10;
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
    };

    update() {
        // Lateral and idle movements
        if (this.game.keys["a"] && !this.game.keys["d"] && !this.game.keys["s"]) {
            this.velocity = this.movementspeed * -1;
            this.crouchedDirection = 0;
        } else if (this.game.keys["d"] && !this.game.keys["a"] && !this.game.keys["s"]) {
            this.velocity = this.movementspeed;
            this.crouchedDirection = 1;
        } else {
            this.velocity = 0;
        };
        this.x += this.velocity;

        // Jumping mechanics
        if (this.game.keys["w"] && !this.game.keys["s"]) {
            this.jumping = 1;
        } else if (this.game.keys["s"] && !this.game.keys["w"]) {
            // Crouched mechanics
            if (this.game.keys["a"] && !this.game.keys["d"]) {
                this.crouchedDirection = -1;
            } else if (this.game.keys["d"] && !this.game.keys["a"]) {
                this.crouchedDirection = 1;
            }
            this.jumping = -1;
        } else {
            this.jumping = 0;
        }

        // Shooting mechanics
        if (this.game.keys["/"]) {
            this.shooting = 1;
        } else {
            this.shooting = 0;
        }
    };

    draw(ctx) {
        // Non-aerial movement
        if (this.jumping == 0) {
            if (this.shooting == 1) {
                if (this.velocity == this.movementspeed) {
                    this.runshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.crouchedDirection == 1) {
                    this.idleshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.crouchedDirection == 0) {
                    this.idleshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == this.movementspeed * -1) {
                    this.runshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            } else {
                if (this.velocity == this.movementspeed) {
                    this.runanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.crouchedDirection == 1) {
                    this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == 0 && this.crouchedDirection == 0) {
                    this.idleanimatorreverse.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else if (this.velocity == this.movementspeed * -1) {
                    this.runreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            } 
        // Aerial movemment
        } else if (this.jumping == 1) {
            if (this.shooting == 1) {
                if (this.velocity == this.movementspeed || this.velocity == 0) {
                    this.jumpshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else {
                    this.jumpshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            } else {
                if (this.velocity == this.movementspeed || this.velocity == 0) {
                    this.jumpanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                } else {
                    this.jumpreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
                }
            }
        } else {
            if (this.crouchedDirection == 1) {
                if (this.shooting == 1) {
                    this.crouchedshootinganimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                } else {
                    this.crouchedanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                }
            } else {
                if (this.shooting == 1) {
                    this.crouchedshootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                } else {
                    this.crouchedreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.crouchedYReduction, this.size);
                }
            }
        }
    }
}