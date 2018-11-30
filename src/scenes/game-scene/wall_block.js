class WallBlock extends BaseBlock {
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
    super(position, dimensions, color);
  }
}