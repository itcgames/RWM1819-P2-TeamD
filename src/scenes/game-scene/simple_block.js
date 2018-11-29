/**
 * Square block
 * @class
 * 
 */

class Block {

  constructor(sPosX, sPosY, sWidth, sHeight) {
    this.position = {
      x: sPosX,
      y: sPosY
    };
    //  this.position =10;
    //  this.position =10;
    this.sWidth = 10;
    this.sHeight = 10;

    this.square = { x: 300, y: 300, w: 100, h: 100 };
    


  }

  update(dt) {
    this.sPosX = 300;
    this.sPosY = 300;

  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    ctx.stroke();
   
    ctx.fillRect(this.square.x, this.square.y, this.square.w, this.square.h);
 
    ctx.restore();

  }

}
