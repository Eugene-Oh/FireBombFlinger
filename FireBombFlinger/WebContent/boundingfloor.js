class boundingfloor { 
    constructor(game,x,y,width,height) { 
        Object.assign(this, { game, x, y, width, height }); 
        this.BB = new BoundingBox(this.x,this.y,this.width,this.height); 
       // this.BB = new BoundingBox(0,510,1984,10); 
    };

    update() { 

    };

    updateBB() { 

    };

    draw(ctx) {  
        ctx.strokeRect(this.x,this.y,this.width,this.height);
       // ctx.strokeRect(0,510,1984,20);
    };
}