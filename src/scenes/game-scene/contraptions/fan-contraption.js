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
    /**
     * @type {{ position: { x: number, y: number }, size: { width: number, height: number }, points: { top_left: { x: number, y: number }, top_right: { x: number, y: number }, bottom_right: { x: number, y: number }, bottom_left: { x: number, y: number } }}}
     */
    this.collisionBox = {
      position: {
        x: this.windAnimationBox.position.x - 310,
        y: this.windAnimationBox.position.y - 40
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
    this.windAnimationBox.position.x = this.position.x + 340;
    this.windAnimationBox.position.y = this.position.y;
    this.collisionBox.position.x = this.windAnimationBox.position.x - 310;
    this.collisionBox.position.y = this.windAnimationBox.position.y - 40;

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
    // ctx.moveTo(this.collisionBox.points.top_left.x, this.collisionBox.points.top_left.y);
    // ctx.lineTo(this.collisionBox.points.top_right.x, this.collisionBox.points.top_right.y);
    // ctx.lineTo(this.collisionBox.points.bottom_right.x, this.collisionBox.points.bottom_right.y);
    // ctx.lineTo(this.collisionBox.points.bottom_left.x, this.collisionBox.points.bottom_left.y);
    // ctx.lineTo(this.collisionBox.points.top_left.x, this.collisionBox.points.top_left.y);
    // //ctx.rect(this.collisionBox.position.x, this.collisionBox.position.y, this.collisionBox.size.width, this.collisionBox.size.height);
    // ctx.stroke();

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
    var newPos = this.rotateVector(this.windAnimationBox.position, this.position, rotateBy);
    this.windAnimationBox.position.x = newPos.x + (this.size.width / 2);
    this.windAnimationBox.position.y = newPos.y;
    this.windAnimator.setRotation("wind", this.angle + 90);
    newPos = this.rotateVector(this.collisionBox.points.top_left, this.position, rotateBy);
    this.collisionBox.points.top_left.x = newPos.x;
    this.collisionBox.points.top_left.y = newPos.y;

    newPos = this.rotateVector(
      this.collisionBox.points.top_right,
      this.position,
      rotateBy
    );
    this.collisionBox.points.top_right.x = newPos.x;
    this.collisionBox.points.top_right.y = newPos.y;

    newPos = this.rotateVector(
      this.collisionBox.points.bottom_right,
      this.position,
      rotateBy
    );
    this.collisionBox.points.bottom_right.x = newPos.x;
    this.collisionBox.points.bottom_right.y = newPos.y;

    newPos = this.rotateVector(
      this.collisionBox.points.bottom_left,
      this.position,
      rotateBy
    );
    this.collisionBox.points.bottom_left.x = newPos.x;
    this.collisionBox.points.bottom_left.y = newPos.y;
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
    this.collisionBox.position.x = newX + (this.size.width / 2);
    this.collisionBox.position.y = newY - 40;
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

  rotateVector(vector, origin, angle) {
    const rad = angle * (Math.PI/180);
    const cosine = Math.cos(rad);
    const sine = Math.sin(rad);
    return {
      x: (cosine * (vector.x - origin.x)) - (sine * (vector.y - origin.y)) + origin.x,
      y: (sine * (vector.x - origin.x)) + (cosine * (vector.y - origin.y)) + origin.y
    };
  }
}