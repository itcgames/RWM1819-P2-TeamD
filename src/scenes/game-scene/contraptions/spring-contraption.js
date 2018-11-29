/**
 * Represents the spring contraption.
 * @class
 * @classdesc consists of all the spring related detail.
 */
class Spring {
  /**
   * Constructs the spring object
   * @constructor
   * @param {number} posX assigned x position on canvas
   * @param {number} posY assigned y position on canvas
   * @param {Image} spriteSheet sprite sheet of the spring
   */
  constructor(posX, posY, spriteSheet) {


    this.position = {
      x: posX,
      y: posY
    };
    this.size = {
      width: 100,
      height: 30
    }
    //Rectangle for Drag and drop and x, y. Without these we cant move spring
    this.rect = new Square(posX, posY, 100, 30);

    this.points = {
      top_left: {
        x: this.position.x,
        y: this.position.y
      },
      top_right: {
        x: this.position.x + this.size.width,
        y: this.position.y
      },
      bottom_left: {
        x: this.position.x,
        y: this.position.y + this.size.height
      },
      bottom_right: {
        x: this.position.x + this.size.width,
        y: this.position.y + this.size.height
      }
    };
    this.collisionRadius = 30;
    this.collisionCircle = {
      position: {
        x: this.position.x + (this.size.width / 2),
        y: this.position.y + 10
      },
      radius: this.collisionRadius
    };
    this.springSoundManager = new SoundManager();
    this.springSoundManager.init({
      "spring_sound": {
        filepath: "./src/resources/sounds/spring.mp3",
        volume: 1
      }
    });
    this.image = spriteSheet;
    this.springAnimator = new AnimationManager();
    this.springBounceAnim = new Animation(this.image, 101.4, 100, 11);
    this.springAnimator.addAnimation("bounce", this.springBounceAnim);
    this.springAnimator.isLooping("bounce", false);
    this.springAnimator.stop();
    this.angle = 0;
  }

  /**
   * This function will do all logic updates
   * to do with the spring.
   * @param {number} dt 
   * time in ms since last update
   */
  update(dt) {
    this.position.x = this.rect.x;
    this.position.y = this.rect.y;

    //Update circle collision box, this is necessary for drag and drop
    this.collisionCircle.position.x = this.position.x + (this.size.width / 2);
    this.collisionCircle.position.y = this.position.y + 10;


    this.springAnimator.update(dt, this.position.x + (this.size.width / 2), this.position.y);
  }

  /**
   * This function will draw the spring.
   * @param {CanvasRenderingContext2D} ctx 
   * The canvas we want to draw to
   */
  draw(ctx) {
    ctx.save();
    this.springAnimator.draw(ctx);
    // ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);
    // ctx.stroke();
    // ctx.lineWidth = 0;
    // ctx.fillStyle = '#ff0000';
    // ctx.beginPath();
    // ctx.arc(this.collisionCircle.position.x,
    //   this.collisionCircle.position.y,
    //   this.collisionCircle.radius,
    //   0,
    //   2 * Math.PI);
    // ctx.stroke();
    // ctx.closePath();
    // ctx.fill();
    ctx.restore();
  }

  rotate(rotateBy) {
    var newAngle = 0;
    if (this.angle + rotateBy >= 360) {
      newAngle = 0;
    }
    else if (this.angle + rotateBy <= 0) {
      newAngle = 270;
    }
    else{
      newAngle = this.angle + rotateBy;
    } 
    this.angle = newAngle;
    this.springAnimator.setRotation("bounce", this.angle);
  }

  /**
   * Setter for the position of the spring
   * @param {number} newX 
   * number defining new x position on the canvas
   * @param {number} newY 
   * number defining the new y position on the canvas
   */
  setPosition(newX, newY) {
    this.position.x = newX;
    this.position.y = newY;
    this.updatePoints();
  }

  /**
   * This method updates the points on the
   * collision box based on the current position
   * of the spring.
   */
  updatePoints() {
    this.points.top_left.x = this.position.x;
    this.points.top_left.y = this.position.y;
    this.points.top_right.x = this.position.x + this.size.width;
    this.points.top_right.y = this.position.y;
    this.points.bottom_left.x = this.position.x + this.size.width;
    this.points.bottom_left.y = this.position.y + this.size.height;
    this.points.bottom_right.x = this.position.x;
    this.points.bottom_right.y = this.position.y + this.size.height;
  }
  /**
   * getter for points of the collision box
   * @returns {Object} 
   * returns a points object which holds
   * all the four points on the rectangle
   * to be used in collision checking.
   */
  getRectanglePoints() {
    return this.points;
  }

  bounce() {
    this.springSoundManager.play("spring_sound");
    this.springAnimator.continue();
  }
}