class Tohru {
    constructor(game) {
        this.game = game;

        this.x = 100;
        this.y = 370;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.01;
        this.gravitySpeed = 0;

        this.jumping = 0;
        this.size = 2;
        this.movementspeed = 250;
        this.animationspeed = .15
        this.runanimator = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohruwalk.png"),
        0, 0, 59, 61, 8, this.animationspeed);
        this.runreverseanimator = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohruwalkreverse.png"),
        0, 0, 61, 61, 8, this.animationspeed);
        this.jumpanimator2 = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohrujump.png"),
        0, 0, 74, 63, 8, this.animationspeed);
        this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohruidle.png"),
        0, 0, 44, 76, 4, this.animationspeed + .1);
        this.uppercutanimator = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohruuppercut.png"),
        0, 0, 65, 60, 5, this.animationspeed);
        this.kickanimator = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohrukick.png"),
        0, 0, 61, 52, 4, this.animationspeed);
        this.faintanimator = new Animator(ASSET_MANAGER.getAsset("./tohrusprite/tohrufaint.png"),
        0, 0, 61, 52, 6, this.animationspeed);
    };

    update() {
        // Lateral and idle movements
        if (this.game.keys["a"] && !this.game.keys["d"]) {
            this.velocity = -1;
        } else if (this.game.keys["d"] && !this.game.keys["a"]) {
            this.velocity = 1;
        } else {
            this.velocity = 0;
        };
        this.x += this.velocity;

        // Jumping mechanics
        if (this.game.keys["w"]) {
            this.jumping = 1;
            this.gravitySpeed = this.gravitySpeed;
            this.y -= this.velocityY + this.gravitySpeed;
        } else {
            this.jumping = 0;
        }
        if (this.y < 300) {
            this.gravitySpeed -= this.gravity;
            this.y += this.velocityY + this.gravitySpeed;
        }
        if (this.y == 370) {
            this.gravitySpeed == 0;
        }
    };

    draw(ctx) {
        // Only one animation can happen at a time, which requires a bunch of nested if/else statements.
        if (this.jumping == 0) {
            if (this.velocity == 1) {
                this.runanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
            } else if (this.velocity == 0) {
                this.idleanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
            } else if (this.velocity == -1) {
                this.runreverseanimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
            }
        } else {
            this.jumpanimator2.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
        }
        this.uppercutanimator.drawFrame(this.game.clockTick, ctx, 100, this.y + 200, this.size);
        this.kickanimator.drawFrame(this.game.clockTick, ctx, 300, this.y + 200, this.size);
        this.faintanimator.drawFrame(this.game.clockTick, ctx, 500, this.y + 200, this.size);
    };
}