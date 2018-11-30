class ScoreboardScene {
  constructor() {
    this.sceneEnded = false;
    this.scoreboard = new ScoreboardManager();

    this.backDrop = new Image();
    this.backDrop.src = "./src/resources/gui/scoreboard_backdrop.png";
    this.scoreboard.initBoard("session");
  }

  openScoreboard() {
    this.scoreboard.initBoard("session");

  }

  update(dt) {

    var board = this.scoreboard.getBoard();
    for (var i in board) {
      var lines = board.map(a => a.name == 1);
      var highest = 0;

    }
  }

  draw(ctx) {
    ctx.fillStyle = "#bd32e0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(this.backDrop, 412, 150);
  }

}