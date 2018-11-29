class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(100, 100);
    this.block  = new Block(300,300);
    this.floorBlock = new FloorBlock(900, 300);
    this.zBlock = new Zblock(900, 600);

  }

  update(dt) {
    this.ball.applyForce(0,this.gravity);
    this.ball.update(dt);
    this.block.update(dt);
    this.floorBlock.update(dt);
    this.zBlock.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.block.draw(ctx);
    this.floorBlock.draw(ctx);
    this.zBlock.draw(ctx);
    this.ball.draw(ctx);
  }
}