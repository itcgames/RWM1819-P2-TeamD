/**
 * Z block
 * @class
 * 
 */

class Zblock {

  constructor(x, y) {

    this.rotate = 0;
   // this.rect = new Square(x, y, 60, 80);

    //Mid
    this.rect1 = new Square(x, y, 60, 80 );
    //Top
    this.rect2 = new Square (x+ 90, y- 40, 150, 60);
    //Bottom
    this.rect3 = new Square(x, y +40, 150, 60);

  }

  get aabb() {
    return [
      { x: this.rect1.x, y: this.rect1.y },
      { x: this.rect1.x + this.rect1.width, y: this.rect1.y },
      { x: this.rect1.x + this.rect1.width, y: this.rect1.y + this.rect1.height },
      { x: this.rect1.x, y: this.rect1.y + this.rect1.height }
    ];
  }

  get aabb2() {
    return [
      { x: this.rect2.x, y: this.rect2.y },
      { x: this.rect2.x + this.rect2.width, y: this.rect2.y },
      { x: this.rect2.x + this.rect2.width, y: this.rect2.y + this.rect2.height },
      { x: this.rect2.x, y: this.rect2.y + this.rect2.height }
    ];
  }

  get aabb3() {
    return [
      { x: this.rect3.x, y: this.rect3.y },
      { x: this.rect3.x + this.rect3.width, y: this.rect3.y },
      { x: this.rect3.x + this.rect3.width, y: this.rect3.y + this.rect3.height },
      { x: this.rect3.x, y: this.rect3.y + this.rect3.height }
    ];
  }




  update() {

    //keep top and bottom offset from mid
    this.rect2.x = this.rect1.x - 90;
    this.rect2.y = this.rect1.y - 40;
    this.rect3.x = this.rect1.x;
    this.rect3.y = this.rect1.y + 40;

    this.rect1.x += 1;
    this.setRotate(this.rotate += 0.1);

  }

  draw(ctx) {

    ctx.fillStyle = "#17202A";
    ctx.stroke();

    //this.rotation(ctx, this.rect1.x, this.rect1.y, this.rect1.w, this.rect1.h, this.rotate);
    //this.rotation(ctx, this.rect2.x, this.rect2.y, this.rect2.w, this.rect2.h, this.rotate);
    //this.rotation(ctx, this.rect3.x, this.rect3.y, this.rect3.w, this.rect3.h, this.rotate);

    ctx.fillRect(this.rect1.x, this.rect1.y, this.rect1.w, this.rect1.h);
    ctx.fillRect(this.rect2.x, this.rect2.y, this.rect2.w, this.rect2.h);
    ctx.fillRect(this.rect3.x, this.rect3.y, this.rect3.w, this.rect3.h);
    ctx.restore();
  }

  rotation(ctx, x, y, w, h, r){
    ctx.save()
    ctx.translate(this.rect1.x + (this.rect1.w / 2), this.rect1.y + (this.rect1.h / 2));
    ctx.rotate(r);
    ctx.translate((this.rect1.x + (this.rect1.w / 2)) * -1, (this.rect1.y + (this.rect1.h / 2)) * -1);
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  setRotate(r){
    this.rotate1 = r
    this.rotate2 = r
    this.rotate3 = r
  }



}