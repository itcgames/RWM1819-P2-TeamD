class UI 
{
  constructor() {
    //Ui Backdrop showing all the items
    this.uiBackdrop = new Image(); 
    this.uiBackdrop.src = "./src/resources/gui/ui_bar.png";

    //The ui backdrop while dragging
    this.uiDragBackdrop = new Image();
    this.uiDragBackdrop.src = "./src/resources/gui/ui_bar_while_dragging.png";

    //Wheter the player is dragging an item from the ui bar or not
    this.dragging = true;
    //The y position of our dragging backdrop
    this.dragBackdropY = -75;

    //Our collider for th ebackdrop, this will be used for returning items to the bag
    this.dragBackDropCollider = new Square(0,0, 1920, 75);
  }

  update(dt){
    if(this.dragging){
      if(this.dragBackdropY !== 0){
        this.dragBackdropY = this.lerp(this.dragBackdropY, 0, .25);
      }
    }
    //If we are not dragging
    else{
      //And our ui backdrop is above
      if(this.dragBackdropY !== 0){
        this.dragBackdropY = this.lerp(this.dragBackdropY, -75, .25);
      }
    }
  }

  //Simple lerp function
  lerp(start, end, dt){
    return (start + dt*(end - start));
  }

  draw(ctx){
    if(this.dragging){ //Draw our  backdrop when dragging
      ctx.drawImage(this.uiDragBackdrop, 0, this.dragBackdropY);
    }
    else{
      ctx.drawImage(this.uiBackdrop, 0, 0);
    }
  }
}