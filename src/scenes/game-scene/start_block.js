class StartBlock extends BaseBlock {
  /**
   * @param {{ x: number, y: number }} position
   *  Defines the position of the start block
   * @param {{ x: number, y: number }} dimensions
   *  Defines the dimensions of the start block,
   *  respectively width and height.
   * @param {{ r: number, g: number, b: number }} color
   *  Defines the fill colour of this block.
   * @param {{ x: number, y: number }} spawnPoint
   *  Defines the starting spawn point.
   */
  constructor(position, dimensions, color, spawnPoint) {
    super(position, dimensions, color);
    this.spawn = { x: spawnPoint.x, y: spawnPoint.y };
  }
}