class ScoreboardScene {
  constructor() {
    this.sceneEnded = false;
    this.scoreboard = new ScoreboardManager();
    this.scores = [];
    this.backDrop = new Image();
    this.backDrop.src = "./src/resources/gui/scoreboard_backdrop.png";
    this.scoreboard.initBoard("session");

    this.returnBtn = new MenuButton(960, 800, "Main Menu", "this.mManager.fadeTo('Main Menu')");

    this.boards = {"1":[], "2":[], "3":[], "4":[], "5":[], "6":[]};
    this.highest = {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0};
    this.boardIndex = ["1", "2", "3", "4", "5", "6"];
  }

  openScoreboard() {
    this.boards = {"1":[], "2":[], "3":[], "4":[], "5":[], "6":[]};
    this.highest = {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0};

    this.scoreboard.initBoard("session");

    var board = this.scoreboard.getBoard();
    for (var i in board) {
        this.boards[board[i].name].push(board[i]);
    }

    for(var i in this.boardIndex){
      for(let b of this.boards[this.boardIndex[i]]){
        if(b.score > this.highest[this.boardIndex[i]]){
          this.highest[this.boardIndex[i]] = b.score;
        }
      } 
    }

  }

  update(dt) {

  }

  checkButtonClick(e)
  {
    //Loop through our buttons
      if(this.returnBtn.mouseClicked()){ //If the button was clicked
        return this.returnBtn.action; //Return the button action
    }
    //return an empty string
    return "";
  }

  draw(ctx) {
    ctx.font = "42px Berlin Sans";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
     
    ctx.drawImage(this.backDrop, 412, 150);
    for (var i in this.highest)
    {
      this.text = new Text(this.highest[i]);
      ctx.fillText(this.text.data, 352 + (175 * i), 580);
    }

    this.returnBtn.draw(ctx);
  }

}