class SplashScene
{
  constructor(){
    this.sceneEnded = false;
  }

  update(ctx){

  }

  draw(ctx){
    ctx.fillStyle = "#f4f142";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

}