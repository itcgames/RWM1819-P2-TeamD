class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(100, 100);
    this.block  = new Block(300,300);
    /** @type {Array<Level>} */
    this.levels = [];
    /** @type {Level} */
    this.currentLevel = null;
    Level.load(
      "./src/resources/levels.json",
      function (e, data) {
        /** @type {[]} */
        const allLevelsData = JSON.parse(data);
        allLevelsData.forEach(function (ele) { this.levels.push(new Level(ele)); }, this);
        if (this.levels.length > 0) { this.currentLevel = this.levels[0]; }
      }.bind(this),
      function (e) { console.error("Error in GameScene.constructor() -> level loading"); });
  }

  update(dt) {
    this.ball.applyForce(0,this.gravity);
    this.ball.update(dt);
    this.block.update(dt);
    if (this.currentLevel !== null) { this.currentLevel.update(dt, this.ball); }
  }

  draw(ctx) {
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.block.draw(ctx);
    this.ball.draw(ctx);
    if (this.currentLevel !== null) { this.currentLevel.draw(ctx); }
  }
}