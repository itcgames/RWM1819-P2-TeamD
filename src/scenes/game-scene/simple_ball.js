/**
 * Represents the golf ball.
 * @class
 * @classdesc consists of all the golf ball related detail.
 */
class Ball {
  /**
   * Constructs the golf ball object
   * @constructor
   * @param {number} posX assigned x position on canvas
   * @param {number} posY assigned y position on canvas
   */
  constructor(posX, posY) {
    this.position = {
      x: posX,
      y: posY
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.acceleration = {
      x: 0,
      y: 0
    };
    this.radius = 25;
    this.mass = 0.01;
    this.restitution = -0.7;
    this.maxVel = 1;
    this.maxAcc = 100;
  }
  /**
   * This function will do all logic updates
   * to do with the ball.
   * @param {number} dt 
   * time in ms since last update
   */
  update(dt) {
      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;

      //calculate length of the velocity
      var velLen = Math.sqrt(
          Math.pow(this.velocity.x, 2) +
          Math.pow(this.velocity.y, 2)
          );
      //clamp velocity at max if its above max.
      if(velLen > this.maxVel)
      {
        this.velocity.x /= velLen;
        this.velocity.y /= velLen;
      }
      this.position.x += this.velocity.x * dt;
      this.position.y += this.velocity.y * dt;
  }

  /**
   * This function will draw our ball.
   * @param {CanvasRenderingContext2D} ctx 
   * The canvas we want to draw to
   */
  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 0;
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /**
   * This function applies a force to the ball by 
   * adding the force to the current acceleration.
   * @param {number} xForce 
   * Force acting in the x axis
   * where right is positive left is negative
   * @param {number} yForce 
   * Force acting in the y axis
   * where up is positive down is negative
   */
  applyForce(xForce, yForce){
      this.acceleration.x += xForce;
      this.acceleration.y += yForce;
  }


}