/**
 * 
 * Floor block
 *  @class
 * 
 */

class FloorBlock {

  constructor(x, y) {

    this.rotate = 0;

    //Create square for drag and drop
    this.rect = new Square(x, y, 300, 60);
    

  }


  update(dt) {

    //this.setRotate(this.rotate += 0.1);

  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    //Draw the square
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    //ctx.stroke();
    //this.rotation(ctx, this.floor.x, this.floor.y, this.floor.w, this.floor.h, this.rotate);
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