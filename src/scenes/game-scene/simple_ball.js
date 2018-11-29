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
    this.maxVel = 3;
    this.maxAcc = 1;
    this.collisionCircle = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      radius: this.radius
    };
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
    if (velLen > this.maxVel) {
      this.velocity.x /= velLen;
      this.velocity.y /= velLen;
    }
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.updateCollisionCircle();
    //console.log(this.velocity.x + "     " + this.velocity.y);
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
  applyForce(xForce, yForce) {
    this.acceleration.x += xForce;
    this.acceleration.y += yForce;
    //calculate length of the velocity
    var accLen = Math.sqrt(
      Math.pow(this.acceleration.x, 2) +
      Math.pow(this.acceleration.y, 2)
    );
    //clamp velocity at max if its above max.
    if (accLen > this.maxAcc) {
      this.acceleration.x /= accLen;
      this.acceleration.y /= accLen;
    }
  }

  /**
   * This method will update the collision circles position
   * based on the position of the ball.
   */
  updateCollisionCircle() {
    this.collisionCircle.position.x = this.position.x;
    this.collisionCircle.position.y = this.position.y;
  }

  /**
   * This method will apply an impulse force 
   * to the ball.
   * @param {number} xForce 
   * force to be applied on the x axis.
   * @param {number} yForce 
   * force to be applied on the y axis.
   */
  impulse(xForce, yForce){
    this.velocity.x += xForce;
    this.velocity.y += yForce;
    if(this.xForce){
      this.acceleration.x = 0;
    }
    else if(this.yForce){
      this.acceleration.y = 0;
    }
    
  }
}