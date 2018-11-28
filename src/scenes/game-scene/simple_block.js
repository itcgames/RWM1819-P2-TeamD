/**
 * Square block and floor block
 * @class
 * 
 */

 class Block{

  constructor(sPosX, sPosY, sWidth, sHeight)
  {
    this.position = {
      x:sPosX,
      y:sPosY
    };
  //  this.position =10;
  //  this.position =10;
    this.sWidth = 10; 
    this.sHeight = 10;

    this.floor ={x:800, y:300, w:300, h:60};
    this.square ={x:300, y:300, w:100, h:100};
    this
  }

  update(dt)
  {
      this.sPosX = 300;
      this.sPosY = 300;

  }

  draw(ctx) {
    ctx.fillStyle = "#17202A";
    ctx.stroke();
    ctx.fillRect(this.floor.x, this.floor.y, this.floor.w, this.floor.h);
    ctx.fillRect(this.square.x, this.square.y, this.square.w, this.square.h);
    ctx.restore();
    
  }

 }
