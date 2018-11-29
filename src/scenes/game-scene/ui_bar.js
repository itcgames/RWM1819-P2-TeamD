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
    this.dragging = false;

    //The y position of our dragging backdrop
    this.dragBackdropY = -75;

    //Our collider for th ebackdrop, this will be used for returning items to the bag
    this.dragBackDropCollider = new Square(0,0, 1920, 75);

    this.flatBoxCollider = new Square(209, 0, 209, 75); //Where we check for clicks on ui bar
    this.flatBox = new Square(0,0, 100, 50);

    this.objDragging = undefined;

    this.dnd = new DragDrop();

    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));

    this.colliders = [this.flatBoxCollider];
    this.boxes = [];
    this.lastDragged = undefined;
  }

  checkDraggable(rect)
  {
    if(this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, rect))
    {
      this.dragging = true; //Set dragging to true
      var box = new Square(this.dnd.mouseX - 50, this.dnd.mouseY - 25,100, 50);
      this.boxes.push(box);
      this.dnd.addDraggable(box);
      return true;
    }
    return false;
  }

  mouseDown(e){
    for(var i in this.colliders){
      if(this.checkDraggable(this.colliders[i])){
        break;
      }
    }

    
    this.dnd.dragstart(e);
  }

  mouseUp(e){
    //If we dropped on the ui bar then remove the item back to our bags
    if(this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, this.dragBackDropCollider))
    {
      //this.dnd.removeTargetDraggable();
    }


    //Call drag end of drag and drop
    this.dnd.dragend(e);

    //Set tto false
    this.dragging = false;
  }

  update(dt){
    //Update drag and drop to move dragged items
    this.dnd.update();

    //If we are dragging
    if(this.dragging){
      //And our ui backdrop is above, then move it down
      if(this.dragBackdropY !== 0){
        this.dragBackdropY = this.lerp(this.dragBackdropY, 0, .25);
      }
    }
    //If we are not dragging
    else{
      //And our ui backdrop is below, then move it up
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
    //Draw our backdrops
    ctx.drawImage(this.uiBackdrop, 0, 0);
    ctx.drawImage(this.uiDragBackdrop, 0, this.dragBackdropY);

    //Draw all of the boxes we have created
    for(var index in this.boxes)
    {
      this.boxes[index].render(ctx);
    }
  }
}