class SplashScene
{
  constructor(){
    this.sceneEnded = false;
  }

  update(dt){

  }

  draw(ctx){
    ctx.fillStyle = "#f4f142";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

}