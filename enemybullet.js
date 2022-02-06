class EnemyBullet {
	constructor(game, xStart, yStart, x, y, width, height, playerTeam, bulletDirection, size, bulletSpeed) {
		Object.assign(this, {game, xStart, yStart, x, y, width, height, playerTeam, bulletDirection, size, bulletSpeed}); 
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/bullet-sprite.png"), 
		this.xStart, this.yStart, this.width, this.height, 1, 0.2);
		if (this.bulletDirection == 0) {
            this.x = this.x - 80;
        }
		this.maxSpeed = this.bulletSpeed;
        this.removeFromWorldValue = 0;
        this.width = this.width * size;
        this.height = this.height * size;
		
		//this.elapsedTime = 0;
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.width, this.height);
    };
	
	update(){
        if (this.bulletDirection == 1) {
            this.x += this.maxSpeed * this.game.clockTick;
        } else {
            this.x -= this.maxSpeed * this.game.clockTick;
        }

		var that = this;
		//Collision
		this.game.entities.forEach(function(entity){
			if(entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Bullet)) { 
                if (entity instanceof Sniper || entity instanceof RPG) {
                    that.remove();
					entity.remove();
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
};