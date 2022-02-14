class Bullet {
	
	constructor(game, x, y, playerTeam, size, bulletSpeed, target) {
		Object.assign(this, {game, x, y, playerTeam, size, bulletSpeed, target}); 
		this.width = 13;
		this.height = 6;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/bullet-sprite.png"), 
		0, 0, this.width, this.height, 1, 0.2);
		/*
		if (this.bulletDirection == 0) {
            this.x = this.x - 80;
        }
*/
		var dist = getDistance(this, this.target);
		this.maxSpeed = this.bulletSpeed;
		
		this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
		
        this.removeFromWorldValue = 0;
		
		//this.elapsedTime = 0;
		
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.width * this.size, this.height * this.size);
    };
	
	update(){
		
		if (this.x - this.game.camera.x < 0 || this.x - this.game.camera.x > 1280) {
            this.remove();
        }
		
		//Speed of the bullet
		this.x += (this.velocity.x * this.game.clockTick);
		this.y += (this.velocity.y * this.game.clockTick);

		this.updateBB();

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