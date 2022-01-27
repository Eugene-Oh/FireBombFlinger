class Bullet {
	
	constructor(game, x, y){
		Object.assign(this, {game, x, y}); 
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/bullet-sprite.png"), this.x, this.y, 13, 6, 1, 0.2);
		
		//this.maxSpeed = 200;
		
		//this.elapsedTime = 0;
		
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x, this.y, 13, 6);
    };
	
	update(){
		this.x += 5;
	/*	
		this.updateBB();
		
		var that = this;
		
		//Collision
		this.game.entities.forEach(function(entity){
			
			if (this.playerTeam && (entity instanceof Sniper) && that.BB.collide(entity.BB)) {
				
				var damage = 5;
				//remove from world
			}
			
			if (!this.playerTeam && (entity instanceof Player) && that.BB.collide(entity.BB)) {
				
				var damage = 10;
				//remove from world
			}
			
		});
		*/
	};
	
	draw(ctx){
		this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
		ctx.strokeStyle = 'white';    
    	ctx.strokeRect(this.x, this.y, 13, 6);
	};
	
};