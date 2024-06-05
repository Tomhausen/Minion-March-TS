namespace SpriteKind {
    export const collider = SpriteKind.create();
    export const mouse = SpriteKind.create();
}

class GameManager{

    mouse: Mouse;

    constructor() {
        this.mouse = new Mouse();
        new EventHandlerManager(new LevelLoader());
        this.setupGameLoops()
    }

    private minionMovement(): void {
        sprites.allOfKind(SpriteKind.Player).forEach((minion: Minion) => {
            minion.movement()
        })
    }
    
    private setupGameLoops(): void {
        game.onUpdate( () => {
            mouse.cursorPositioning();
            mouse.cameraMovement();
            this.minionMovement();
        })
    }
}