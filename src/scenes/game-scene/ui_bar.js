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

    //Our collider for the backdrop, this will be used for returning items to the bag
    this.dragBackDropCollider = new Square(0,0, 1920, 75);

    //Our colliders for spawning items
    this.boxCollider = new Square(209, 0, 209, 75); //Big block
    this.floorCollider = new Square(418, 0, 209, 75); //Floor block
    this.zCollider = new Square(627, 0, 209, 75); //Z block
    this.fanCollider = new Square(836, 0, 209, 75); //Fan
    this.springCollider = new Square(1045, 0, 209, 75); //Spring
    this.gravCollider = new Square(1254, 0, 209, 75); //Gravity obelisk

    this.flatBox = new Square(0,0, 100, 50);

    this.objDragging = undefined;

    this.dnd = new DragDrop();

    //Bind events for the drag and drop
    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));

    //Add our spawn colliders to our list
    this.colliders = [this.boxCollider, this.floorCollider, this.zCollider,
    this.fanCollider, this.springCollider, this.gravCollider];
    //Holds 
    this.items = [];
    this.lastDragged = undefined;
  }

  checkDraggable(rect)
  {
    if(this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, rect))
    {
      this.dragging = true; //Set dragging to true
      var box = new Square(this.dnd.mouseX - 50, this.dnd.mouseY - 25,100, 50);
      this.items.push(box);
      this.dnd.addDraggable(box);
      this.lastDragged = box;
      return true;
    }
    return false;
  }

  mouseDown(e){
    var isDragged = false;
    for(var i in this.colliders){
      if(this.checkDraggable(this.colliders[i])){
        isDragged = true;
        break;
      }
    }

    //If the spawn colliders were not clicked, check if we
    //are dragging an already spawned object
    if(isDragged === false)
    {
      for(var i in this.items){
        if(this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, this.items[i])){
          this.dragging = true;
          this.lastDragged = this.items[i];
          break;
        }
      }
    }


    
    this.dnd.dragstart(e);
  }

  mouseUp(e){
    if(this.dragging){
      //If we dropped on the ui bar then remove the item back to our bags
      if(this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, this.dragBackDropCollider)){
          this.dnd.removeTargetDraggable(this.lastDragged);
          var indexToDel = this.items.indexOf(this.lastDragged); //Get the index to delete
          this.items.splice(indexToDel, 1); //Remove the last dragged item from the rectangle
      }
    }
    //Call drag end of drag and drop
    this.dnd.dragend(e);

    //Set to false
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
    for(var index in this.items)
    {
      this.items[index].render(ctx);
    }
  }
}