class GameScene
{
  constructor(){
    this.sceneEnded = false;
  }

  update(ctx){

  }

  draw(ctx){
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}