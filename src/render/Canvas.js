/**
 * Initialises the canvas - the drawing surface. The canvas
 * is added to the document. When a HTML document is loaded into a
 * browser, it becomes a document object. This document object is
 * the root node of the HTML document and is considered the 'owner' of all other
 * nodes such as forms, buttons, the canvas etc.
 * @param {string} canvasID Defines the id of the canvas.
 * @param {number} width Defines the width of the canvas.
 * @param {number} height Defines the height of the canvas.
 * @returns {HTMLCanvasElement} returns reference to the created canvas.
 */
function createHTMLCanvas(canvasID, width, height) {
  // Use the document object to create a new element canvas.
  var canvas = document.createElement("canvas");
  // Assign the canvas an id so we can reference it elsewhere.
  canvas.id = canvasID;

  canvas.width = (width === undefined) ? window.innerWidth : width;
  canvas.height = (height === undefined) ? window.innerHeight : height;

  // Adds the canvas element to the document.
  document.body.appendChild(canvas);

  return canvas;
}

/**
 * Represents our target canvas for all draw calls.
 * @class
 * @classdesc Uses the html canvas tag as the target for all draw calls.
 */
class Canvas {
  /**
   * Construct a canvas with the passed id.
   * @constructor
   * @param {String} canvasID Defines the canvas' ID.
   */
  constructor(canvasID) {
    this.htmlCanvas = createHTMLCanvas(canvasID);
    this.context2D = this.htmlCanvas.getContext("2d");
    this.resolution = { x: this.htmlCanvas.width, y: this.htmlCanvas.height };
    this.bgColor = new Color(0, 0, 0, 255);
  }

  /**
   * Clears the html canvas' current content.
   */
  clear() {
    this.context2D.setTransform(1, 0, 0, 1, 0, 0);
    this.context2D.fillStyle = this.bgColor.rgba();
    this.context2D.clearRect(0, 0, this.resolution.x, this.resolution.y);
  }
}