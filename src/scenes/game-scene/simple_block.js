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

    //Create rect for drag and drop
    this.rect = new Square(sPosX, sPosY, 100, 100);
  }
  
  get aabb() {
    return [
      { x: this.rect.x, y: this.rect.y },
      { x: this.rect.x + this.rect.width, y: this.rect.y },
      { x: this.rect.x + this.rect.width, y: this.rect.y + this.rect.height },
      { x: this.rect.x, y: this.rect.y + this.rect.height }
    ];
  }

  update(dt) {
    
    //this.sPosX = 300;
    //this.sPosY = 300;
   // this.setRotate(this.rotate += 0.1);

  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    //Draw the square
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

    //ctx.stroke();
   
   // this.rotation(ctx, this.square.x, this.square.y, this.square.w, this.square.h, this.rotate);
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
