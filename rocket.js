class Rocket {
    constructor(game, x, y, playerTeam, bulletDirection, size, bulletSpeed) {
		Object.assign(this, {game, x, y, playerTeam, bulletDirection, size, bulletSpeed}); 
        this.width = 806;
        this.height = 806;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/rocket.png"), 
		0, 0, this.width, this.height, 1, 0.2);
		if (this.bulletDirection == 0) {
            this.x = this.x - 80;
        }
		this.maxSpeed = this.bulletSpeed;
        this.removeFromWorldValue = 0;
        this.velocityY = 0;
		this.gravity = 1000;
		//this.elapsedTime = 0;
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.width * this.size, this.height * this.size);
    };
	
	update(){
        // Gravity physics with the rocket
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;
        if (this.bulletDirection == 1) {
            this.x += this.maxSpeed * TICK;
        } else {
            this.x -= this.maxSpeed * TICK;
        }
        this.y -= this.velocityY * TICK;
        this.velocityY -= this.gravity * TICK;

		//Collisions
		var that = this;
		this.game.entities.forEach(function(entity){
			if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Rocket)) { 
                if (entity instanceof boundingfloor || entity instanceof Player) {
                    that.game.addEntityToFrontOfList(new Explosion(gameEngine, that.x, that.y, 5, false))
                    that.remove()
                }
            }
		});
        if (this.removeFromWorldValue != 1) {
            this.updateBB();
        }
	};

    remove() {
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
        this.x = -999;
        this.y = -999;
    };
	
	draw(ctx){
        if (this.removeFromWorldValue == 0) {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
            if (params.debug) {
                ctx.strokeStyle = 'white';    
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            }
        }
	};
}