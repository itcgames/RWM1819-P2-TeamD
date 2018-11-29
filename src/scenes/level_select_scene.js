class LevelSelectScene
{
  constructor(){
    this.sceneEnded = false;
    this.sceneBg = new Image();
    this.sceneBg.src = "./src/resources/gui/level_select_backdrop.png";

    //Create our buttons for selecting a level
    this.level1Btn = new LevelButton(692, 380, {x: 0, y: 0, w: 130, h: 130});
    this.level2Btn = new LevelButton(960, 380, {x: 130, y: 0, w: 130, h: 130});
    this.level3Btn = new LevelButton(1252, 380, {x: 260, y: 0, w: 130, h: 130});
    this.level4Btn = new LevelButton(692, 640, {x: 390, y: 0, w: 130, h: 130});
    this.level5Btn = new LevelButton(960, 640, {x: 520, y: 0, w: 130, h: 130});
    this.level6Btn = new LevelButton(1252, 640, {x: 650, y: 0, w: 130, h: 130});

    this.btns = [this.level1Btn, this.level2Btn, this.level3Btn,
      this.level4Btn, this.level5Btn, this.level6Btn];
  }

  update(dt){

  }

  checkButtonClick(){
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
    ctx.fillStyle = "#33e0c6";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(this.sceneBg, 412, 150);

    //Draw our buttons
    for(let btn of this.btns){
      btn.draw(ctx);
    }
  }
}