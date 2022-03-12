class Drone {
    constructor(game, startX, startY, size) {
        Object.assign(this, {game,startX,startY,size}); 
        this.x = startX;
        this.y = startY;
        this.fireRate = 1;
        this.health = 0;
        this.animationspeed = .1
        this.elapsedTime = .5;
        this.removeFromWorld = false;
        this.direction = 1;
        this.speed = 300;
        this.hoverDistance = 400;

        this.animator = new Animator(ASSET_MANAGER.getAsset("./dronesprite/drone.png"), 
        0, 0, 20, 11, 3, this.animationspeed);
        this.updateBB();
    };


    update() {
        // Flying mechanics
        if (this.x >= this.startX + this.hoverDistance) {
            this.direction = 0;
        } else if (this.x <= this.startX - this.hoverDistance) {
            this.direction = 1;
        }

        if (this.direction == 1) {
            this.x += this.speed * this.game.clockTick;
        } else {
            this.x -= this.speed * this.game.clockTick;
        }

        const TICK = this.game.clockTick
        this.elapsedTime += TICK
        // Player detection
        if ((this.x - this.game.camera.x > 100 && this.x - this.game.camera.x < 1180)) {
            if (this.elapsedTime >= this.fireRate && this.removeFromWorld != true) {
                this.game.addEntityToFrontOfList(new Rocket(gameEngine, this.x + 21, this.y + 40, true, 1, .035, 0));
                this.elapsedTime = 0;
            }
        }
        if (this.removeFromWorld != true) {
            this.updateBB();
        }
    };


    updateBB() { 
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,20 * this.size,11 * this.size);
    };

    remove() {
        if (this.health <= 0) {
            ASSET_MANAGER.playAsset("./sounds/enemies/Die.mp3")
            this.removeFromWorld = true
            this.BB = new BoundingBox(0, 0, 0, 0);
        } else {
            ASSET_MANAGER.playAsset("./sounds/enemies/Hurt.wav")
            this.health -= 1
        }
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);   
        //   ctx.drawImage(this.spritesheet,this.xStart,this.yStart,this.width,this.height,this.x,this.y,this.width*this.size,this.height*this.size); 
        if (params.debug) {
            ctx.strokeStyle = 'white';    
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}