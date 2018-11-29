class Level {
  /**
   * 
   * @param {string | {}} data json string or parsed object.
   */
  constructor(data) {

    /**
     * @type {{}}}
     */
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
    
    /**
     * Parsing start block
     * @type {{ position: { x: number, y: number }, dimensions: { x: number, y: number }, color: { r: number, g: number, b: number }, spawnPoint: { x: number, y: number }}}
     */
    const jsStartBlock = parsedData["start"];
    this.start = new StartBlock(jsStartBlock.position, jsStartBlock.dimensions, jsStartBlock.color, jsStartBlock.spawnPoint);

    /**
     * Parsing end block
     * @type {{ position: { x: number, y: number }, dimensions: { x: number, y: number }, color: { r: number, g: number, b: number } }}
     */
    const jsEndBlock = parsedData["end"];
    this.end = new EndBlock(jsEndBlock.position, jsEndBlock.dimensions, jsEndBlock.color);
  }

  /**
   * @param {string} filePath 
   *  File path to json file.
   * @param {(ev: XMLHttpRequestEventMap["load"], data: string) => any} successCallback
   *  function is called when level is fully loaded successfully.
   * @param {(ev: XMLHttpRequestEventMap["error"]) => any} failureCallback
   *  function is called when level does not load successfully.
   */
  static load(filePath, successCallback, failureCallback) {
    const xml = new XMLHttpRequest();
    xml.open("GET", filePath, true);
    xml.responseType = "text";
    xml.addEventListener("load", function (e) {
      /** @type {XMLHttpRequest} */
      const request = this;
      successCallback(e, request.responseText);
    }, false);
    xml.addEventListener("error", function(e) {
      /** @type {XMLHttpRequest} */
      const request = this;
      failureCallback(e);
    }, false);
    xml.send();
  }

  /**
   * Check for collisions between static obstacles and the passed in ball.
   * @param {number} dt time between update calls
   * @param {Ball} ball ball to be checked in collisions.
   */
  update(dt, ball) {
    const result = collisionManager.maniCircleToAABB(ball.collisionCircle, this.start.aabb);
    if (result.collision) {
      /** @type {{ circle: { distance: {x: number, y: number} }, aabb: { distance: {x: number, y: number} } }} */
      const manifest = result.manifest;
      ball.position = {
        x: ball.position.x + manifest.circle.distance.x,
        y: ball.position.y + manifest.circle.distance.y
      };
      ball.applyForce(-ball.acceleration.x, -ball.acceleration.y);
      const manifestDirection = VectorMath.unit(manifest.circle.distance);
      const ballVelocityMag = VectorMath.length(ball.velocity);
      ball.velocity = {
        x: manifestDirection.x * ballVelocityMag * ball.restitution,
        y: manifestDirection.y * ballVelocityMag * ball.restitution
      };
    }
  }

  /**
   * Draws the level
   * @param {CanvasRenderingContext2D} ctx 2D Rendering context
   */
  draw(ctx) {
    this.start.draw(ctx);
    this.end.draw(ctx);
  }
}