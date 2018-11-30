class UI {
  constructor() {
    //our text positions for the amount of items available
    this.textPositions = [[220,17], [429, 17], [638, 17], [847, 17], [1056, 17], [1265, 17]];
    this.itemsAvailable = [0, 0, 0, 0, 0, 0];

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
    this.dragBackDropCollider = new Square(0, 0, 1920, 75);

    //Our colliders for spawning items
    this.boxCollider = new Square(209, 0, 209, 75); //Big block
    this.floorCollider = new Square(418, 0, 209, 75); //Floor block
    this.zCollider = new Square(627, 0, 209, 75); //Z block
    this.fanCollider = new Square(836, 0, 209, 75); //Fan
    this.springCollider = new Square(1045, 0, 209, 75); //Spring
    this.gravCollider = new Square(1254, 0, 209, 75); //Gravity obelisk

    //The spring image
    this.springImage = new Image();
    //The spring image source
    this.springImage.src = "./src/resources/spring_anim.png";

    //Variables for a fan
    this.fanImg = new Image();
    this.fanWindImg = new Image();
    this.fanImg.src = "./src/resources/fan_anim.png";
    this.fanWindImg.src = "./src/resources/wind.png";

    //The object we are currently dragging
    this.objDragging = undefined;

    //Create the drag and dropper
    this.dnd = new DragDrop();

    //Bind events for the drag and drop
    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));

    //Add our spawn colliders to our list
    this.colliders = [this.boxCollider, this.floorCollider, this.zCollider,
    this.fanCollider, this.springCollider, this.gravCollider];
    //Holds all of the items in the game, there will be none at the start as the player will have to
    this.items = [];
    //The index of the last item dragged
    this.lastDragged = undefined;

    //The loaded data
    this.data;

    //Keyhandler
    this.kh = new Keyboard();
  }
  setUi(data)
  {
    this.data = data;
    //Set the items available that we can place
    this.itemsAvailable = data.availableBlocks;
  }

  returnAllItems()
  {
    this.items.forEach(function (item) {
      if(item instanceof Spring){
        this.itemsAvailable[4]++;
      }
      else if(item instanceof FloorBlock){
        this.itemsAvailable[1]++;
      }
      else if(item instanceof Block){
        this.itemsAvailable[0]++;
      }
      else if(item instanceof Zblock){
        this.itemsAvailable[2]++;
      }      
      else if(this.lastDragged instanceof Fan){
        this.itemsAvailable[3]++;
      }
    }, this);
  }

  resetUi()
  {
    this.itemsAvailable = data.availableBlocks;
  }

  checkDraggable(rect) {
    if (this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, rect)) {
      this.dragging = true; //Set dragging to true
      var item;
      if(rect == this.springCollider){ //Spawn spring object
        item = new Spring(this.dnd.mouseX - 50, this.dnd.mouseY - 15, this.springImage);
      }
      if(rect == this.boxCollider){
        item = new Block(this.dnd.mouseX - 50, this.dnd.mouseY - 50);
      }
      if(rect == this.floorCollider){
        item = new FloorBlock(this.dnd.mouseX - 150, this.dnd.mouseY - 30);
      }
      if(rect == this.zCollider){
        item = new FloorBlock(this.dnd.mouseX - 150, this.dnd.mouseY - 30); //Needs to be a z block
      }
      if(rect == this.fanCollider){
        item = new Fan(this.dnd.mouseX - 50, this.dnd.mouseY - 15, this.fanImg, this.fanWindImg);
      }
      if(rect == this.gravCollider){
        item = new FloorBlock(this.dnd.mouseX - 150, this.dnd.mouseY - 30); //Needs to be a gravity block thingy
      }

      //Add to our items vector
      this.items.push(item);
      //Push the items rectangle into the rag and drop
      this.dnd.addDraggable(item.rect);
      this.lastDragged = item;
      return true;
    }
    return false;
  }

  mouseDown(e) {
    var isDragged = false;
    //Check if we clicked a spawn collider
    for (var i in this.colliders) {
      if (this.itemsAvailable[i] > 0 && this.checkDraggable(this.colliders[i])) {
        this.itemsAvailable[i]--;
        isDragged = true;
        break;
      }
    }

    //If the spawn colliders were not clicked, check if we
    //are dragging an already spawned object
    if (isDragged === false) {
      for (var i in this.items) {
        if (this.dnd.pointIntersection(this.dnd.mouseX, this.dnd.mouseY, this.items[i].rect)) {
          this.dragging = true;
          this.lastDragged = this.items[i];
          break;
        }
      }
    }



    this.dnd.dragstart(e);
  }

  mouseUp(e) {
    if (this.dragging) {
      var deleteObj = false;
      //If we dropped on the ui bar then remove the item back to our bags
      if (this.dnd.haveIntersection(this.lastDragged.rect, this.dragBackDropCollider)) {
        deleteObj = true;
      }

      //Loop through our items
      for (var i in this.items) {
        if (this.items[i] != this.lastDragged) {
          //If we have dropped an item onto another item, delete it
          if (this.dnd.haveIntersection(this.lastDragged.rect, this.items[i].rect)) {
            deleteObj = true;
          }
        }
      }


      if (deleteObj) {
        //Check what type of object it is and increase the amount we have on our ui
        if(this.lastDragged instanceof Spring){
          this.itemsAvailable[4]++;
        }
        else if(this.lastDragged instanceof FloorBlock){
          this.itemsAvailable[1]++;
        }
        else if(this.lastDragged instanceof Block){
          this.itemsAvailable[0]++;
        }
        else if(this.lastDragged instanceof Zblock){
          this.itemsAvailable[2]++;
        }
        else if(this.lastDragged instanceof Fan){
          this.itemsAvailable[3]++;
        }

        //Need the other classes complete to add the last ones


        this.dnd.removeTargetDraggable(this.lastDragged);
        var indexToDel = this.items.indexOf(this.lastDragged); //Get the index to delete
        this.items.splice(indexToDel, 1); //Remove the last dragged item from the rectangle
        this.lastDragged = undefined;
      }
    }
    //Call drag end of drag and drop
    this.dnd.dragend(e);

    //Set to false
    this.dragging = false;
  }

  update(dt) {
    //Update drag and drop to move dragged items
    this.dnd.update();

    //If we are dragging
    if (this.dragging) {

      if(this.kh.isButtonPressed("E"))
      {
        this.lastDragged.rotate(90);
      }


      //And our ui backdrop is above, then move it down
      if (this.dragBackdropY !== 0) {
        this.dragBackdropY = this.lerp(this.dragBackdropY, 0, .25);
      }
    }
    //If we are not dragging
    else {
      //And our ui backdrop is below, then move it up
      if (this.dragBackdropY !== 0) {
        this.dragBackdropY = this.lerp(this.dragBackdropY, -75, .25);
      }
    }
  
    //Update all of the items we have created
    this.items.forEach(function (item) {
      item.update(dt);
    }, this);
  }

  //Simple lerp function
  lerp(start, end, dt) {
    return (start + dt * (end - start));
  }

  draw(ctx) {
    //Draw our backdrops
    ctx.drawImage(this.uiBackdrop, 0, 0);
    //Draw all of our items left indicatiors
    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.font="20px Berlin Sans";
    //Loop through our text positions
    for(var i in this.textPositions){
      ctx.fillText("x" + this.itemsAvailable[i].toString(), this.textPositions[i][0], this.textPositions[i][1]);
    }
    ctx.drawImage(this.uiDragBackdrop, 0, this.dragBackdropY);

    //Draw all of the items we have created
    this.items.forEach(function (item) {
      item.draw(ctx);
    }, this);
  }
}