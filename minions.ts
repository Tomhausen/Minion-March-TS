class Minion extends ExtendableSprite{

    speed: number = 20;
    gravityStrenght: number = 120;
    walkRightAnim: assets.animation = assets.animation`walk right`
    walkLeftAnim: assets.animation = assets.animation`walk left`


    constructor() {
        super(assets.image`minion`, SpriteKind.Player);
        this.setupMovement();
    }

    private setupMovement(): void {
        this.vx = this.speed;
        this.ay = this.gravityStrenght;
        characterAnimations.loopFrames(this, this.walkRightAnim, 100, Predicate.MovingRight);
        characterAnimations.loopFrames(this, this.walkLeftAnim, 100, Predicate.MovingLeft);
    }

    public movement(): void {
        if (this.isHittingTile(CollisionDirection.Left)) {
            this.vx = this.speed;
        } else if (this.isHittingTile(CollisionDirection.Right)) {
            this.vx = this.speed * -1;
        }
    }

}