namespace SpriteKind {
    export const collider = SpriteKind.create();
}

//  variables

let levelManager = new LevelLoader()

//  sprites
let cursor = sprites.create(image.create(2, 2));





function mouse_behaviour() {
    cursor.x = browserEvents.getMouseSceneX();
    cursor.y = browserEvents.getMouseSceneY();
}

function camera_movement() {
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

browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function place_platform(x: any, y: any) {
    if (tiles.tileAtLocationEquals(cursor.tilemapLocation(), assets.tile`empty`)) {
        tiles.setTileAt(cursor.tilemapLocation(), assets.tile`platform`);
        tiles.setWallAt(cursor.tilemapLocation(), true);
    } 
})

function minion_movement() {
    sprites.allOfKind(SpriteKind.Player).forEach((minion: Minion) => {
        minion.movement()
    })
}
    
game.onUpdate(function tick() {
    mouse_behaviour();
    camera_movement();
    minion_movement();
})
