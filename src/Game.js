
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = new Canvas("main-canvas");
    this.gravity = 0.008;
    this.ball = new Ball(100,100);

    //Creating the Menu Manager
    this.mManager = new MenuManager();
    this.mManager.addScene("Splash", new SplashScene()); //Add splash
    this.mManager.addScene("Main Menu", new MainMenuScene()); //Add Main Menu
    this.mManager.addScene("Game", new GameScene()); //Add Game scene
    this.mManager.addScene("Scoreboard", new ScoreboardScene()); //Add Scoreboard
    this.mManager.addScene("Level Select", new LevelSelectScene()); //Add level select
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
    this.ball.draw(this.canvas.context2D);

    //Update the menu manager and pass over dt
    this.mManager.update(dt);
  }

  render() {
    //Call draw on the menu manager and pass the context over as canvas is not needed?
    this.mManager.draw(this.canvas.context2D);
  }

  calculateDt() {
    const now = Date.now();
    const dt = now - this.prevDt;
    this.prevDt = now;
    return dt;
  }
}