class VectorMath {

  /**
   * @param {{ x: number, y: number}} v 
   */
  static lengthSqr(v) {
    return Math.pow(v.x, 2) + Math.pow(v.y, 2);
  }
  
  /**
   * @param {{ x: number, y: number }} v 
   */
  static length(v) {
    return Math.sqrt(VectorMath.lengthSqr(v));
  }

  /**
   * @param {{ x: number, y: number }} v
   */
  static unit(v) {
    const magnitude = VectorMath.length(v);
    return (magnitude !== 0)
      ? { x: v.x / magnitude, y: v.y / magnitude }
      : { x: 0, y: 0 };
  }

  /**
   * Gets absolute angle, in degrees, representing the direction of the vector.
   * @param {{ x: number, y: number }} v 
   */
  static angle(v) {
    return Math.atan2(v.x, v.y) * (180 / Math.PI);
  }
}