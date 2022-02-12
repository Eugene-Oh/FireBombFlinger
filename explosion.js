class Explosion {
	constructor(game, x, y, size) {
		Object.assign(this, {game, x, y, size}); 
        this.width = 32;
        this.height = 32;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/explosion.png"), 
		0, 0, this.width, this.height, 9, 0.1);
        this.removeFromWorldValue = 0;
        this.updateBB();
	};
	
	updateBB(){
		//width = 13, height = 6
		this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.width * this.size, this.height * this.size);
    };
	
	update() {
		var that = this;
		//Collision
		this.game.entities.forEach(function(entity){
			if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof Explosion)) { 
                // Add code here
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