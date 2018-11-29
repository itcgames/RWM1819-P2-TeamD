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
    this.mass = 1;
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


    this.cd = 0.47;  // Dimensionless
    this.rho = 1.22; // kg / m^3
    this.a = Math.PI * this.radius * this.radius / (10000); // m^2
    this.ag = 9.81;  // m / s^2
  }
  /**
   * This function will do all logic updates
   * to do with the ball.
   * @param {number} dt 
   * time in ms since last update
   */
  update(dt) {
    var Fx = -0.5 * this.cd * this.a * this.rho * this.velocity.x * this.velocity.x * this.velocity.x / Math.abs(this.velocity.x);
    var Fy = -0.5 * this.cd * this.a * this.rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);

    Fx = (isNaN(Fx) ? 0 : Fx);
    Fy = (isNaN(Fy) ? 0 : Fy);

    // Calculate acceleration ( F = ma )
    var ax = Fx / this.mass;
    var ay = this.ag + (Fy / this.mass);
    // Integrate to get velocity
    this.velocity.x += ax * (dt / 1000);
    this.velocity.y += ay * (dt / 1000);

    // Integrate to get position
    this.position.x += this.velocity.x * (dt / 1000) * 100;
    this.position.y += this.velocity.y * (dt / 1000) * 100;
    this.updateCollisionCircle();
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
    this.velocity.x += xForce;
    this.velocity.y += yForce;
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
  impulse(xForce, yForce) {
    this.velocity.x += xForce;
    this.velocity.y += yForce;
  }
}