/**
 * Represents the minusG contraption.
 * @class
 * @classdesc consists of all the minusG related detail.
 */
class MinusG {
  /**
   * Constructs the minusG object
   * @constructor
   * @param {number} posX assigned x position on canvas
   * @param {number} posY assigned y position on canvas
   * @param {Image} spriteSheet sprite sheet of the minusG
   */
  constructor(posX, posY, spriteSheet) {
    this.position = {
      x: posX,
      y: posY
    };
    this.size = {
      width: 100,
      height: 100
    }
    //Rectangle for Drag and drop and x, y. Without these we cant move minusG
    this.rect = new Square(posX, posY, 100, 30);

    this.collisionRadius = 30;
    this.collisionCircle = {
      position: {
        x: this.position.x + (this.size.width / 2),
        y: this.position.y + 10
      },
      radius: this.collisionRadius
    };
    this.minusGSoundManager = new SoundManager();
    this.minusGSoundManager.init({
      "minusG_sound": {
        filepath: "./src/resources/sounds/minusG.mp3",
        volume: 1
      }
    });
    this.image = spriteSheet;
    this.minusGAnimator = new AnimationManager();
    this.minusGAnim = new Animation(this.image, 100, 100, 15);
    this.minusGAnimator.addAnimation("minusG", this.minusGAnim);
    this.minusGAnimator.isLooping("minusG", false);
    //this.minusGAnimator.stop();
    this.angle = 0;
  }

  /**
   * This function will do all logic updates
   * to do with the minusG.
   * @param {number} dt 
   * time in ms since last update
   */
  update(dt) {
    this.position.x = this.rect.x;
    this.position.y = this.rect.y;

    //Update circle collision box, this is necessary for drag and drop
    this.collisionCircle.position.x = this.position.x + (this.size.width / 2);
    this.collisionCircle.position.y = this.position.y + 10;


    this.minusGAnimator.update(dt, this.position.x + (this.size.width / 2), this.position.y);
    //this.minusGAnimator.continue();
  }

  /**
   * This function will draw the minusG.
   * @param {CanvasRenderingContext2D} ctx 
   * The canvas we want to draw to
   */
  draw(ctx) {
    ctx.save();
    this.minusGAnimator.draw(ctx);
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
    this.minusGAnimator.setRotation("bounce", this.angle);
  }

  /**
   * Setter for the position of the minusG
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
   * of the minusG.
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
    this.minusGSoundManager.play("minusG_sound");
    this.minusGAnimator.continue();
  }
}