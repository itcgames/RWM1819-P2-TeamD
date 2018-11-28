
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = new Canvas("main-canvas", 1920, 1080);

    //Creating the Menu Manager
    this.mManager = new MenuManager();
    this.mManager.addScene("Splash", new SplashScene()); //Add splash
    this.mManager.addScene("Main Menu", new MainMenuScene()); //Add Main Menu
    this.mManager.addScene("Game", new GameScene()); //Add Game scene
    this.mManager.addScene("Scoreboard", new ScoreboardScene()); //Add Scoreboard
    this.mManager.addScene("Level Select", new LevelSelectScene()); //Add level select
    this.mManager.setCurrentScene("Main Menu");

    this.keyboard = new Keyboard();
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
    //Update the menu manager and pass over dt
    this.mManager.update(dt);

    //Change scene based on keyboard input
    //this is temporary while we debug
    if(this.keyboard.isButtonPressed("1")){
      this.mManager.setCurrentScene("Splash");
    }
    if(this.keyboard.isButtonPressed("2")){
      this.mManager.setCurrentScene("Main Menu");
    }
    if(this.keyboard.isButtonPressed("3")){
      this.mManager.setCurrentScene("Level Select");
    }
    if(this.keyboard.isButtonPressed("4")){
      this.mManager.setCurrentScene("Game");
    }
    if(this.keyboard.isButtonPressed("5")){
      this.mManager.setCurrentScene("Scoreboard");
    }
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