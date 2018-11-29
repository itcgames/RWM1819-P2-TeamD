class MenuButton
{
  constructor(x, y, string, action){
    this.btnBg = new Image(); //Create our buttons background image
    this.btnBg.src = "./src/resources/gui/menu_button_bg.png"
    this.text = new Text(string); //Setup a new text object with the string
    this.x = x; //The x position of the background button
    this.y = y; //The x position of the background button
    this.highlighted = false; //Bool to hold if it is highlighted or not
    //Our collision box for the button
    this.rect = {x: this.x - 177, y: this.y - 43, width: 354, height: 86};
    this.action = action; //Action is what this button does, this is a string

    //Add our mouse move listener
    window.addEventListener("mousemove", this.mouseMoved.bind(this));
  }
  //Is called when the mouse moves, we will check
  //if the mouse is hovering on our button
  mouseClicked()
  {
    //If we are highlighted and we clicked, return true
    if(this.highlighted){
      return true
    }
    //Else return false
    return false;
  }


  //Is called when the mouse moves, we will check
  //if the mouse is hovering on our button
  mouseMoved(e)
  {
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
    //Draw the button background
    ctx.drawImage(this.btnBg, this.x - (this.btnBg.width / 2), this.y - (this.btnBg.height / 2));
    //Draw the button text
    //Set the colour green if highlighted, else set it white
    ctx.fillStyle = this.highlighted ? "#71DB7E" : "#FFFFFF";
    ctx.font = "61px Berlin Sans";
    ctx.textAlign = "center"; 
    //Draw text centered on positions passed to it
    //Give it a slight offset on the y to be centered on the button image
    ctx.fillText(this.text.data, this.x, this.y + 15);

    //Debug draw
    //ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }

}