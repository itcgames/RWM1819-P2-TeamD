class GameScene {
  constructor() {
    this.sceneEnded = false;
    //Level index for scoreboard
    this.levelIndex = 0;

    //The scorboard manager
    this.scoreboard = new ScoreboardManager();
    this.scoreboard.timerActive = false;
    this.start = false;

    //Object to store the timer
    this.timeTaken = "";
    // this.gravity = 0.008;
    // this.springImage = new Image();
    // this.fanImage = new Image();
    // this.fanWindImage = new Image();
    // //this.spring = new Spring(50, 300, this.springImage);
    // this.springImage.addEventListener('load', function () {
    //   this.items.push(new Spring(50, 600, this.springImage));
    // }.bind(this));
    // this.fanImage.addEventListener('load', function () {
    // }.bind(this));
    // this.fanWindImage.addEventListener('load', function () {
    //   this.items.push(new Fan(10, 440, this.fanImage, this.fanWindImage));
    // }.bind(this));
    this.items = [];
    // this.springImage.src = "./src/resources/spring_anim.png";
    // this.fanImage.src = "./src/resources/fan_anim.png";
    // this.fanWindImage.src = "./src/resources/wind.png";
    this.ball = new Ball(100, 150);
    var ballupdate = false;
    this.keyboard = new Keyboard();
    // this.block = new Block(300, 300);
    // this.floorBlock = new FloorBlock(900, 300);
    // this.zBlock = new Zblock(900, 600);

    // /** @type {Array<Level>} */
    // this.levels = [];
    // /** @type {Level} */
    this.currentLevel = null;
    // Level.load(
    //   "./src/resources/levels.json",
    //   function (e, data) {
    //     /** @type {[]} */
    //     const allLevelsData = JSON.parse(data);
    //     allLevelsData.forEach(function (ele) { this.levels.push(new Level(ele)); }, this);
    //     if (this.levels.length > 0) { this.currentLevel = this.levels[0]; }
    //   }.bind(this),
    //   function (e) { console.error("Error in GameScene.constructor() -> level loading"); });

    //The ui bar
    this.ui = new UI();
    //Keep a reference to the items spawned by the UI/Drag and drop
    this.items = this.ui.items;
    //The toolbar object
    this.toolBar = new toolbar();
  }


  restart() {
    this.ball.position.x = 100;
    this.ball.position.y = 150;
    this.ball.acceleration.x = 0;
    this.ball.acceleration.y = 0;
    this.ball.velocity.x = 0;
    this.ball.velocity.y = 0;
    this.ballupdate = false;

  }

  play() {
    this.ballupdate = true;

  }

  //Method to intialise the level, where the ball spawns, and setting ui elements values
  initLevel(level)
  {
    this.currentLevel = level;
    this.ui.setUi(level);
  }
  delete() {
    this.ui.items.splice(0, this.ui.items.length);
    this.ui.itemsAvailable = [3, 2, 4, 1, 1, 1];
  }

  /**
   * will update all the game scene logic
   * @param {number} dt 
   * time since last update in ms
   */
  update(dt) {
    //If the timer is not running start it
    if (this.scoreboard.timerActive == false && this.start == false) {
      this.scoreboard.startTimer();
      this.start = true;
    }
    this.items.forEach(function (item) {
      if (item instanceof Spring) {
        this.springCollision(item);
      }
      else if (item instanceof Fan) {
        this.fanCollision(item);
      }
      item.update(dt);
    }, this);
    this.ball.update(dt);
    if (this.currentLevel !== null) { this.currentLevel.update(dt, this.ball); }


    //Update timer
    this.timeTaken = this.scoreboard.getDisplayTimer();

    if (this.keyboard.isButtonPressed("6") && this.scoreboard.timerActive == true) {
      this.scoreboard.stopTimer();
      //Insert level number here
      //this.scoreboard.playerName = "";
      this.scoreboard.initBoard("session");
      this.scoreboard.addToBoard(dt);
      //console.log(this.scoreboard.getBoard());
    }
    //Update UI
    this.ui.update(dt);
  }

  checkButtonClick(e) {
    //The scene we want to go, leave it empty if we want to stay in the current scene
    var newScene = "";
    let returned = this.toolBar.checkButton(e);

    if (returned === "trash") {
      console.log("Trash");
      this.delete();
    }

    if (returned === "delete") {
      console.log("delete");
    }

    if (returned === "exit") {
      console.log("exit")
      newScene = "this.mManager.setCurrentScene('Main Menu')";
    }

    if (returned === "restart") {
      console.log("restart");
      this.restart();
    }

    if (returned === "play") {
      this.play()
    }

    //Return the new scene
    return newScene;

  }

  /**
   * will draw all the game scene elements
   * @param {CanvasRenderingContext2D} ctx 
   * canvas we want to draw to
   */
  draw(ctx) {
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    this.ball.draw(ctx);
    if (this.currentLevel !== null) { this.currentLevel.draw(ctx); }

    //Draw the Ui on top of everything else
    this.ui.draw(ctx);
  }

  /**
   * updates the collisions between ball and spring
   * @param {Spring} item 
   * the spring object
   */
  springCollision(item) {
    if (collisionManager.boolCircleToCircle(item.collisionCircle, this.ball.collisionCircle)) {
      if (item.angle === 0) {
        this.ball.impulse(0, -10);
        this.ball.position.y -= this.ball.radius;
      }
      else if (item.angle === 90) {
        this.ball.impulse(10, 0);
        this.ball.position.x += this.ball.radius;
      }
      else if (item.angle === 180) {
        this.ball.impulse(0, 10);
        this.ball.position.y += this.ball.radius;
      }
      else {
        this.ball.impulse(-10, 0);
        this.ball.position.x -= this.ball.radius;
      }
      item.bounce();
    }
  }
  /**
    * updates the collisions between ball and fan
    * @param {Spring} item 
    * the fan object
    */
  fanCollision(item) {
    if (collisionManager.boolCircleToAABB(this.ball.collisionCircle,
      [
        item.collisionBox.points.top_left,
        item.collisionBox.points.top_right,
        item.collisionBox.points.bottom_right,
        item.collisionBox.points.bottom_left
      ])) {
      if (item.angle === 0) {
        this.ball.applyForce(0.6, 0);
      }
      else if (item.angle === 90) {
        this.ball.applyForce(0, 1);
      }
      else if (item.angle === 180) {
        this.ball.applyForce(-0.6, 0);
      }
      else {
        this.ball.applyForce(0, -1);
      }
    }
  }
}