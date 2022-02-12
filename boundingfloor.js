class boundingfloor { 
    constructor(game,x,y,width,height) { 
        Object.assign(this, { game, x, y, width, height }); 
        this.updateBB(); 
       // this.BB = new BoundingBox(0,510,1984,10); 
    };

    update() { 
        this.updateBB();
    };

    updateBB() { 
        this.BB = new BoundingBox(this.x - this.game.camera.x,this.y,this.width,this.height);
    };

    draw(ctx) {  
        if (params.debug) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
       // ctx.strokeRect(0,510,1984,20);
    };
}