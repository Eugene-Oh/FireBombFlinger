const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./tohrusprite/tohruwalk.png")
ASSET_MANAGER.queueDownload("./tohrusprite/tohruwalkreverse.png")
ASSET_MANAGER.queueDownload("./tohrusprite/tohrujump.png")
ASSET_MANAGER.queueDownload("./tohrusprite/tohruidle.png")
ASSET_MANAGER.queueDownload("./tohrusprite/tohruuppercut.png")
ASSET_MANAGER.queueDownload("./tohrusprite/tohrukick.png")
ASSET_MANAGER.queueDownload("./tohrusprite/tohrufaint.png")
ASSET_MANAGER.queueDownload("./backgrounds/subway_BG.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.addEntity(new Tohru(gameEngine));
	gameEngine.addEntity(new Background(gameEngine));


	gameEngine.init(ctx);

	gameEngine.start();
});
