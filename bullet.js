class Bullet {
	
	constructor(game, xStart, yStart, x, y, width, height, playerTeam, bulletDirection) {
		Object.assign(this, {game, xStart, yStart, x, y, width, height, playerTeam, bulletDirection}); 
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/bullet-sprite.png"), 
		this.xStart, this.yStart, this.width, this.height, 1, 0.2);
		if (this.bulletDirection == 0) {
            this.x = this.x - 80;
        }
		this.maxSpeed = 500;
        this.removeFromWorldValue = 0;
		
		//this.elapsedTime = 0;
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };
	
	update(){
        if (this.bulletDirection == 1) {
            this.x += this.maxSpeed * this.game.clockTick;
        } else {
            this.x -= this.maxSpeed * this.game.clockTick;
        }

        if (this.x >= 1280) {
            this.removeFromWorld = 1;
        }
		this.updateBB();
		if (this.x > 1280) {
			this.x = 0;
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
		
	};

    remove() {
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
        this.x = -999;
        this.y = -999;
    };
	
	draw(ctx){
        if (this.removeFromWorldValue == 0) {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
            ctx.strokeStyle = 'white';    
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
	};
};