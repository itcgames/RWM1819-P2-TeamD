/**
 * Clamps a number between 0 and 255
 * @param {number} value any number
 */
function clamp(value) {
  const max = 255;
  const min = 0;

  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
};

/**
 * Represents the red, green, blue and alpha.
 * @class
 * @classdesc Will contain red, green, blue, alpha values clamped between (0, 255)
 */
class Color {
  /**
   * Constructs a 
   * @constructor
   * @param {number} r assigned red value clamped between (0, 255)
   * @param {number} g assigned green value clamped between (0, 255)
   * @param {number} b assigned blue value clamped between (0, 255)
   * @param {number} a assigned alpha value clamped between (0, 255), defaults to 255 if undefined
   */
  constructor(r, g, b, a) {

    this.red = clamp(r);
    this.green = clamp(g);
    this.blue = clamp(b);

    // check if a is undefined,
    //  true: default alpha to 255
    //  false: clamp a param and set to alpha.
    if (a === undefined) {
      this.alpha = 255;
    }
    else {
      this.alpha = clamp(a);
    }
  }

  /**
   * Will return a canvas acceptable fill style.
   * @returns {string} Meant for canvas' 2d context color style using the format "rgba(,,,)".
   */
  rgba() {
    return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
  }
}