class GameScene {
  constructor() {
    this.sceneEnded = false;
    this.gravity = 0.008;
    this.ball = new Ball(100, 100);
    this.springImage = new Image();
    this.fanImage = new Image();
    this.fanWindImage = new Image();
    //this.spring = new Spring(50, 300, this.springImage);
    this.springImage.addEventListener('load', function () {
      this.items.push(new Spring(50, 600, this.springImage));
    }.bind(this));
    this.fanImage.addEventListener('load', function () {
    }.bind(this));
    this.fanWindImage.addEventListener('load', function () {
      this.items.push(new Fan(400, 700, this.fanImage, this.fanWindImage));
    }.bind(this));
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
    //The toolbar object
    this.toolBar = new toolbar();

    //Bind events for the click, for the oolbar
    window.addEventListener("click", this.checkToolbarClick.bind(this));
    this.ball.impulse(0, 0);
  }

  /**
   * will update all the game scene logic
   * @param {number} dt 
   * time since last update in ms
   */
  update(dt) {
    this.items.forEach(function (item) {
      if (item instanceof Spring) {
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
      else if (item instanceof Fan) {
        if (collisionManager.boolCircleToAABB(this.ball.collisionCircle,
          [
            item.collisionBox.points.top_left,
            item.collisionBox.points.top_right,
            item.collisionBox.points.bottom_right,
            item.collisionBox.points.bottom_left
          ])) {
          if (item.angle === 0) {
            this.ball.applyForce(0.4, 0);
          }
          else if (item.angle === 90) {
            this.ball.applyForce(0, 0.4);
          }
          else if (item.angle === 180) {
            this.ball.applyForce(-0.4, 0);
          }
          else {
            this.ball.applyForce(0, -1);
          }
        }
      }
      item.update(dt);
    }, this);

    this.ball.update(dt);
    this.block.update(dt);

    this.floorBlock.update(dt);
    this.zBlock.update(dt);

    //Update UI
    this.ui.update(dt);
  }

  checkToolbarClick(e) {
    let returned = this.toolBar.checkButton(e);

    if (returned === "trash") {
      console.log("Trash");
    }

    if (returned === "delete") {
      console.log("delete");
    }

    if (returned === "exit") {
      console.log("exit")
    }

    if (returned === "restart") {
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
    this.items.forEach(item => item.draw(ctx));
    this.block.draw(ctx);
    this.floorBlock.draw(ctx);
    this.zBlock.draw(ctx);
    this.ball.draw(ctx);

    //Draw the Ui on top of everything else
    this.ui.draw(ctx);
    // this.spring.draw(ctx);
  }
}