const zero = { x: 0, y: 0 };

class VectorMath {

  static get zero() { return zero; }

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
    return (VectorMath.toDeg(Math.atan2(v.x, v.y)));
  }

  /**
   * Clamps angle between 360 and -360.
   * @param {number} angle in degrees
   */
  static clampAngle(angle) {
    while (angle >= 360) { angle -= 360; }
    while (angle <= -360) { angle += 360; }
    return angle;
  }

  /**
   * Gets the heading vector
   * @param {number} angle in degrees
   */
  static vector(angle) {
    const rad = VectorMath.toRad(angle);
    return { x: Math.cos(rad), y: Math.sin(rad) };
  }

  /**
   * @param {number} angle in degress
   * @returns {number} angle in radians
   */
  static toRad(angle) {
    return angle * (Math.PI / 180);
  }

  /**
   * @param {number} angle in radians
   * @returns {number} angle in degrees
   */
  static toDeg(angle) {
    return angle * (180 / Math.PI);
  }

  /**
   * Rotates vector around origin by angle.
   * @param {{ x: number, y: number }} vector 
   * @param {{ x: number, y: number }} origin 
   * @param {number} angle in degrees.
   * @returns {{ x: number, y: number }}
   */
  static rotateVector(vector, origin, angle) {
    const rad = VectorMath.toRad(angle);
    const cosine = Math.cos(rad);
    const sine = Math.sin(rad);
    return {
      x: (cosine * (vector.x - origin.x)) - (sine * (vector.y - origin.y)) + origin.x,
      y: (sine * (vector.x - origin.x)) + (cosine * (vector.y - origin.y)) + origin.y
    };
  }

  /**
   * Rotates vector around origin by angle
   * @param {{ x: number, y: number }} vector 
   * @param {{ x: number, y: number }} origin 
   * @param {number} angle in radians
   * @returns {{ x: number, y: number }}
   */
  static rotateVectorRad(vector, origin, angle) {
    return {
      x: Math.cos(angle) * (vector.x - origin.x) - Math.sin(angle) * (vector.y - origin.y) + origin.x,
      y: Math.sin(angle) * (vector.x - origin.x) + Math.cos(angle) * (vector.y - origin.y) + origin.y
    };
  }

  /**
   * @param {{ x: number, y: number }} v 
   */
  static negate(v) {
    return { x: -v.x, y: -v.y };
  }

  /**
   * @param {{ x: number, y: number }} left 2d vector
   * @param {{ x: number, y: number }} right 2d vector
   */
  static dot(left, right) {
    return (left.x * right.x) + (left.y * right.y);
  }
}