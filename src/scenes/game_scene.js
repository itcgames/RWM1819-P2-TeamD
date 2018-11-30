class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(250, 275);
    this.springImage = new Image();
    //this.spring = new Spring(50, 300, this.springImage);
    var that = this;
    
    this.keyboard = new Keyboard();
    this.block  = new Block(300,300);
    this.floorBlock = new FloorBlock(900, 300);
    this.zBlock = new Zblock(900, 600);
    
    /** @type {Array<Level>} */
    this.levels = [];
    /** @type {Level} */
    this.currentLevel = null;
    Level.load(
      "./src/resources/levels.json",
      function (e, data) {
        /** @type {[]} */
        const allLevelsData = JSON.parse(data);
        allLevelsData.forEach(function (ele) { this.levels.push(new Level(ele)); }, this);
        if (this.levels.length > 0) { 
          this.currentLevel = this.levels[0];
           //Set the levelData
          this.ui.setUi(this.currentLevel.availableBlocks); }
      }.bind(this),
      function (e) { console.error("Error in GameScene.constructor() -> level loading"); });

    //The ui bar
    this.ui = new UI();
    //Keep a reference to the items spawned by the UI/Drag and drop
    this.items = this.ui.items;
    //The toolbar object
    this.toolBar = new toolbar();

    //Bind events for the click, for the oolbar
    window.addEventListener("click", this.checkToolbarClick.bind(this));
  }

  /**
   * will update all the game scene logic
   * @param {number} dt 
   * time since last update in ms
   */
  update(dt) {

    for(var i in this.items){
      if(this.items[i] instanceof Spring){
        if (collisionManager.boolCircleToCircle(this.items[i].collisionCircle, this.ball.collisionCircle)) {
          if (this.items[i].angle === 0) {
            this.ball.impulse(0,-10);
	          this.ball.position.y -= this.ball.radius;
          }
          else if(this.items[i].angle === 90){
            this.ball.impulse(10,0);
            this.ball.position.x += this.ball.radius;
          }
          else if(this.items[i].angle === 180){
            this.ball.impulse(0,10);
            this.ball.position.y += this.ball.radius;
          }
          else{
            this.ball.impulse(-10,0);
            this.ball.position.x -= this.ball.radius;
          }
          this.items[i].bounce();
        }
      }
      //we should be updating all items here, regardless of what they are
      this.items[i].update(dt);
    }
    
    this.ball.update(dt);
    this.block.update(dt);
    if (this.currentLevel !== null) { this.currentLevel.update(dt, this.ball); }
    

    this.floorBlock.update(dt);
    this.zBlock.update(dt);

    //Update UI
    this.ui.update(dt);
  }

  checkToolbarClick(e)
  {
    let returned = this.toolBar.checkButton(e);

    if(returned === "trash")
    {
      console.log("Trash");
    }

    if(returned === "delete")
    {
      console.log("delete");
    }

    if(returned === "exit")
    {
      console.log("exit")
    }

    if(returned === "restart")
    {
      console.log("restart");
    }

  }

  /**
   * will draw all the game scene elements
   * @param {CanvasRenderingContext2D} ctx 
   * canvas we want to draw to
   */
  draw(ctx) {
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for(var i in this.items){
      this.items[i].draw(ctx);
    }

    this.ball.draw(ctx);
    if (this.currentLevel !== null) { this.currentLevel.draw(ctx); }
    
    //Draw the Ui on top of everything else
    this.ui.draw(ctx);
    // this.spring.draw(ctx);
  }
}