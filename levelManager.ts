class LevelLoader{

    levels: tiles.TileMapData[] = [
        assets.tilemap`level 1`,
        assets.tilemap`level 2`,
        assets.tilemap`level 3`,
        assets.tilemap`level 4`
    ];
    level: number = -1;
    escapedMinions: number = 0;
    waveSize: number = 14;
    spawningPhase: boolean = false;

    constructor() {
        this.nextLevel();
        this.intialiseReloadInput();
    }

    public nextLevel(): void {
        info.changeScoreBy(this.escapedMinions * 10);
        this.level += 1;
        this.resetLevel();
    }

    public resetLevel(): void {
        if (!this.spawningPhase) {
            this.clearPlatforms()
            this.escapedMinions = 0;
            sprites.destroyAllSpritesOfKind(SpriteKind.Player);
            tiles.setCurrentTilemap(this.levels[this.level]);
            music.beamUp.play();
            timer.background(() => {
                this.spawnMinions()
            })
        } 
    }

    private clearPlatforms(): void {
        for (let location of tiles.getTilesByType(assets.tile`platform`)) {
            tiles.setTileAt(location, assets.tile`empty`);
            tiles.setWallAt(location, false);
        }
    }

    private spawnMinions() {
        this.spawningPhase = true;
        pause(1250);
        for (let i = 0; i < this.waveSize; i++) {
            pause(750);
            let minion = new Minion;
            tiles.placeOnRandomTile(minion, assets.tile`spawn`);
        }
        music.powerUp.play();
        this.spawningPhase = false;
    }

    private intialiseReloadInput(): void{
        controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
            this.resetLevel()
        })
    }


}