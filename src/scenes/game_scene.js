class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(100, 100);

  }

  update(dt) {
    this.ball.applyForce(0,this.gravity);
    this.ball.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.ball.draw(ctx);
  }
}