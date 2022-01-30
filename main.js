const gameEngine = new GameEngine();

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

ASSET_MANAGER.queueDownload("./items-spritesheet/bullet-sprite.png")

ASSET_MANAGER.queueDownload("./Harbor_Assets.png")

ASSET_MANAGER.queueDownload("./backgrounds/harbor.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.addEntity(new Player(gameEngine));

	gameEngine.addEntity(new Sniper(gameEngine, 980, 383, 0));
	gameEngine.addEntity(new Sniper(gameEngine, 375, 0, 1));

    gameEngine.addEntity(new RPG(gameEngine, 1000, 70, 1));
    gameEngine.addEntity(new RPG(gameEngine, 605, 70, 0));

	gameEngine.addEntity(new box(gameEngine,705,1,384,382,128,127, 1)); 
    gameEngine.addEntity(new box(gameEngine,705,1,0,446,128,127,.5));  
	gameEngine.addEntity(new box(gameEngine,705,1,320,446,128,127,.5)); 
    gameEngine.addEntity(new box(gameEngine,705,1,446,318,128,127,.5)); 

	gameEngine.addEntity(new boundingfloor(gameEngine,0,510,500,10)); 
	gameEngine.addEntity(new boundingfloor(gameEngine,510,300,1984,10));

	gameEngine.addEntity(new Background(gameEngine));

	//	gameEngine.addEntity(new boundingfloor(gameEngine));
	//	gameEngine.addEntity(new box(gameEngine,100,150,832,896,128,128));

	gameEngine.init(ctx);

	gameEngine.start();
});
