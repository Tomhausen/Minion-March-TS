class MouseManager{

    cursor: Sprite;

    constructor(cursor: Sprite) {
        this.cursor = cursor;
        this.initialiseMouseClick();
    }

    public cursorPositioning() {
        this.cursor.x = browserEvents.getMouseSceneX();
        this.cursor.y = browserEvents.getMouseSceneY();
    }
    
    public cameraMovement() {
        let camera_x = scene.cameraProperty(CameraProperty.X);
        let camera_y = scene.cameraProperty(CameraProperty.Y);
        if (browserEvents.getMouseCameraX() < 15) {
            scene.centerCameraAt(camera_x - 1, camera_y);
        } else if (browserEvents.getMouseCameraX() > 145) {
            scene.centerCameraAt(camera_x + 1, camera_y);
        }
        
        if (browserEvents.getMouseCameraY() < 15) {
            scene.centerCameraAt(camera_x, camera_y - 1);
        } else if (browserEvents.getMouseCameraY() > 105) {
            scene.centerCameraAt(camera_x, camera_y + 1);
        }
    }
    
    private initialiseMouseClick(): void {
        browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function place_platform(x: any, y: any) {
            if (tiles.tileAtLocationEquals(this.cursor.tilemapLocation(), assets.tile`empty`)) {
                tiles.setTileAt(this.cursor.tilemapLocation(), assets.tile`platform`);
                tiles.setWallAt(this.cursor.tilemapLocation(), true);
            }
        })
    }


}