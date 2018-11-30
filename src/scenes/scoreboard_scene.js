class ScoreboardScene
{
  constructor(){
    this.sceneEnded = false;
    this.scoreboard = new ScoreboardManager();
    this.scoreboard.initBoard("session");
  }

  update(dt){
  }

  draw(ctx){
    ctx.fillStyle = "#bd32e0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

}