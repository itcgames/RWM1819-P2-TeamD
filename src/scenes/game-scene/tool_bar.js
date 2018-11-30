
class toolbar 
{

  constructor() {

    this.playCollider = new Square(1815.5, 0, 104.5, 75);
    this.restartCollider = new Square(1711, 0, 104.5, 75);
    this.trashCollider = new Square(1606.5, 0, 104.5,75);
    this.deleteCollider= new Square(1502, 0, 104.5, 75);
  
    this.btnCol = [this.playCollider, this.restartCollider, 
                      this.deleteCollider, this.trashCollider];
  }

  checkButton(e){
    var mouseRect = {x: e.clientX, y: e.clientY, width: 2, height: 2};
    for(var index in this.btnCol){
      if(this.checkIntersection(this.btnCol[index], mouseRect))
      {
        if(this.btnCol[index] === this.trashCollider)
        {
          return "trash";
        }
        if(this.btnCol[index] === this.restartCollider)
        {
          return "restart";
        }
        if(this.btnCol[index] === this.deleteCollider)
        {
          return "exit";
        }
        if(this.btnCol[index] === this.playCollider)
        {
          return "play";
        }
         
      }
    }
    return "";
  }

  checkIntersection(rectA, rectB)
  {
    if (rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.height + rectA.y > rectB.y) {
        return true;
    }
    return false;
  }

  draw(ctx) {
    for(var index in this.items)
    {
      this.items[index].render(ctx);
    }
  }

}
