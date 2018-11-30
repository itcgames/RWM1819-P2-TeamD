class MainMenuScene
{
  constructor(){
    this.sceneEnded = false;
    this.backDrop = new Image();
    this.backDrop.src = "./src/resources/gui/main_menu_backdrop.png";

    this.levelSelectBtn = new MenuButton(960, 354, "Level Select", "this.mManager.fadeTo('Level Select')");
    this.scoreboardBtn = new MenuButton(960, 562, "Scoreboard", "this.mManager.fadeTo('Scoreboard')");
    this.exitGameBtn = new MenuButton(960, 770, "Exit Game", "");

    //Add our buttons for easy looping
    this.btns = [this.levelSelectBtn, this.scoreboardBtn, this.exitGameBtn];
  }
 
  update(dt){

  }

  checkButtonClick(e)
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

    // Draw our backdrop
    ctx.drawImage(this.backDrop, 412, 150);

    //Draw our buttons
    for(let btn of this.btns){
      btn.draw(ctx);
    }
  }

}