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
    this.rotate = 0;

    this.square = { x: 300, y: 300, w: 100, h: 100 };
    


  }

  update(dt) {
    this.sPosX = 300;
    this.sPosY = 300;
    this.setRotate(this.rotate += 0.1);

  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    ctx.stroke();
   
    this.rotation(ctx, this.square.x, this.square.y, this.square.w, this.square.h, this.rotate);
    //ctx.fillRect(this.square.x, this.square.y, this.square.w, this.square.h);
    
  

  }

  rotation(ctx, x, y, w, h, r){
    ctx.save()
    ctx.translate(x + (w / 2), y + (h / 2));
    ctx.rotate(r);
    ctx.translate((x + (w / 2)) * -1, (y + (h / 2)) * -1);
    ctx.fillRect(this.square.x, this.square.y, this.square.w, this.square.h);
    ctx.restore();
  }

  setRotate(r){
    this.rotate = r
  }

}
