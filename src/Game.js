
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = new Canvas("main-canvas");
    this.gravity = 0.008;
    this.ball = new Ball(100,100);
  }

  run() {
    this.loop();
  }

  loop() {
    this.update();
    this.render();

    /** Use bind function to keep the 'this' context throughout loop usage */
    window.requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    const dt = this.calculateDt();
    this.ball.applyForce(0,this.gravity);
    this.ball.update(dt);
  }

  render() {
    this.canvas.clear();
    this.ball.draw(this.canvas.context2D);
  }

  calculateDt() {
    const now = Date.now();
    const dt = now - this.prevDt;
    this.prevDt = now;
    return dt;
  }
}