class lazerPickup { 
    constructor(game,xStart,yStart,x,y, width, height, size) {    
        Object.assign(this, {game,xStart,yStart,x,y,width,height,size}); 
    //    this.animator = new Animator(ASSET_MANAGER.getAsset("./Harbor_Assets.png"), 
      //  this.xStart,this.yStart,width,height,1,1);
    // this.spritesheet = ASSET_MANAGER.getAsset("./Harbor_Assets.png");  
        this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/variousbullets.png"),7,37,17,20,1,1); 
        this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/variousbullets.png"),xStart,yStart,width,height,1,1); 
        this.removeFromWorldValue = 0;
        this.updateBB(); 
        this.beans = true;
    };

    update() { 
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,this.width * this.size,this.height * this.size);
    };

    draw(ctx) { 
      //  this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);   
        //   ctx.drawImage(this.spritesheet,this.xStart,this.yStart,this.width,this.height,this.x,this.y,this.width*this.size,this.height*this.size);  \       
         this.update();
         this.animator.drawFrame(this.game.clockTick,ctx,this.BB.x,this.BB.y,2); 
        if (params.debug) {
            ctx.strokeStyle = 'red';     
         //   ctx.rotate(Math.PI/2); 
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);  
        //    this.animator.drawFrame(this.game.clockTick,ctx,this.BB.x,this.BB.y,2); 
           // ctx.save();    
            //ctx.translate(this.x,this.y);
          //  ctx.rotate(Math.PI/4);  
           // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);  
           // ctx.rotate(Math.PI/4);  
        
         //   ctx.rotate(11*Math.PI/6); 
          // ctx.restore();
        }
    };  
    remove() {
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
        this.x = -999;
        this.y = -999;
    };
    
  

    
} 


class lazer { 
    constructor(game) { 
        Object.assign(this,{game}); 
        this.updateBB(); 
    } 
    update() {  
        var that = this;   
        this.updateBB(); 
        this.game.entities.forEach(function(entity){ 
            if(entity.BB && that.BB.collide(entity.BB) &&((entity instanceof Sniper)|| (entity instanceof RPG))) { 
                entity.health -=0.25/that.game.clockTick; 
                console.log("hit)"); 
                entity.remove();
            }
        that.updateBB(); 
        });
    } 
    updateBB() { 
        this.BB = new BoundingBox(this.game.mouse.x,this.game.mouse.y, 10,10); 


    } 
    draw(ctx)  {
        ctx.strokeStyle = 'red';  

        ctx.strokeRect(this.BB.x,this.BB.y,this.BB.width,this.BB.height);
    } 
   
    
}


class rocketPickup { 
    constructor(game,xStart,yStart,x,y, width, height, size) {    
        Object.assign(this, {game,xStart,yStart,x,y,width,height,size}); 
       // this.animator = new Animator(ASSET_MANAGER.getAsset("./Harbor_Assets.png"), 
       // this.xStart,this.yStart,width,height,1,1);
    // this.spritesheet = ASSET_MANAGER.getAsset("./Harbor_Assets.png");  \
   // this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/.png"),xStart,yStart,width,height,1,1);  
    this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/rocket.png"), 
		0, 0, this.width, this.height, 1, 0.2);
        this.updateBB();
    };

    update() { 
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,this.width * this.size,this.height * this.size);
    };

    draw(ctx) { 
      //  this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);   
        //   ctx.drawImage(this.spritesheet,this.xStart,this.yStart,this.width,this.height,this.x,this.y,this.width*this.size,this.height*this.size);  
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
        if (params.debug) {
            ctx.strokeStyle = 'red';    
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }; 


    remove() {
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
        this.x = -999;
        this.y = -999;
    };
} 

class explosiveBulletPickup { 
    constructor(game,xStart,yStart,x,y, width, height, size) {    
        Object.assign(this, {game,xStart,yStart,x,y,width,height,size}); 
       // this.animator = new Animator(ASSET_MANAGER.getAsset("./Harbor_Assets.png"), 
       // this.xStart,this.yStart,width,height,1,1);
    // this.spritesheet = ASSET_MANAGER.getAsset("./Harbor_Assets.png");  \
   // this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/.png"),xStart,yStart,width,height,1,1);  
   this.animator = new Animator(ASSET_MANAGER.getAsset("./items-spritesheet/variousbullets.png"),xStart,yStart,width,height,1,1); 
        this.updateBB();
    };

    update() { 
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,this.width * this.size,this.height * this.size);
    };

    draw(ctx) { 
      //  this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);   
        //   ctx.drawImage(this.spritesheet,this.xStart,this.yStart,this.width,this.height,this.x,this.y,this.width*this.size,this.height*this.size);  
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
        if (params.debug) {
            ctx.strokeStyle = 'red';    
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }; 


    remove() {
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
        this.x = -999;
        this.y = -999;
    };
}

