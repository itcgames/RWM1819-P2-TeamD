class MainMenuScene
{
  constructor(){
    this.sceneEnded = false;
    this.backDrop = new Image();
    this.backDrop.src = "./src/resources/main_menu_backdrop.png";
  }

  update(dt){

  }

  draw(ctx){
    //Draw blue to the canvas
    ctx.fillStyle = "#3275e0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(this.backDrop, 412, 150);// Draw our backdrop
  }

}