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
ASSET_MANAGER.queueDownload("./playersprite/playerdeath.png")
ASSET_MANAGER.queueDownload("./playersprite/playerdeathreverse.png")


ASSET_MANAGER.queueDownload("./boss-sprite/boss-sleep.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-wake.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-idle.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-idle-reverse.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-shoot.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-shoot-reverse.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-death.png")
ASSET_MANAGER.queueDownload("./boss-sprite/boss-death-reverse.png")

ASSET_MANAGER.queueDownload("./snipersprite/sniperidle.png")
ASSET_MANAGER.queueDownload("./snipersprite/sniperidlereverse.png")
ASSET_MANAGER.queueDownload("./snipersprite/snipershooting.png")
ASSET_MANAGER.queueDownload("./snipersprite/snipershootingreverse.png")

ASSET_MANAGER.queueDownload("./rpgsprite/rpgidle.png")
ASSET_MANAGER.queueDownload("./rpgsprite/rpgidlereverse.png")
ASSET_MANAGER.queueDownload("./rpgsprite/rpgshooting.png")
ASSET_MANAGER.queueDownload("./rpgsprite/rpgshootingreverse.png")

ASSET_MANAGER.queueDownload("./dronesprite/drone.png")

ASSET_MANAGER.queueDownload("./enemydeath/enemydeath.png")
ASSET_MANAGER.queueDownload("./enemydeath/enemydeathreverse.png")

ASSET_MANAGER.queueDownload("./items-spritesheet/enemy-bullet.png")
ASSET_MANAGER.queueDownload("./items-spritesheet/player-bullet.png")
ASSET_MANAGER.queueDownload("./items-spritesheet/rocket.png")
ASSET_MANAGER.queueDownload("./items-spritesheet/explosion.png")
ASSET_MANAGER.queueDownload("./items-spritesheet/pot.png") 
ASSET_MANAGER.queueDownload("./items-spritesheet/variousbullets.png")
ASSET_MANAGER.queueDownload("./rope.png")

ASSET_MANAGER.queueDownload("./Harbor_Assets.png")

ASSET_MANAGER.queueDownload("./backgrounds/harbor.png")
ASSET_MANAGER.queueDownload("./backgrounds/harbor2.png")
ASSET_MANAGER.queueDownload("./backgrounds/offmap.png")
ASSET_MANAGER.queueDownload("./backgrounds/subway.png")

ASSET_MANAGER.queueDownload("./sounds/enemies/RocketExplosion.wav")
ASSET_MANAGER.queueDownload("./sounds/enemies/Snipershoot.mp3")
ASSET_MANAGER.queueDownload("./sounds/enemies/Die.mp3")
ASSET_MANAGER.queueDownload("./sounds/enemies/Hurt.wav")

ASSET_MANAGER.queueDownload("./sounds/player/Jump.wav")
ASSET_MANAGER.queueDownload("./sounds/player/Shoot.wav")
ASSET_MANAGER.queueDownload("./sounds/player/Hurt.wav")
ASSET_MANAGER.queueDownload("./sounds/player/Walk.wav")

ASSET_MANAGER.queueDownload("./sounds/background/DynamicFight_3.mp3")

ASSET_MANAGER.queueDownload("./sounds/game/Gameloss.mp3")
ASSET_MANAGER.queueDownload("./sounds/game/Gamewin.wav")

ASSET_MANAGER.queueDownload("./harborLevel2.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	canvas.onselectstart = function () { return false; }
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	scene = new SceneManager(gameEngine);

    ASSET_MANAGER.autoRepeat("./sounds/background/DynamicFight_3.mp3")

	gameEngine.addEntity(scene);
	gameEngine.init(ctx);
	gameEngine.start();
});
