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
    this.radius = 25;
    this.mass = 0.1;
    this.restitution = -0.7;
  }
  /**
   * This function will do all logic updates
   * to do with the ball.
   * @param {number} dt 
   * time in ms since last update
   */
  update(dt) {

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
}