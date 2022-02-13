class Bullet {
	
	constructor(game, xStart, yStart, x, y, width, height, playerTeam, target) {
		Object.assign(this, {game, xStart, yStart, x, y, width, height, playerTeam, target}); 
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/bullet-sprite.png"), 
		this.xStart, this.yStart, this.width, this.height, 1, 0.2);
		/*
		if (this.bulletDirection == 0) {
            this.x = this.x - 80;
        }
*/
		var dist = getDistance(this, this.target);
		this.maxSpeed = 400;
		this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
		
        this.removeFromWorldValue = 0;
		
		//this.elapsedTime = 0;
		
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };
	
	update(){
		
		//Speed of the bullet
		this.x += (this.velocity.x * this.game.clockTick);
		this.y += (this.velocity.y * this.game.clockTick);


        if (this.x >= 1280) {
            this.removeFromWorld = 1;
        }
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