class EventHandlerManager {

    levelLoader: LevelLoader;

    constructor(levelLoader: LevelLoader): void {
        this.initialiseWallOverlaps();
        this.initialOnDestroy();
        this.levelLoader = levelLoader;
    }

    private initialiseWallOverlaps(): void { 
        scene.onOverlapTile(SpriteKind.Player, assets.tile`end`, (minion: Sprite, location: tiles.Location) => {
            this.levelLoader.minionEscapes();
            minion.destroy();
        })

        scene.onOverlapTile(SpriteKind.Player, assets.tile`spike`,(minion: Sprite, location: tiles.Location) => {
            minion.destroy();
        })
    }

    private initialOnDestroy(): void{
        sprites.onDestroyed(SpriteKind.Player, () => {
            if (sprites.allOfKind(SpriteKind.Player).length < 1) {
                this.levelLoader.minionDestroyed();
            }
        })
    }
}