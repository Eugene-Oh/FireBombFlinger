class ThunderArmor {
    constructor(game, spawnX, spawnY, direction, path) {
	
		Object.assign(this, { game, spawnX, spawnY, direction, path });
/*
        this.game = game;
        this.spawnX = spawnX;
        this.spawnY = spawnY;
        this.direction = direction; // Left = 0, Right = 1
*/

		this.state = 0;// 0 walking, 1 attacking, 2 dead

        this.animationspeed = 0.2;
        this.deathanimationspeed = .15;
        this.size = 2.10;

        this.health = 2;

        this.attackRate = 1;
        this.elapsedTime = .5;

        this.deathCounter = 0;
        this.deathMaxCounter = .7;
        this.removeFromWorldValue = 0;

		this.targetID = 0;
		
		if (this.path && this.path[this.targetID]) {
			this.target = this.path[this.targetID];
		}
		
		var dist = getDistance(this, this.target);
		this.maxSpeed = 500;
		
		this.velocity = { x: (this.target.x - this.spawnX) / dist * this.maxSpeed, y: (this.target.y - this.spawnY) / dist * this.maxSpeed };
		

        this.walkanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/thunderarmorwalk.png"), 
        0, 0, 47, 51, 5, this.animationspeed);
        this.walkreverseanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/thunderarmorwalkreverse.png"), 
        0, 0, 47, 51, 5, this.animationspeed);

		this.attackanimator = new Animator(ASSET_MANAGER.getAsset("./thunderarmorsprite/attack.png"), 
        0, 0, 49.5, 51, 4, this.animationspeed);

        this.updateBB();
    };

    updateBB() { 
        this.lastBB = this.BB;   
        if (this.direction == 1) {
            this.BB = new BoundingBox(this.spawnX + 20 - this.game.camera.x, this.spawnY + 4, 100, 120);
        } else {
            this.BB = new BoundingBox(this.spawnX + 20 - this.game.camera.x, this.spawnY + 6, 100, 120);
        }
    };

    update() {
		const TICK = this.game.clockTick;
		this.elapsedTime += this.game.clockTick;
		
		var dist = getDistance(this, this.target);
		
		if (this.health <= 0){
			this.remove;
		}
		
		if (this.target.removeFromWorldValue == 1) {
			this.state = 0;
		}
		
		if (dist < 5) {
			if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]){
				this.targetID++;
			}
			this.target = this.path[this.targetID];
		}
		
		var that = this;
			
		this.game.entities.forEach(function(entity) {
			if (entity.BB && that.BB.collide(entity.BB) && !(entity instanceof ThunderArmor)) {
				if (entity instanceof Player) {
					that.target = entity;
						
					if (that.state === 0) {
						that.sate = 1;
						that.elapsedTime = 0;
					} else if (that.elapsedTime > 0.8) {
						var damage = 7;
						entity.health -= damage;
						that.elapsedTime = 0;
					}
				}
			}
		});

		
		if (this.state !== 1) {
			dist = getDistance(this, this.target);
			this.velocity = { x: (this.target.x - this.spawnX) / dist * this.maxSpeed, y: (this.target.y - this.spawnY) / dist * this.maxSpeed };
			this.spawnX += this.velocity.x * this.game.clockTick;
			this.spawnY += this.velocity.y * this.game.clockTick;
			
		}
		
		if (this.removeFromWorldValue != 1) {
            this.updateBB();
        }

    };


    remove() {
        if (this.health == 0) {
            ASSET_MANAGER.playAsset("./sounds/enemies/Die.mp3")
            this.removeFromWorldValue = 1;
            this.BB = new BoundingBox(0, 0, 0, 0);
        } else {
            ASSET_MANAGER.playAsset("./sounds/enemies/Hurt.wav")
            this.health -= 1
        }
    };

    draw(ctx) {
        const TICK = this.game.clockTick
        // The enemy is walking back and forth
		if (this.state === 0) {
			switch (this.direction) {
				case 0:
					this.walkanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
					break;
				case 1:
					this.walkreverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
					break;

			}
		} else if (this.state === 1) {
			if (direction === 0) {
				this.attackanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
			}
		}


        
        // To see the bounding box
        if (params.debug) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}