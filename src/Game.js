class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = new Canvas("main-canvas");
    console.log(collisionManager);
    console.log(Animation);
    console.log(AnimationManager);
    console.log(DragDrop);
    console.log(MenuManager);
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
  }

  render() {
    this.canvas.clear();
  }

  calculateDt() {
    const now = Date.now();
    const dt = now - this.prevDt;
    this.prevDt = now;
    return dt;
  }
}