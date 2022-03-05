class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        
        // Used for camera object.
        this.x = 0;

        this.score = 0;
        this.mainplayer = new Player(gameEngine, 20, 0);
        this.HUD = new HUD(gameEngine, this.mainplayer);
        this.starting = true;
        this.levelOne = false;
        this.levelTwo = false;   

        this.loadStartScreen();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            if (!(entity instanceof SceneManager)) {
                entity.removeFromWorld = true;
            }
        });
    };

    // This fixes the bug where sound would not play if the game is lost or won.
    clearEverything() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadStartScreen() {
        gameEngine.addEntity(new Startscreen(gameEngine));
    }

    loadLevelOne() {
        this.levelOne = true;
        gameEngine.addEntity(this.mainplayer);
        gameEngine.addEntity(this.HUD);

        gameEngine.addEntity(new Drone(gameEngine, 1850, 2, 3))
        gameEngine.addEntity(new Drone(gameEngine, 3000, 2, 3))
        gameEngine.addEntity(new Drone(gameEngine, 4500, 2, 3))
        gameEngine.addEntity(new Drone(gameEngine, 5500, 2, 3))
        gameEngine.addEntity(new pot(gameEngine, 7500, 250, 3))

        gameEngine.addEntity(new Sniper(gameEngine, 375, 0, 1));
        gameEngine.addEntity(new Sniper(gameEngine, 980, 383, 0));
        gameEngine.addEntity(new Sniper(gameEngine, 2200, 510, 0));
    
        gameEngine.addEntity(new Rocket(gameEngine, 500, 200, 0));

        gameEngine.addEntity(new RPG(gameEngine, 600, 70, 0));
        gameEngine.addEntity(new RPG(gameEngine, 1000, 70, 1));
        gameEngine.addEntity(new RPG(gameEngine, 2370, 198, 0));
    
        gameEngine.addEntity(new box(gameEngine,705,1,384,382,128,127, 1)); 
        gameEngine.addEntity(new box(gameEngine,705,1,0,446,128,127,.5));  
        gameEngine.addEntity(new box(gameEngine,705,1,320,446,128,127,.5)); 
        gameEngine.addEntity(new box(gameEngine,705,1,446,318,128,127,.5)); 
    
        gameEngine.addEntity(new boundingfloor(gameEngine,45,45,380,10)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,630,130,130,10));
        gameEngine.addEntity(new boundingfloor(gameEngine,820,130,250,10));
        gameEngine.addEntity(new boundingfloor(gameEngine,0,510,500,10)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,510,300,975,10));
        gameEngine.addEntity(new boundingfloor(gameEngine,1700,555,338,10));
        gameEngine.addEntity(new boundingfloor(gameEngine,2210,428,425,10));

        gameEngine.addEntity(new rope(gameEngine,245,416,550,0,12,95,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,550,0 + 190,12,20,2)); 

        gameEngine.addEntity(new rope(gameEngine,245,416,1620,270 - 190,12,95,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,1620,270,12,95,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,1620,270 + 190,12,50,2)); 

        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/harbor.png"), .665, 0));
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/harbor2.png"), .665, 1315 ));
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, -1315 )); 
       
        gameEngine.addEntity(new rope(gameEngine,245,416,2800,200,12,15,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,3300,600,12,15,2)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,3600,500,12,60,2)); 
        gameEngine.addEntity(new box(gameEngine,705,1,3700,380,128,127,0.5));   
        gameEngine.addEntity(new box(gameEngine,705,1,3695,355,128,127,0.20));   

        gameEngine.addEntity(new Sniper(gameEngine, 3670, 337, 0)); 

        gameEngine.addEntity(new BackgroundDynamic(gameEngine,128,768,68,320,4300,510,0.665));  
        gameEngine.addEntity(new Sniper(gameEngine, 4250, 468, 0)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,4300,510,45,10)); 

        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,130,320,4500,510,0.665));    
        gameEngine.addEntity(new boundingfloor(gameEngine,4500,510,85,10));   
        gameEngine.addEntity(new boundingfloor(gameEngine,4800,450,100,10));   
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,150,15,4800,450,0.665)); 
        
        gameEngine.addEntity(new boundingfloor(gameEngine,5000,530,100,10));  
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,150,15,5000,530,0.665)); 
        gameEngine.addEntity(new RPG(gameEngine, 5000, 300, 0));  
        
        gameEngine.addEntity(new boundingfloor(gameEngine,5020,360,50,10)); 
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,72,15,5020,360,0.665)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,5350,450,50,10));  
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,72,15,5350,450,0.665)); 
        gameEngine.addEntity(new boundingfloor(gameEngine,5650,290,50,10));    
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,72,15,5650,290,0.665)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,6050,160,12,30,2));  
        gameEngine.addEntity(new rope(gameEngine,245,416,6450,170,12,30,2)); 
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,130,320,5700,510,0.665));  
        gameEngine.addEntity(new boundingfloor(gameEngine,5700,510,85,10));
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,130,320,6050,510,0.665));   
        gameEngine.addEntity(new boundingfloor(gameEngine,6050,510,85,10));
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,100,768,130,320,6525,510,0.665));   
        gameEngine.addEntity(new boundingfloor(gameEngine,6525,510,85,10)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,6925,130,12,20,2));  
        gameEngine.addEntity(new BackgroundDynamic(gameEngine,768,448,450,700,7350,300,0.665));  
        gameEngine.addEntity(new boundingfloor(gameEngine,7350,300,300,10)); 
        gameEngine.addEntity(new rope(gameEngine,245,416,3850,500,12,60,2));  
        gameEngine.addEntity(new rope(gameEngine,245,416,3850,150,12,60,2));  

        gameEngine.addEntity(new BackgroundDynamic(gameEngine,768,448,450,700,3950,300,0.665)); 
     //   gameEngine.addEntity(new BackgroundDynamic(gameEngine,128,768,67,320,3700,510,0.665)); 

        gameEngine.addEntity(new crane(gameEngine,320,0,3700,420,63,127,1)); 
        gameEngine.addEntity(new crane(gameEngine,320,0,3700,548,63,90,1));

        gameEngine.addEntity(new boundingfloor(gameEngine,3950,300,300,10));
        gameEngine.addEntity(new boundingfloor(gameEngine,0,0,10,600));   

        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, 1315 * 2));
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, 1315 * 3));  
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, 1315 * 4)); 
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, 1315 * 5));
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, 1315 * 6));
        gameEngine.addEntity(new Background(gameEngine, 1984, 1088, ASSET_MANAGER.getAsset("./backgrounds/offmap.png"), .665, 1315 * 7));

        ASSET_MANAGER.playAsset("./sounds/background/DynamicFight_3.mp3")
    };

    loadLevelTwo() {
        this.levelOne = false;
        this.levelTwo = true;
        this.game.camera = this;
        this.currenthealth = 50;
        this.mainplayer = new Player(gameEngine, -200, 0);
        this.mainplayer.health = this.currenthealth;
        this.HUD = new HUD(gameEngine, this.mainplayer);
        gameEngine.addEntity(this.mainplayer)
        gameEngine.addEntity(this.HUD);

        gameEngine.addEntity(new golemboss(gameEngine, 250, 300, this.mainplayer))
        gameEngine.addEntity(new pot(gameEngine, 1485 * 2.4, 565, 3))

        // The starting and ending bounding walls
        gameEngine.addEntity(new boundingfloor(gameEngine,-610,0, 10, 1000));
        gameEngine.addEntity(new boundingfloor(gameEngine, 1485,0, 10, 1000));

        gameEngine.addEntity(new boundingfloor(gameEngine,-1485 * 2,610, 1485 * 5, 10));
        
        gameEngine.addEntity(new Background(gameEngine, 496, 272, ASSET_MANAGER.getAsset("./backgrounds/subway.png"), 3, -1485 * 2));
        gameEngine.addEntity(new Background(gameEngine, 496, 272, ASSET_MANAGER.getAsset("./backgrounds/subway.png"), 3, -1485));
        gameEngine.addEntity(new Background(gameEngine, 496, 272, ASSET_MANAGER.getAsset("./backgrounds/subway.png"), 3, 0));
        gameEngine.addEntity(new Background(gameEngine, 496, 272, ASSET_MANAGER.getAsset("./backgrounds/subway.png"), 3, 1485));
        gameEngine.addEntity(new Background(gameEngine, 496, 272, ASSET_MANAGER.getAsset("./backgrounds/subway.png"), 3, 1485 * 2));
    };

    gameLoss() {
        this.clearEntities();
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./sounds/game/Gameloss.mp3")
        gameEngine.addEntity(new Gameloss(gameEngine));
    };

    gameWon() {
        this.clearEntities();
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./sounds/game/Gamewin.wav")
        gameEngine.addEntity(new Gamewon(gameEngine));
    };

    updateAudio() {
        var volume = document.getElementById("volume").value;
        ASSET_MANAGER.adjustVolume(volume);
    }

    update() {
        this.updateAudio();
        if (this.game.keys["Enter"] && this.starting == true) {
            this.starting = false;
            this.loadLevelOne();
        } 
        if (this.mainplayer.health == 0 && this.mainplayer.elapsedDeathTime > 1.5) {
            this.clearEverything()
            this.gameLoss();
        } else if (this.mainplayer.gamewon == true && this.levelOne == true) {
            this.clearEntities();
            this.mainplayer.gamewon = false
            this.loadLevelTwo();
            // this.mainplayer.gamewon = false
        } else if (this.mainplayer.gamewon == true && this.levelTwo == true) {
            this.clearEverything()
            this.gameWon();
        }

        // Updates the debug option.
        // document.getElementById("debug").checked = true;
        params.debug = document.getElementById("debug").checked;
        
        // Updates the camera.
        let midpoint = params.canvas_width / 2;
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
        if (!(this.mainplayer.gamewon == true) && !(this.mainplayer.health == 0 && this.mainplayer.elapsedDeathTime > 1.5)) {
            ctx.font = "30px Arial";
            ctx.fillStyle = 'White';
            ctx.fillText("Health: " + this.mainplayer.health + "/" + this.mainplayer.totalHealth, 100, 35);
        }
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

class Gamewon {
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
        ctx.fillText("You won the game!", 640, 360);
    };
}

class Startscreen {
    constructor(game) {
        this.game = game;
        this.game.starting = true;
    };

    update() {
        if (this.game.keys["Enter"]) {
            this.game.starting = false;
        }
    };

    draw(ctx) {
        if (this.game.starting == true) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 9999, 9999);
            ctx.font = "50px Arial";
            ctx.fillStyle = 'White';
            ctx.textAlign = 'center';
            ctx.fillText("Press Enter to Start", 640, 360);
        }
    };
}
