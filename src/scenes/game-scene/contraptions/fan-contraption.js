/**
 * Represents the fan contraption.
 * @class
 * @classdesc consists of all the fan related detail.
 */
class Fan {
  /**
   * Constructs the fan object
   * @constructor
   * @param {number} posX assigned x position on canvas
   * @param {number} posY assigned y position on canvas
   * @param {Image} spriteSheet sprite sheet of the fan
   */
  constructor(posX, posY, spriteSheet, windSpriteSheet) {
    this.position = {
      x: posX,
      y: posY
    };
    this.size = {
      width: 100,
      height: 30
    }
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
    this.fanSoundManager = new SoundManager();
    this.fanSoundManager.init({
      "fan_sound": {
        filepath: "./src/resources/sounds/fan.mp3",
        volume: 1
      }
    });
    this.image = spriteSheet;
    this.fanAnimator = new AnimationManager();
    this.fanAnim = new Animation(this.image, 21, 81, 15);
    this.fanAnimator.addAnimation("fan", this.fanAnim);
    this.fanAnimator.isLooping("fan", true);
    this.fanAnimator.setRotation("fan", 0);
    this.angle = 0;
    this.windAnimator = new AnimationManager();
    this.windAnimation = new Animation(windSpriteSheet, 144.9, 245, 16);
    this.windAnimator.addAnimation("wind", this.windAnimation);
    this.windAnimator.setRotation("wind", 90);
    this.windAnimator.setScale("wind", 0.8, 1.5);

    this.windAnimationBox = {
      position: {
        x: this.position.x + 340,
        y: this.position.y
      },
      size: {
        x: 100,
        y: 100
      }
    };
    this.collisionBox = {
      position: {
        x: this.position.x + (this.size.width / 2),
        y: this.position.y - 40
      },
      size: {
        width: 500,
        height: 80
      }
    };
    this.collisionBox.points = {
      top_left: {
        x: this.collisionBox.position.x,
        y: this.collisionBox.position.y
      },
      top_right: {
        x: this.collisionBox.position.x + this.collisionBox.size.width,
        y: this.collisionBox.position.y
      },
      bottom_right: {
        x: this.collisionBox.position.x + this.collisionBox.size.width,
        y: this.collisionBox.position.y + this.collisionBox.size.height
      },
      bottom_left: {
        x: this.collisionBox.position.x,
        y: this.collisionBox.position.y + this.collisionBox.size.height
      }
    };
    this.rect = new Square(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  /**
   * This function will do all logic updates
   * to do with the fan.
   * @param {number} dt 
   * time in ms since last update
   */
  update(dt) {
    this.position.x = this.rect.x;
    this.position.y = this.rect.y;
    this.fanAnimator.update(dt, this.position.x + (this.size.width / 2), this.position.y);
    this.windAnimator.update(dt, this.windAnimationBox.position.x, this.windAnimationBox.position.y);
    this.fanSoundManager.play("fan_sound");
  }

  /**
   * This function will draw the fan.
   * @param {CanvasRenderingContext2D} ctx 
   * The canvas we want to draw to
   */
  draw(ctx) {
    ctx.save();
    this.fanAnimator.draw(ctx);
    this.windAnimator.draw(ctx);
    // ctx.rect(this.collisionBox.position.x + (this.collisionBox.size.width / 2), this.position.y - 40, 500, 80);
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
    else {
      newAngle = this.angle + rotateBy;
    }
    this.angle = newAngle;
    this.fanAnimator.setRotation("fan", this.angle);
  }

  /**
   * Setter for the position of the fan
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
   * of the fan.
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

    /**
   * method to rotate a vector about an origin.
   * @param {number} x 
   * x of the vector to rotate
   * @param {number} y 
   * y of the vector to rotate
   * @param {number} originX 
   * origin x coord to rotate by
   * @param {number} originY 
   * origin y coord to rotate by
   * @param {number} angle 
   * angle to rotate by
   */
  rotateVector(x, y, originX, originY, angle) {
    angle = MathF.rad(angle);
    return {
      x: Math.cos(angle) * (vector.x - origin.x) - Math.sin(angle) * (vector.y - origin.y) + origin.x,
      y: Math.sin(angle) * (vector.x - origin.x) + Math.cos(angle) * (vector.y - origin.y) + origin.y
    };
  }
}