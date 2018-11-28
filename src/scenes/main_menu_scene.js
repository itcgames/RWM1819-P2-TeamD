class MainMenuScene
{
  constructor(){
    this.sceneEnded = false;
    this.backDrop = new Image();
    this.backDrop.src = "./src/resources/main_menu_backdrop.png";

    this.levelSelectBtn = new MenuButton(960, 354, "Level Select", "this.mManager.setCurrentScene('Game')");
    this.scoreboardBtn = new MenuButton(960, 562, "Scoreboard", "this.mManager.setCurrentScene('Scoreboard')");
    this.exitGameBtn = new MenuButton(960, 770, "Exit Game", "");

    //Add our buttons for easy looping
    this.btns = [this.levelSelectBtn, this.scoreboardBtn, this.exitGameBtn];
  }
 
  update(dt){

  }

  checkButtonClick()
  {
    //Loop through our buttons
    for(let btn of this.btns){
      if(btn.mouseClicked()){ //If the button was clicked
        return btn.action; //Return the button action
      }
    }

    //return an empty string
    return "";
  }

  draw(ctx){
    //Draw blue to the canvas
    ctx.fillStyle = "#3275e0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw our backdrop
    ctx.drawImage(this.backDrop, 412, 150);

    //Draw our buttons
    for(let btn of this.btns){
      btn.draw(ctx);
    }
  }

}