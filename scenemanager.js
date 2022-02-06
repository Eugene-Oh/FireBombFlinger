class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.score = 0;
        this.mainplayer = new Player(gameEngine);
        this.HUD = new HUD(gameEngine, this.mainplayer);

        this.loadLevelOne();
    };

    clearEntities() {
        this.game.entities= [];
    };

    loadLevelOne() {
        gameEngine.addEntity(this.mainplayer);
        gameEngine.addEntity(this.HUD);
        gameEngine.addEntity(new Sniper(gameEngine, 980, 383, 0));
        gameEngine.addEntity(new Sniper(gameEngine, 375, 0, 1));
    
        gameEngine.addEntity(new RPG(gameEngine, 1000, 70, 1));
        gameEngine.addEntity(new RPG(gameEngine, 605, 70, 0));
    
        gameEngine.addEntity(new box(gameEngine,705,1,384,382,128,127, 1)); 
        gameEngine.addEntity(new box(gameEngine,705,1,0,446,128,127,.5));  
        gameEngine.addEntity(new box(gameEngine,705,1,320,446,128,127,.5)); 
        gameEngine.addEntity(new box(gameEngine,705,1,446,318,128,127,.5)); 
    
        gameEngine.addEntity(new boundingfloor(gameEngine,0,510,500,10)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,510,300,800,10));
    
        gameEngine.addEntity(new Background(gameEngine));
    };

    gameLoss() {
        this.clearEntities();
        gameEngine.addEntity(new Gameloss(gameEngine));
    };

    update() {
        // Checks for game loss.
        if (this.mainplayer.health <= 0) {
            this.gameLoss();
        }

        // Updates the debug option.
        params.debug = document.getElementById("debug").checked;
        
        // Updates the camera.
        let midpoint = params.canvas_width / 2;
        // if (this.x < this.mainplayer.x - midpoint) {
        //     this.x = this.mainplayer.x - midpoint;
        // };
        this.x = this.mainplayer.x - midpoint;
    
    };

    draw(ctx) {
        this.HUD.draw(ctx);
    };
}

class HUD {
    constructor(game, mainplayer) {
        this.game = game;
        this.mainplayer = mainplayer;
    };

    update() {
    };

    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = 'White';
        ctx.fillText("Health: " + this.mainplayer.health + "/" + this.mainplayer.totalHealth, 50, 35);
    };
}

class Gameloss {
    constructor(game) {
        this.game = game;
    };

    update() {
    };

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 9999, 9999);
        ctx.font = "50px Arial";
        ctx.fillStyle = 'White';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over", 640, 360);
    };
}