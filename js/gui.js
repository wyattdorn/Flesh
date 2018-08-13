class GUI {

  //The gui bar has a border around it (where no buttons will appear) with a width of 1/6 the height of the bar

  constructor(context, canvas, guiBarHeight) {
    //left blank... for now
    this.NWarrow = new Image();
    this.NEarrow = new Image();
    this.SWarrow = new Image();
    this.SEarrow = new Image();
    this.zoomIcon = new Image();
    this.zoomOutIcon = new Image();
    this.zoomInIcon = new Image();

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
    this.zoomOutIcon.src = 'media/images/gui/zoom-out.png';
    this.zoomInIcon.src = 'media/images/gui/zoom-in.png';
  }//end init()

  //Draws bottom bar gui along with all buttons on said bar
  draw(){
    ctx.fillStyle = "#441111";//"#303030";
    ctx.fillRect(0, canvas.height-this.barHeight, canvas.width, this.barHeight);

    this.drawArrows();
    this.drawUnitList();
    this.drawZoomIcon();

  }//end draw()

  //Draws the arrows used to move the indivisual creatures
  drawArrows(){
    ctx.save();
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.translate(this.borderWidth, this.canvas.height  - this.barHeight + this.borderWidth);


    //            images        x-position      y-position       width           heigh
    ctx.drawImage(this.NWarrow, 0,              0,               this.arrowSize, this.arrowSize);
    ctx.drawImage(this.NEarrow, this.arrowSize, 0,               this.arrowSize, this.arrowSize);
    ctx.drawImage(this.SWarrow, 0,              this.arrowSize,  this.arrowSize, this.arrowSize);
    ctx.drawImage(this.SEarrow, this.arrowSize, this.arrowSize,  this.arrowSize, this.arrowSize);
    ctx.fillText(myCreatures[selectedCreature].movesLeft, this.arrowSize-10, this.arrowSize+14);
    ctx.restore();
  }//end drawArrows()

  //Calculates and draws the HP bar for a given creature.
  drawHPBar(creature, x, y){
    ctx.save();
    var percentHP = myCreatures[creature].currentHP/myCreatures[creature].maxHP;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('HP: ' + myCreatures[creature].currentHP+'/'+myCreatures[creature].maxHP, x+105, y+10);
    ctx.fillRect(x+105, y+15, 102, 12);
    //Fill bar with respective amount of HP
    if(percentHP>0.50){
      ctx.fillStyle = "green";
    }
    else if(percentHP>0.25){
      ctx.fillStyle = "yellow";
    }
    else{
      ctx.fillStyle = "red";
    }
    ctx.fillRect(x+106, y+16, percentHP*100, 10);
    ctx.restore;

  }

  //Draws the creature's icon, name, and calls drawHPBar
  drawUnitInfo(creature, x, y){
    ctx.save();
    ctx.font = "20px Arial";
    if(creature == selectedCreature){
      ctx.fillStyle = "white";
    }
    else{
      ctx.fillStyle = "black";
    }
    ctx.drawImage(creatureImages[creature], x, y, 100, 100);
    ctx.fillText(myCreatures[creature].name, x+105, y+50);
    ctx.fillText('Level: ' + myCreatures[creature].level, x+105, y+70);

    this.drawHPBar(creature, x, y);

    ctx.restore;
  }//end drawUnitInfo()

  //Draws a list of the player's creatures in the UI bar.
  //Information printed includes the name, icaon, and HP bar of each creature.
  drawUnitList(){
    ctx.save();
    ctx.translate(2*this.borderWidth + 2*this.arrowSize, this.canvas.height  - this.barHeight + this.borderWidth);

    this.drawUnitInfo(0,0,0);
    this.drawUnitInfo(1,0,105);
    this.drawUnitInfo(2,200,0);
    this.drawUnitInfo(3,200,105);

    //ctx.restore();
  }//end drawUnitList()

  //Draws the zoom in/out icons to the UI Bar
  drawZoomIcon(){
    ctx.save();
    ctx.translate(450, 0);
    ctx.drawImage(this.zoomIcon, 0, 0, 100, 100);
    ctx.restore;
  }

  //Function for handling the logic for zooming in/out on map (needs work)
  zoomInOut(){
    console.log('Zoom it!');
    toggelSize();
    if(diamondWidth==100){
      this.zoomIcon = this.zoomInIcon;
    }
    else{
      this.zoomIcon = this.zoomOutIcon;
    }
    this.drawZoomIcon();
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

    ////////////////////////////////////////////////////////////////////////////
    //  MOVEMENT ARROWS
    //  Width: 2*arrowSize
    ////////////////////////////////////////////////////////////////////////////

    if(x < this.arrowSize){
      if(y < this.arrowSize){
        if(myCreatures[selectedCreature].movesLeft>0){
          moveCharacter(-1,0);
          myCreatures[selectedCreature].movesLeft--;
        }
        return true; //button was successfully clicked
      }
      else if(y < 2*this.arrowSize){
        if(myCreatures[selectedCreature].movesLeft>0){
          moveCharacter(0,1);
          myCreatures[selectedCreature].movesLeft--;
        }
        return true; //button was successfully clicked
      }
    }
    else if(x < 2*this.arrowSize){
      if(y < this.arrowSize){
        if(myCreatures[selectedCreature].movesLeft>0){
          moveCharacter(0,-1);
          myCreatures[selectedCreature].movesLeft--;
        }
        return true; //button was successfully clicked
      }
      else if(y < 2*this.arrowSize){
        if(myCreatures[selectedCreature].movesLeft>0){
          moveCharacter(1,0);
          myCreatures[selectedCreature].movesLeft--;
        }
        return true; //button was successfully clicked
      }
    }

    //Culling x again to move to the right of the previous section
    x -= (this.borderWidth + 2*this.arrowSize);

    ////////////////////////////////////////////////////////////////////////////
    //Creature selection buttons. Creature 0 is always selected by default (for now)
    ////////////////////////////////////////////////////////////////////////////
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

    //Culling x again to move to the right of the previous section
    x -= (450);
    if(x < 100){
      if(y < 100){
        this.zoomInOut();
      }
    }


  }//end clickEvent()

}
