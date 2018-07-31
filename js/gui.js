class GUI {

  //The gui bar has a border around it (where no buttons will appear) with a width of 1/6 the height of the bar

  constructor(context, canvas, guiBarHeight) {
    //left blank... for now
    this.NWarrow = new Image();
    this.NEarrow = new Image();
    this.SWarrow = new Image();
    this.SEarrow = new Image();

    this.ctx = context;
    this.canvas = canvas;
    this.barHeight = guiBarHeight;

    this.init();

  }

  //called by constructor to initiallize variable values
  init(){
    this.barWidth = this.canvas.width;
    this.borderWidth = this.barHeight/6;
    this.arrowSize = this.barHeight/3;
    this.characterIconSize = [205, 105];

    this.localOrigin = [0, this.canvas.height-this.barHeight];
    this.NWarrow.src = 'media/images/gui/NW-arrow.png';
    this.NEarrow.src = 'media/images/gui/NE-arrow.png';
    this.SWarrow.src = 'media/images/gui/SW-arrow.png';
    this.SEarrow.src = 'media/images/gui/SE-arrow.png';
  }//end init()

  //Draws bottom bar gui along with all buttons on said bar
  draw(){
    ctx.fillStyle = "#441111";//"#303030";
    ctx.fillRect(0, canvas.height-this.barHeight, canvas.width, this.barHeight);

    this.drawArrows();
    this.drawUnitList();

  }//end draw()

  drawArrows(){
    ctx.save();
    ctx.translate(this.borderWidth, this.canvas.height  - this.barHeight + this.borderWidth);


    //            images        x-position      y-position       width           heigh
    ctx.drawImage(this.NWarrow, 0,              0,               this.arrowSize, this.arrowSize);
    ctx.drawImage(this.NEarrow, this.arrowSize, 0,               this.arrowSize, this.arrowSize);
    ctx.drawImage(this.SWarrow, 0,              this.arrowSize,  this.arrowSize, this.arrowSize);
    ctx.drawImage(this.SEarrow, this.arrowSize, this.arrowSize,  this.arrowSize, this.arrowSize);

    ctx.restore();
  }

  drawUnitList(){
    ctx.save();
    ctx.translate(2*this.borderWidth + 2*this.arrowSize, this.canvas.height  - this.barHeight + this.borderWidth);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";

    ctx.drawImage(creatureImages[0], 0,0,100,100);
    ctx.fillText(myCreatures[0].name,105,50);

    ctx.drawImage(creatureImages[1], 0,105,100,100);
    ctx.fillText(myCreatures[1].name,105,155);

    ctx.translate(200,0);

    ctx.drawImage(creatureImages[2], 0,0,100,100);
    ctx.fillText(myCreatures[2].name,105,50);

    ctx.drawImage(creatureImages[3], 0,105,100,100);
    ctx.fillText(myCreatures[3].name,105,155);

    //ctx.drawImage(gobbo, 105,0,100,100);
    //ctx.drawImage(gobbo, 105,105,100,100);

    ctx.restore();

  }

  //handles logic when a click event occurs in the gui
  clickEvent(x, y){
    //For the sake of ease, the x and y positions will be culled to reflect their distance from the local origin
    y = y - this.canvas.height + this.barHeight;
    console.log('relative y: ' + y);

    //first check that the click did not occur in the 'border region'
    if(x <= this.borderWidth || x >= this.canvas.width - this.borderWidth ||
      y <= this.borderWidth || y >= this.barHeight - this.borderWidth ){
      console.log('Clicked border area of GUI');
      return false; //exits and returns false if area clicked contains no buttons
    }

    //Culling x and y values again to exist within the bordered region
    x -= this.borderWidth;
    y -= this.borderWidth;

    if(x < this.arrowSize){
      if(y < this.arrowSize){
        moveCharacter(-1,0);
        return true; //button was successfully clicked
      }
      else if(y < 2*this.arrowSize){
        moveCharacter(0,1);
        return true; //button was successfully clicked
      }
    }
    else if(x < 2*this.arrowSize){
      if(y < this.arrowSize){
        moveCharacter(0,-1);
        return true; //button was successfully clicked
      }
      else if(y < 2*this.arrowSize){
        moveCharacter(1,0);
        return true; //button was successfully clicked
      }
    }
    //Culling x again to move to th3e right of the previous section
    x -= (this.borderWidth + 2*this.arrowSize);

    if(x < this.characterIconSize[0]){
      if(y < this.characterIconSize[1]){
        selectedCreature = 0;
        console.log('Selected: ' + myCreatures[selectedCreature].name);
        return true; //button was successfully clicked
      }
      else if(y < 2*this.characterIconSize[1]){
        selectedCreature = 1;
        console.log('Selected: ' + myCreatures[selectedCreature].name);
        return true; //button was successfully clicked
      }
    }
    else if(x < 2*this.characterIconSize[0]){
      if(y < this.characterIconSize[1]){
        selectedCreature = 2;
        console.log('Selected: ' + myCreatures[selectedCreature].name);
        return true; //button was successfully clicked
      }
      else if(y < 2*this.characterIconSize[1]){
        selectedCreature = 3;
        console.log('Selected: ' + myCreatures[selectedCreature].name);
        return true; //button was successfully clicked
      }
    }


  }//end clickEvent()

}
