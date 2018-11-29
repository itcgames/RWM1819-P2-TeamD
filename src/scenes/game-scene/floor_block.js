/**
 * 
 * Floor block
 *  @class
 * 
 */

class FloorBlock {

  constructor() {


    this.floor = {x: 800, y:300, w:300, h:60};


  }


  update(dt) {



  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    ctx.stroke();
    ctx.fillRect(this.floor.x, this.floor.y, this.floor.w, this.floor.h);
    ctx.restore();
  }


}