namespace SpriteKind {
    export const collider = SpriteKind.create();
}

class GameManager{

    levelLoader: LevelLoader;
    mouseManager: MouseManager;

    constructor() {
        let cursor = sprites.create(image.create(2, 2));
        this.levelLoader = new LevelLoader();
        this.mouseManager = new MouseManager(cursor);
        new EventHandlerManager(this.levelLoader);
        this.setupGameLoops()
    }

    private minionMovement() {
        sprites.allOfKind(SpriteKind.Player).forEach((minion: Minion) => {
            minion.movement()
        })
    }
    
    private setupGameLoops() {
        game.onUpdate( () => {
            this.mouseManager.cursorPositioning();
            this.mouseManager.cameraMovement();
            this.minionMovement();
        })
    }

}