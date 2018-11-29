class LevelButton
{
  //Takes in thee rectangle of the image for this button
  constructor(x, y, imageRect){
    this.highlighted = false;
    this.highlightedImg = new Image();
    this.highlightedImg.src = "./src/resources/gui/level_highlight.png"
    this.btnBg = new Image();
    this.btnBg.src = "./src/resources/gui/level_select_icons.png"
    this.srcRect = imageRect;
    this.action = "this.mManager.setCurrentScene('Game')"

    //Position of the button
    this.x = x;
    this.y = y;

    //Setup our collide box for click events
    this.rect = {x: this.x - 65, y: this.y - 65, width: 130, height: 130};

    //Add our mouse move listener
    window.addEventListener("mousemove", this.mouseMoved.bind(this));
  }
  //Is called when the mouse moves, we will check
  //if the mouse is hovering on our button
  mouseClicked(){
    //If we are highlighted and we clicked, return true
    if(this.highlighted){
      return true
    }
    //Else return false
    return false;
  }


  //Is called when the mouse moves, we will check
  //if the mouse is hovering on our button
  mouseMoved(e){
    //Construct a very small rectangle on the mouse position
    var mouseRect = {x: e.clientX - 5, y: e.clientY - 5, width: 2, height: 2};

    //Check if the mouse rect collides with our button rectangle
    //And assign the bool that returns from the function
    this.highlighted = this.collides(this.rect, mouseRect);
  }

  //Simple rectangle collision
  collides(rectA, rectB)
  {
    if (rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.height + rectA.y > rectB.y) {
        return true;
    }
    return false;
  }
  draw(ctx){
    //Draw our level select icon for this level
    ctx.drawImage(this.btnBg, this.srcRect.x, this.srcRect.y, this.srcRect.w, this.srcRect.h,
      this.rect.x, this.rect.y, this.rect.width, this.rect.height);

    if(this.highlighted){
      ctx.drawImage(this.highlightedImg, this.rect.x, this.rect.y);
    }
  }
}