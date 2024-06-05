class EventHandlerManager {

    // am i gonna need to pass the level manager in for the on destroy func
    constructor() {
        this.initialiseWallOverlaps();
        this.initialOnDestroy();
    }

    private initialiseWallOverlaps(): void { 
        scene.onOverlapTile(SpriteKind.Player, assets.tile`end`, (minion: Sprite, location: tiles.Location) => {
            escaped_minions += 1;
            minion.destroy();
        })

        scene.onOverlapTile(SpriteKind.Player, assets.tile`spike`,(minion: Sprite, location: tiles.Location) => {
            minion.destroy();
        })
    }

    private initialOnDestroy(): void{
        sprites.onDestroyed(SpriteKind.Player, () => {
            if (sprites.allOfKind(SpriteKind.Player).length < 1) {
                if (escaped_minions > 3) {
                    if (level > levels.length - 1) {
                        game.over(true);
                    } else {
                        next_level();
                    }
                } else {
                    reset_level();
                }
            }
        })
    }
}