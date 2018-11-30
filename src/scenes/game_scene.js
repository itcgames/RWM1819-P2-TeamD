class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(100, 100);
    this.springImage = new Image();
    this.fanImage = new Image();
    this.fanWindImage = new Image();
    //this.spring = new Spring(50, 300, this.springImage);
    var that = this;
    this.springImage.addEventListener('load', function () {
      that.items.push(new Spring(50, 300, that.springImage));
    });
    this.fanImage.addEventListener('load', function () {
    });
    this.fanWindImage.addEventListener('load', function () {
      that.items.push(new Fan(20, 200, that.fanImage, that.fanWindImage));
    });
    this.items = [];
    this.springImage.src = "./src/resources/spring_anim.png";
    this.fanImage.src = "./src/resources/fan_anim.png";
    this.fanWindImage.src = "./src/resources/wind.png";
    this.keyboard = new Keyboard();
    this.block = new Block(300, 300);
    this.floorBlock = new FloorBlock(900, 300);
    this.zBlock = new Zblock(900, 600);

    //The ui bar
    this.ui = new UI();
  }

  /**
   * will update all the game scene logic
   * @param {number} dt 
   * time since last update in ms
   */
  update(dt) {

    for (var i in this.items) {
      if (this.items[i] instanceof Spring) {
        if (collisionManager.boolCircleToCircle(this.items[i].collisionCircle, this.ball.collisionCircle)) {
          if (this.items[i].angle === 0) {
            this.ball.impulse(0, -3);
          }
          else if (this.items[i].angle === 90) {
            this.ball.impulse(3, 0);
          }
          else if (this.items[i].angle === 180) {
            this.ball.impulse(0, 3);
          }
          else {
            this.ball.impulse(-3, 0);
          }
          this.items[i].bounce();
        }
      }
      else if (this.items[i] instanceof Fan) {
        if (collisionManager.boolCircleToAABB(this.ball.collisionCircle, 
            [
              this.items[i].collisionBox.points.top_left,
              this.items[i].collisionBox.points.top_right,
              this.items[i].collisionBox.points.bottom_left,
              this.items[i].collisionBox.points.bottom_right
            ])) 
        {
          this.ball.applyForce(0.01,0);
          console.log("collision with fan and ball");
        }
      }
      this.items[i].update(dt);
    }

    this.ball.applyForce(0, this.gravity);
    this.ball.update(dt);
    this.block.update(dt);

    //Update UI
    this.ui.update(dt);

    this.floorBlock.update(dt);
    this.zBlock.update(dt);
  }

  /**
   * will draw all the game scene elements
   * @param {CanvasRenderingContext2D} ctx 
   * canvas we want to draw to
   */
  draw(ctx) {
    ctx.fillStyle = "#71f441";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i in this.items) {
      this.items[i].draw(ctx);
    }
    this.block.draw(ctx);
    this.floorBlock.draw(ctx);
    this.zBlock.draw(ctx);
    this.ball.draw(ctx);

    //Draw the Ui on top of everything else
    this.ui.draw(ctx);
    // this.spring.draw(ctx);
  }
}