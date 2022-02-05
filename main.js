const game = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./playersprite/run.png")
ASSET_MANAGER.queueDownload("./playersprite/runreverse.png")
ASSET_MANAGER.queueDownload("./playersprite/runshooting.png")
ASSET_MANAGER.queueDownload("./playersprite/runshootingreverse.png")
ASSET_MANAGER.queueDownload("./playersprite/jump.png")
ASSET_MANAGER.queueDownload("./playersprite/jumpreverse.png")
ASSET_MANAGER.queueDownload("./playersprite/jumpshooting.png")
ASSET_MANAGER.queueDownload("./playersprite/jumpshootingreverse.png")
ASSET_MANAGER.queueDownload("./playersprite/crouched.png")
ASSET_MANAGER.queueDownload("./playersprite/crouchedreverse.png")
ASSET_MANAGER.queueDownload("./playersprite/crouchedshooting.png")
ASSET_MANAGER.queueDownload("./playersprite/crouchedshootingreverse.png")
ASSET_MANAGER.queueDownload("./playersprite/idle.png")
ASSET_MANAGER.queueDownload("./playersprite/idlereverse.png")
ASSET_MANAGER.queueDownload("./playersprite/idleshoot.png")
ASSET_MANAGER.queueDownload("./playersprite/idleshootreverse.png")

ASSET_MANAGER.queueDownload("./snipersprite/snipershooting.png")
ASSET_MANAGER.queueDownload("./snipersprite/snipershootingreverse.png")

ASSET_MANAGER.queueDownload("./rpgsprite/rpgshooting.png")
ASSET_MANAGER.queueDownload("./rpgsprite/rpgshootingreverse.png")

ASSET_MANAGER.queueDownload("./Harbor_Assets.png")

ASSET_MANAGER.queueDownload("./backgrounds/harbor.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false; 

	/*
	game.addEntity(new Player(game));

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

	game.addEntity(new Background(game)); */ 
	var sm = new sceneManager(game);
	
	//	gameEngine.addEntity(new boundingfloor(gameEngine));
	//	gameEngine.addEntity(new box(gameEngine,100,150,832,896,128,128));

	game.init(ctx);

	game.start();
});
