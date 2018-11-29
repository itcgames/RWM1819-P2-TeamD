class BaseBlock {
  /**
   * @param {{ x: number, y: number }} position
   *  Defines the position of the block,
   *  as the top-left corner of the block.
   * @param {{ x: number, y: number }} dimensions
   *  Defines the size of the block,
   *  respectively width and height.
   * @param {{ r: number, g: number, b: number }} color
   *  Defines the fill colour of this block.
   */
  constructor(position, dimensions, color) {
    /**
     * @param {{ x: number, y: number}} position 
     * @param {number} width 
     * @param {number} height 
     * @returns {Array<{ x: number, y: number }>}
     */
    function generateAABB(position, width, height) {
      return [
        { x: position.x, y: position.y },
        { x: position.x + width, y: position.y },
        { x: position.x + width, y: position.y + height },
        { x: position.x, y: position.y + height }
      ];
    };
    this.position = { x: position.x, y: position.y };
    this.width = dimensions.x;
    this.height = dimensions.y;
    this.color = new Color(color.r, color.g, color.b);
    this.aabb = generateAABB(this.position, this.width, this.height);
  }
  
  /**
   * @param {CanvasRenderingContext2D} ctx rendering context
   */
  draw(ctx) {
    ctx.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
    ctx.strokeStyle = this.color.rgba();
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.color.rgba();
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}