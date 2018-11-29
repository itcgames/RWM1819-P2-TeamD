/**
 * 
 * Floor block
 *  @class
 * 
 */

class FloorBlock {

  constructor() {

    this.rotate = 0;
    this.floor = {x: 800, y:300, w:300, h:60};


  }


  update(dt) {

    this.setRotate(this.rotate += 0.1);

  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    ctx.stroke();
    this.rotation(ctx, this.floor.x, this.floor.y, this.floor.w, this.floor.h, this.rotate);
  //  ctx.fillRect(this.floor.x, this.floor.y, this.floor.w, this.floor.h);
    //ctx.restore();
  }


  
  rotation(ctx, x, y, w, h, r){
    ctx.save()
    ctx.translate(x + (w / 2), y + (h / 2));
    ctx.rotate(r);
    ctx.translate((x + (w / 2)) * -1, (y + (h / 2)) * -1);
    ctx.fillRect(this.floor.x, this.floor.y, this.floor.w, this.floor.h);
    ctx.restore();
  }

  setRotate(r){
    this.rotate = r
  }


}