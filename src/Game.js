
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
    this.mManager.setFadeSpeed(500); //Set fade out/in to .5 seconds
    this.mManager.fadeTo("Main Menu"); //Set it to fade to main menu from splash

    //Create a new keyboard, this will be used to switch scenes FOR NOW
    this.keyboard = new Keyboard();

    //Creating a bind for the click event, other click events will still work
    //But this one is for handling the clicking of buttons
    window.addEventListener("click", this.menuClickHandler.bind(this));

    //Load in our level data
    /** @type {Array<Level>} */
    this.levels = [];
    /** @type {Level} */
    this.currentLevel = null;
    Level.load(
      "./src/resources/levels.json",
      function (e, data) {
        /** @type {[]} */
        const allLevelsData = JSON.parse(data);
        allLevelsData.forEach(function (ele) { this.levels.push(new Level(ele)); }, this);
      }.bind(this),
      function (e) { console.error("Error in Game.constructor() -> level loading"); });
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

  menuClickHandler()
  {
    //If the scene has a method called checkButtonClick
    if(typeof this.mManager.current.value.checkButtonClick === 'function')
    {
      var returned = this.mManager.current.value.checkButtonClick();
      //If the first item return is true, then change our scene depending on
      //button name
      if(returned !== ""){
        //We eval the string to convert it to javascript code to be executed
        eval(returned);

        //If we have chosen a level in the level select scene then pass over our data
        if(returned === "this.mManager.setCurrentScene('Game')"){ 
          //Pass over the data for the chosen level
          this.mManager.current.value.initLevel(this.levels[this.mManager.scenes.get("Level Select").selectedLevel - 1]);
        }

        //If we have chosen to go to the scoreboard, call our scoreboard method
        if(returned === "this.mManager.setCurrentScene('Scoreboard')"){ 
          this.mManager.current.value.openScoreboard();
        }
      }
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