class Bullet {
	
	constructor(game, xStart, yStart, x, y, width, height, playerTeam) {
		Object.assign(this, {game, xStart, yStart, x, y, width, height, playerTeam}); 
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/bullet-sprite.png"), 
		this.xStart, this.yStart, this.width, this.height, 1, 0.2);
		
		//this.maxSpeed = 200;
		
		//this.elapsedTime = 0;
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };
	
	update(){
		this.x += 15 * this.game.clockTick;
		this.updateBB();
		
		if (this.x > 1280) {
			this.x = 0;
		}
		
		
		var that = this;
		
		//Collision
		this.game.entities.forEach(function(entity){
			
			if(entity.BB && that.BB.collide(entity.BB)) { 
                if (entity instanceof box) {
                    console.log("Collision here");
					
                }
            }
			
		});
		
	};
	
	draw(ctx){
		this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
		ctx.strokeStyle = 'white';    
    	ctx.strokeRect(this.x, this.y, this.width, this.height);
	};
	
};