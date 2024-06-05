class Mouse extends sprites.ExtendableSprite{

    constructor() {
        super(image.create(2, 2), SpriteKind.mouse)
        this.initialiseMouseClick();
    }

    public cursorPositioning(): void {
        this.x = browserEvents.getMouseSceneX();
        this.y = browserEvents.getMouseSceneY();
    }
    
    public cameraMovement(): void {
        let cameraX = scene.cameraProperty(CameraProperty.X);
        let cameraY = scene.cameraProperty(CameraProperty.Y);
        if (browserEvents.getMouseCameraX() < 15) {
            scene.centerCameraAt(cameraX - 1, cameraY);
        } else if (browserEvents.getMouseCameraX() > 145) {
            scene.centerCameraAt(cameraX + 1, cameraY);
        }
        
        if (browserEvents.getMouseCameraY() < 15) {
            scene.centerCameraAt(cameraX, cameraY - 1);
        } else if (browserEvents.getMouseCameraY() > 105) {
            scene.centerCameraAt(cameraX, cameraY + 1);
        }
    }
    
    private initialiseMouseClick(): void {
        browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, (x: any, y: any) => {
            if (tiles.tileAtLocationEquals(this.tilemapLocation(), assets.tile`empty`)) {
                tiles.setTileAt(this.tilemapLocation(), assets.tile`platform`);
                tiles.setWallAt(this.tilemapLocation(), true);
            }
        })
    }


}