class ScoreboardScene
{
  constructor(){
    this.sceneEnded = false;
  }

  update(dt){

  }

  draw(ctx){
    ctx.fillStyle = "#bd32e0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

}