class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(100, 150);
    var that = this;
    var ballupdate = false;
    this.keyboard = new Keyboard();

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

  play(){
    this.ballupdate = true;

  }

  delete(){
    this.ui.items.splice(0, this.ui.items.length);
    this.ui.itemsAvailable = [3, 2, 4, 1, 1, 1];


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
    
    if(this.ballupdate == true)
    {
      this.ball.update(dt);
    }
   

    //Update UI
    this.ui.update(dt);
  }

  checkButtonClick(e)
  {
    //The scene we want to go, leave it empty if we want to stay in the current scene
    var newScene = "";
    let returned = this.toolBar.checkButton(e);

    if(returned === "trash")
    {
      console.log("Trash");
      this.delete();
    }

    if(returned === "delete")
    {
      console.log("delete");
    }

    if(returned === "exit")
    {
      console.log("exit")
      newScene = "this.mManager.setCurrentScene('Main Menu')";
    }

    if(returned === "restart")
    {
      console.log("restart");
      this.restart();
    }

    if(returned === "play")
    {
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
    for(var i in this.items){
      this.items[i].draw(ctx);
    }

    this.ball.draw(ctx);
    
    //Draw the Ui on top of everything else
    this.ui.draw(ctx);
    // this.spring.draw(ctx);
  }
}