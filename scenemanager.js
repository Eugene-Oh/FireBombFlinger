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

        // gameEngine.addEntity(new Explosion(gameEngine, 600, 140, 5));

        gameEngine.addEntity(new Sniper(gameEngine, 980, 383, 0));
        gameEngine.addEntity(new Sniper(gameEngine, 375, 0, 1));
    
        gameEngine.addEntity(new RPG(gameEngine, 1000, 70, 1));
        gameEngine.addEntity(new RPG(gameEngine, 605, 70, 0));
    
        gameEngine.addEntity(new box(gameEngine,705,1,384,382,128,127, 1)); 
        gameEngine.addEntity(new box(gameEngine,705,1,0,446,128,127,.5));  
        gameEngine.addEntity(new box(gameEngine,705,1,320,446,128,127,.5)); 
        gameEngine.addEntity(new box(gameEngine,705,1,446,318,128,127,.5)); 
        gameEngine.addEntity(new box(gameEngine,705,1,1100,350,128,127,.6)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,0,510,500,10)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,510,300,800,10));

        gameEngine.addEntity(new boundingfloor(gameEngine,1312,301,1000,10)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,250,280,12,95,2));   
           //portion 3 ropes and  final area 
         // first rope of of portion  3 
        gameEngine.addEntity(new rope(gameEngine,245,416,2500,280,12,95,2)); 

       
        gameEngine.addEntity(new rope(gameEngine,245,416,2800,200,12,15,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,3300,600,12,15,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,3600,500,12,60,2)); 
        gameEngine.addEntity(new box(gameEngine,705,1,3700,380,128,127,0.5));   
        gameEngine.addEntity(new box(gameEngine,705,1,3695,355,128,127,0.20));   
        gameEngine.addEntity(new Sniper(gameEngine, 3670, 337, 0)); 
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,128,768,100,320,4300,510,0.665));  
        gameEngine.addEntity(new Sniper(gameEngine, 4250, 470, 0)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,3850,500,12,60,2));  
        gameEngine.addEntity(new rope(gameEngine,245,416,3850,150,12,60,2));  
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,768,448,450,700,3950,300,0.665)); 
       // gameEngine.addEntity(new BackgroundDynamic(gameEngine,128,768,67,320,3700,510,0.665)); 
        gameEngine.addEntity(new crane(gameEngine,320,0,3700,420,63,127,1)); 
        gameEngine.addEntity(new crane(gameEngine,320,0,3700,548,63,90,1));
        gameEngine.addEntity(new boundingfloor(gameEngine,3950,300,300,10));
        gameEngine.addEntity(new boundingfloor(gameEngine,0,0,10,600));
        gameEngine.addEntity(new Background(gameEngine));   
        var c = 100;
        gameEngine.addEntity(new emptybackground(gameEngine,208,32,2500,115,175,175,2.5)); 
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,2500,542,31,63,3)); 
        gameEngine.addEntity(new emptybackground(gameEngine,112,0,2500,0,63,32,4));    

        //cityscape
        gameEngine.addEntity(new emptybackground(gameEngine,208,32,2500+c+300,115,175,175,2.5));     
        for( var j = 1; j<6; j++) { 
            gameEngine.addEntity(new emptybackground(gameEngine,208,32,2500+j*c+300*j,115,175,175,2.5)); 
        } 

        gameEngine.addEntity(new emptybackground(gameEngine,208,32,2500+2*c+300*2,115,175,175,2.5)); 
        //water  
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,2500+c-10,542,31,63,3)); 
        for(var i = 1; i< 30; i ++) {   
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,2500+i*c-10*i,542,31,63,3));   
        }
        // nightsky
        gameEngine.addEntity(new emptybackground(gameEngine,112,0,2500+c+150,0,63,32,4)); 
        for(var k = 1; k<10; k++) { 
            gameEngine.addEntity(new emptybackground(gameEngine,112,0,2500+k*c+150*k,0,63,32,4)); 
        } 

        // left part of the map so that it's not a blank screen
        gameEngine.addEntity(new emptybackground(gameEngine,208,32,-430,115,175,175,2.5)); 
        gameEngine.addEntity(new emptybackground(gameEngine,208,32,-660,115,175,175,2.5));  
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-90,542,31,63,3)); 
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-180,542,31,63,3));  
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-260,542,31,63,3));  
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-350,542,31,63,3)); 
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-440,542,31,63,3)); 
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-530,542,31,63,3)); 
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-620,542,31,63,3)); 
        gameEngine.addEntity(new emptybackground(gameEngine,160,208,-700,542,31,63,3));  

        gameEngine.addEntity(new emptybackground(gameEngine,112,0,-420,0,63,32,4)); 
        gameEngine.addEntity(new emptybackground(gameEngine,112,0,-220,0,63,32,4)); 
        gameEngine.addEntity(new emptybackground(gameEngine,112,0,-660,0,63,32,4));
        gameEngine.addEntity(new Background(gameEngine));
    };

    gameLoss() {
        this.clearEntities();
        gameEngine.addEntity(new Gameloss(gameEngine));
    };

    update() {
        // Checks for game loss.
        if (this.mainplayer.health == 0 && this.mainplayer.elapsedDeathTime > 1.5) {
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