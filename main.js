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

ASSET_MANAGER.queueDownload("./backgrounds/subway_BG.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.addEntity(new Player(gameEngine));
	gameEngine.addEntity(new Background(gameEngine));


	gameEngine.init(ctx);

	gameEngine.start();
});
