class MainMenuScene
{
  constructor(){
    this.sceneEnded = false;
    this.backDrop = new Image();
    this.backDrop.src = "./src/resources/main_menu_backdrop.png";

    this.levelSelectBtn = new MenuButton(960, 354, "Level Select");
    this.scoreboardBtn = new MenuButton(960, 562, "Scoreboard");
    this.exitGameBtn = new MenuButton(960, 770, "Exit Game");
  }

  update(dt){

  }

  draw(ctx){
    //Draw blue to the canvas
    ctx.fillStyle = "#3275e0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw our backdrop
    ctx.drawImage(this.backDrop, 412, 150);

    //Draw our buttons
    this.levelSelectBtn.draw(ctx);
    this.scoreboardBtn.draw(ctx);
    this.exitGameBtn.draw(ctx);
  }

}