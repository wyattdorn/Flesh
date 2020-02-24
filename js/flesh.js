//Written by Wyatt Dorn
//Goblin sprite found at: https://gameartpartners.com/downloads/goblin-medieval-character-art/
//Orc sprite found at: http://www.gamebuildingtools.com/product/lumbering-orc-club/
//Fire Elementaql sprite found at: http://wiki.rivalkingdomsgame.com/summons:greater-fire-elemental

const numOfAssets = 3; //Number of assets that must be loaded in before a given scene can be rendered
const guiBarHeight = 300;

var combatTimer; //Integer tracker for combat rounds
//var myMap;
var canvas, canvasWidth, canvasHeight;
var dirtCube, blueCube, creatureImages;
var diamondWidth;
var mapSize, firstSquare;
var myBattleMap;
var ctx;  //canvas context
var creature, myCreatures, enemyCreatures, selectedCreature; //arrays of enemy and allied creatures
var myGUI;  //GUI class instance
var gobo, skeleman; //variables for laoding creature images
var loadCounter; //counter to represent the number of image files properly loaded
var playerTurn; //Bool that indicates whether or not it is the player's turn in combat
var highlightedSquares; //Array of locations to be highlighted for the purposes of determining attack/move ranges

function init(){

  myCreatures = [];
  enemyCreatures = [];
  creatureImages = [];
  mapSize = 5;
  myBattleMap = new BattleMap(mapSize);

  playerTurn = true;
  diamondWidth = 200;
  canvasWidth = 1500;//window.outerWidth * window.devicePixelRatio;
  canvasHeight = 800;//window.innerHeight * window.devicePixelRatio;
  firstSquare = [canvasWidth/2-diamondWidth/2, 100]; //Starting location for drawing the battle map on the canvas
  canvas = document.getElementById('canvas');
  myGUI = new GUI(ctx, canvas, guiBarHeight);
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  canvas.style.position = "absolute";
  canvas.onclick = logMouseClick;



  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////
  //myMap = new Map(10,10);

  generateDummyCreatures();
  generateDummyMap();

  console.log('Canvas height: ' + canvasHeight);
  console.log('guiBarHeight: ' + guiBarHeight);

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////

  loadImages();

  draw();


} //end init()

function logMouseClick(e){
  console.log("Mouse clicked");
  var clickPosition = [];

  //get mouse location at time of click
  e = event || window.event;
  mouseXPos = e.mouseXPos;
  mouseYPos = e.mouseYPos;

  if (mouseXPos === undefined) {
          clickPosition.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    }
  if (mouseYPos === undefined) {
        clickPosition.y = e.clientY;// + document.body.scrollLeft + document.documentElement.scrollLeft;
    }

  if(clickPosition.y> canvas.height - guiBarHeight ){
    guiEventHandler(clickPosition.x, clickPosition.y);
  }

  console.log(clickPosition.y);

  draw();
}//end logMouseClick()

function guiEventHandler(x,y){
  console.log('Clicked in gui');
  myGUI.clickEvent(x,y);
}//end guiEventHandler()

function endTurn(){
  playerTurn = false;
  //disable certain controls
  //perform logic for enemy turn

  console.log('player turn ended');
}//end endTurn()

function startTurn(){
  playerTurn = true;
  myCreatures.forEach(function(element){
    element.movesLeft = element.moveSpeed;
  });
}

function moveCharacter(x,y){
  myCreatures[selectedCreature].setLocation(myCreatures[selectedCreature].location[0]+x, myCreatures[selectedCreature].location[1]+y);
  //creature.setLocation[0,0];
  console.log('move it');
  draw();
}//end moveCharacter()

function generateDummyCreatures(){
  var m = new Meat('fire');
  var b = new Body(m, new Bones('ice'), new Guts('air'));

  selectedCreature = 0;

  //Friendly Creatures
  myCreatures.push(new Creature("Gobbo", b, 'media/images/character-sprites/goblin-1.png'));
  myCreatures.push(new Creature("Goblina", b, 'media/images/character-sprites/goblin-1.png'));
  myCreatures.push(new Creature("Flambo", b, 'media/images/character-sprites/fireelemental-1.png'));
  myCreatures.push(new Creature("Orky", b, 'media/images/character-sprites/orc-1.png'));
  myCreatures[0].setLocation(2,2);
  myCreatures[1].setLocation(0,4);
  myCreatures[2].setLocation(0,3);
  myCreatures[3].setLocation(1,4);

  myCreatures[0].maxHP = 10;
  myCreatures[1].maxHP = 1;
  myCreatures[2].maxHP = 2;
  myCreatures[3].maxHP = 5;

  myCreatures[0].levelUp();
  myCreatures[0].levelUp();
  myCreatures[1].levelUp();
  myCreatures[2].levelUp();
  myCreatures[3].levelUp();

  myCreatures[0].movesLeft--;

  //Enemy Creatures
  enemyCreatures.push(new Creature("Skelbo", b));
  enemyCreatures.push(new Creature("Skelki", b));
  enemyCreatures.push(new Creature("Skelontonovich", b));
  enemyCreatures[0].setLocation(4,1);
  enemyCreatures[1].setLocation(4,0);
  enemyCreatures[2].setLocation(3,0);
  //drawCreatures();
}

function generateDummyMap(){
  myBattleMap.generateMap(firstSquare[0], firstSquare[1], diamondWidth);
}

//unused function
function populateMap(){

}

function drawDiamond(ctx){
  ctx.font = 0.15*diamondWidth+"px Arial";
  ctx.fillStyle = "blue";

  var layerStart = firstSquare[0];

  for(var i = 0; i < myBattleMap.diamonds.length; i++){
    if(myBattleMap.diamonds[i].terrainType=='dirt'){
      ctx.drawImage(dirtCube, myBattleMap.diamonds[i].getPixelLocation()[0]*diamondWidth+firstSquare[0]-diamondWidth/2, myBattleMap.diamonds[i].getPixelLocation()[1]*diamondWidth+firstSquare[1]-diamondWidth/4, diamondWidth, diamondWidth);
    }
    else if(myBattleMap.diamonds[i].terrainType=='blue'){
      ctx.drawImage(blueCube, myBattleMap.diamonds[i].getPixelLocation()[0]*diamondWidth+firstSquare[0]-diamondWidth/2, myBattleMap.diamonds[i].getPixelLocation()[1]*diamondWidth+firstSquare[1]-diamondWidth/4, diamondWidth, diamondWidth);
    }
  }
}

//Zooms the map in/out. Tied to the 'zoom in/out' text in the html
function toggelSize(){
  console.log(diamondWidth);
  if(diamondWidth==100){
    diamondWidth=200;
  }
  else{
    diamondWidth=100;
  }
  draw();
}

function loadImages(){
  loadCounter = 0; //counter to measure if/when all images have been loaded
  gobbo = new Image();
  skeleman = new Image();
  //different cube images for diffenent terrain types
  dirtCube = new Image();
  blueCube = new Image();

  for(var x = 0; x < myCreatures.length; x++){
    //gobbo.src =
    //creatureImages[x] = gobbo;
    creatureImages[x] = new Image();
    creatureImages[x].src = '' + myCreatures[x].imgSrc;
  }


  //gobbo.src = 'media/images/character-sprites/goblin-1.png';
  skeleman.src = 'media/images/character-sprites/skeleman-1.png';
  dirtCube.src = 'media/images/brown-cube-400.png';
  blueCube.src = 'media/images/cube.png';

  gobbo.onload = function(){
    loadCounter++;
    //console.log("Goblin loaded");
  }
  skeleman.onload = function(){
    loadCounter++;
    //console.log("Skeleman loaded");
  }
  dirtCube.onload = function(){
    loadCounter++;
    //console.log("Cube loaded");
  }
  blueCube.onload = function(){
    loadCounter++;
    //console.log("Cube loaded");
  }

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  else{
    return false;
  }
  console.log("Entering loop");

  let timerId = setInterval(function(){
      if(loadScreenCheck==true){
        console.log("Good news!");
        setTimeout(() => { clearInterval(timerId); alert('stop'); }, 100);
      }
    },100);
}

//LoadScreen() checks if the number of loaded assets is equal to the number of required
//assets for the scene. The function waits 300ms before returning a boolean response.
function loadScreenCheck(){
  var isLoaded = true;
  setTimeout(function(){
    if(loadCounter < numOfAssets){
      isLoaded = false;
      //loadScreenCheck();
    }
    console.log(loadCounter + " fire " + isLoaded);
    return isLoaded;
  },100);
}

function highlightSquare(ctx, x, y){
  ctx.fillStyle = "#7EC0EE";
  ctx.beginPath();
  //myBattleMap.diamonds[0,0].pixelLocation[0];
  //console.log(myBattleMap.grid[x][y].getPixelLocation()[0]*diamondWidth+firstSquare[0]-diamondWidth/2+','+myBattleMap.grid[x][y].getPixelLocation()[1]*diamondWidth+firstSquare[1]-diamondWidth/4);
  ctx.arc(myBattleMap.grid[x][y].getPixelLocation()[0]*diamondWidth+firstSquare[0], myBattleMap.grid[x][y].getPixelLocation()[1]*diamondWidth+firstSquare[1],diamondWidth/4,0,2*Math.PI);
  ctx.fill();
}

function draw() {
  console.log('draw');

  ctx.font = "30px Arial";
  ctx.canvas.height = canvasHeight;
  ctx.canvas.width = canvasWidth;
  ctx.fillStyle = "#051005";//"#303030";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawDiamond(ctx);
  highlightSquare(ctx,myCreatures[selectedCreature].location[0],myCreatures[selectedCreature].location[1] );
  drawCreatures();

  myGUI.draw();
}

//Draws all friendly and enemy creatures on the battle map.
//Creatures are drawn in order, back to front.
function drawCreatures(){
  var goblinWidth = 3*diamondWidth/4;
  gobbo.src = 'media/images/character-sprites/goblin-1.png';
  skeleman.src = 'media/images/character-sprites/skeleman-1.png';
  for(var j = 0; j<mapSize+mapSize; j++){
    for(var i = 0; i < myCreatures.length; i++){
      if(myCreatures[i].location[0] + myCreatures[i].location[1] == j){
        //console.log(myCreatures[i].location[0] + " , " + myCreatures[i].location[1]);
        //gobbo.src = myCreatures[i].imgSrc;
        ctx.drawImage(creatureImages[i], myBattleMap.grid[myCreatures[i].location[0]][ myCreatures[i].location[1]].getPixelLocation()[0]*diamondWidth + firstSquare[0] - goblinWidth + diamondWidth/2, myBattleMap.grid[myCreatures[i].location[0]][ myCreatures[i].location[1]].getPixelLocation()[1]*diamondWidth -(7*goblinWidth/6) + firstSquare[1] + diamondWidth/4, goblinWidth, goblinWidth);
      }
    }
    for(var i = 0; i < enemyCreatures.length; i++){
      if(enemyCreatures[i].location[0] + enemyCreatures[i].location[1] == j){
        //console.log(myCreatures[i].location[0] + myCreatures[i].location[1]);
        ctx.drawImage(skeleman, myBattleMap.grid[enemyCreatures[i].location[0]][ enemyCreatures[i].location[1]].getPixelLocation()[0]*diamondWidth + firstSquare[0] - goblinWidth + diamondWidth/3, myBattleMap.grid[enemyCreatures[i].location[0]][ enemyCreatures[i].location[1]].getPixelLocation()[1]*diamondWidth -(7*goblinWidth/6) + firstSquare[1] + diamondWidth/4, goblinWidth, goblinWidth);
      }
    }
  }
}

function setGoblinLocation(x,y){
  myCreatures[selectedCreature].setLocation(x,y);
  draw();
}
