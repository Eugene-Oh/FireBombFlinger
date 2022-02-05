class sceneManager { 
    
    constructor(game) {   
        this.game = game;
        //Object.assign(this,{game});
        this.game.camera = this; 
        this.x = 0;  
        this.y = 0;
        this.hp = 100;  
        this.player = new Player(this.game);
        this.loadlevel();
    };  
     
    loadlevel() { 
        
    this.game.addEntity(this.player);
	/*this.game.addEntity(new Sniper(this.game, 980, 383, 0));
	this.game.addEntity(new Sniper(this.game, 375, 0, 1));
	this.game.addEntity(new box(this.game,705,1,400,380,128,127));  
	this.game.addEntity(new box(this.game,705,1,300,450,50,50)); 
	this.game.addEntity(new boundingfloor(this.game,0,510,1984,10)); 
	this.game.addEntity(new boundingfloor(this.game,510,300,1984,10));
	this.game.addEntity(new Background(this.game)); */ 
    game.addEntity(new Sniper(game, 980, 383, 0));
	game.addEntity(new Sniper(game, 375, 0, 1));

    game.addEntity(new RPG(game, 1000, 70, 1));
    game.addEntity(new RPG(game, 605, 70, 0));

	game.addEntity(new box(game,705,1,384,382,128,127, 1)); 
    game.addEntity(new box(game,705,1,0,446,128,127,.5));  
	game.addEntity(new box(game,705,1,320,446,128,127,.5)); 
    game.addEntity(new box(game,705,1,446,318,128,127,.5)); 

	game.addEntity(new boundingfloor(game,0,510,500,10)); 
	game.addEntity(new boundingfloor(game,510,300,1984,10));

	game.addEntity(new Background(game));
    }; 
    
    update() { 
        let midpointX = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH/2;  

        this.x = this.player.x -midpointX; 

    } 


    
    draw(ctx) { 

    } 




};