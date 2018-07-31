//Written by Wyatt Dorn

var combatTimer; //Integer tracker for combat rounds
var myMap;
var canvas, canvasWidth, canvasHeight;
var cube;
var diamondWidth;
var mapSize, firstSquare;
var myBattleMap;

function init(){
  firstSquare = [800, 100]; //Starting location for drawing the battle map on the canvas
  mapSize = 5;
  myBattleMap = new BattleMap(mapSize);
  diamondWidth = 200;
  canvasWidth = window.outerWidth * window.devicePixelRatio;
  canvasHeight = window.outerHeight * window.devicePixelRatio;
  canvas = document.getElementById('canvas');
  canvas.style.left = "20px";
  canvas.style.top = "20px";
  canvas.style.position = "absolute";
  canvas.width = 500;//canvasWidth-40;
  canvas.height = 500;//canvasHeight-140;

  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////
  myMap = new Map(10,10);

  generateDummyCreature();
  generateDummyMap();

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////

  draw();

} // end init

function generateDummyCreature(){
  var m = new Meat('fire');
  var b = new Body(m, new Bones('ice'), new Guts('air'));
  b.printElements();
  var creature = new Creature(b);
  creature.setLocation(7,2);
  creature.printLocation();
}

function generateDummyMap(){
  myBattleMap.generateMap(firstSquare[0], firstSquare[1], diamondWidth);
}



function drawISO(ctx){
  var bomb = new Image();
  bomb.src = 'media/images/brown-cube-400.png';
  bomb.onload = function () {
    for(var y = 0; y < 7; y++){
      for(var x = 0; x < 7; x++){
        ctx.drawImage(bomb, 200*x, y*100, 200,200);
        ctx.fillText(x + ", " + y, 100+(200*x), 50+(y*100));
      }
      for(var x = 0; x < 7; x++){
        ctx.drawImage(bomb, (100+(200*x)), 50+(y*100), 200,200);
        ctx.fillText(x + ", " + y, 200+(200*x), 100+(y*100));
      }
    }
  }

  gobbo.onload = function(){
      ctx.drawImage(gobbo, 125, -35, 150, 150);
  }
}

function drawDiamond(ctx){
  ctx.font = 0.15*diamondWidth+"px Arial";
  ctx.fillStyle = "blue";

  var layerStart = firstSquare[0];

  cube = new Image();
  cube.src = 'media/images/brown-cube-400.png';

  //Procs when cube image loads
  cube.onload = function () {
    ctx.drawImage(cube, 0, 0, diamondWidth, diamondWidth);
    for(var i = 0; i < myBattleMap.diamonds.length; i++){
      ctx.drawImage(cube, myBattleMap.diamonds[i].getPixelLocation()[0]-diamondWidth/2, myBattleMap.diamonds[i].getPixelLocation()[1]-diamondWidth/4, diamondWidth, diamondWidth);
      //console.log(myBattleMap.diamonds[i].getPixelLocation()[0] + " , " + myBattleMap.diamonds[i].getPixelLocation()[1]);
    }

    //***********************************************************************
    //draw the top half of the map
    for(var x = 0; x < mapSize; x++){
      for(var y = 0; y < x+1; y++){
        ctx.drawImage(cube, layerStart+(diamondWidth*y), x*(diamondWidth/4)+firstSquare[1], diamondWidth,diamondWidth);
        //console.log(x + ", " + y);//(layerStart[0]+(200*x)) + " , "+ (layerStart[1]+(y*100)));
        console.log(layerStart+(diamondWidth*y));
      }
      for(var y = 0; y < x+1; y++){
        //ctx.fillText(y + ", " + Math.abs(y-x), layerStart+(diamondWidth*y)+75, x*(diamondWidth/4)+50);
        ctx.fillText(y + ", " + Math.abs(y-x), (y-Math.abs(y-x)+1)*(diamondWidth/2)+firstSquare[0], (x+1)*(diamondWidth/4)+firstSquare[1]);
        ctx.beginPath();
        ctx.arc((y-Math.abs(y-x)+1)*(diamondWidth/2)+firstSquare[0], (x+1)*(diamondWidth/4)+firstSquare[1], (2*diamondWidth/(Math.sqrt(5)*4)), 0, 2*Math.PI);
        ctx.stroke();
        //myBattleMap.addDiamond(new Diamond((y-Math.abs(y-x)+1)*(diamondWidth/2)+firstSquare[0], (x+1)*(diamondWidth/4)+firstSquare[1]));
      }
      layerStart-=(diamondWidth/2);
    }
    layerStart+=(diamondWidth/2);
    //draw the second half of the map
    for(var x = mapSize-2; x >=0; x--){
      for(var y = x; y>=0; y--){
        ctx.drawImage(cube, layerStart+(diamondWidth/2)+(diamondWidth*y), (mapSize-1)*(diamondWidth/4)+((diamondWidth/4)*(mapSize-x-1))+firstSquare[1], diamondWidth,diamondWidth);
      }
      for(var y = x; y>=0; y--){
        var z = (mapSize-(x-y)-1);
        ctx.fillText(z + ", " + (mapSize-1-y), (z-(mapSize-1-y))*(diamondWidth/2)+firstSquare[0]+diamondWidth/2, (diamondWidth/4)*(2*mapSize-x-1)+firstSquare[1]);
        ctx.beginPath();
        ctx.arc((z-mapSize+2+y)*(diamondWidth/2)+firstSquare[0], (diamondWidth/4)*(2*mapSize-x-1)+firstSquare[1], (2*diamondWidth/(Math.sqrt(5)*4)), 0, 2*Math.PI);
        ctx.stroke();
        //myBattleMap.addDiamond(new Diamond((z-mapSize+2+y)*(diamondWidth/2)+firstSquare[0], (diamondWidth/4)*(2*mapSize-x-1)+firstSquare[1]));
        //ctx.fillText(z + ", " + (mapSize-1-y), layerStart+(7*diamondWidth/8)+(diamondWidth*y), (mapSize-1)*(diamondWidth/4)+((diamondWidth/4)*(mapSize-x)));
        //ctx.fillText(z + ", " + (mapSize-1-y), layerStart+175+(diamondWidth*y), (mapSize-1)*(diamondWidth/4)+(50*(mapSize-x)));
      }
      layerStart+=(diamondWidth/2);
    }//*************************/
  }
}

function distanceBetweenPoints(x1, y1, x2, y2){
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function toggelSize(){
  console.log(diamondWidth);
  if(diamondWidth==100){
    diamondWidth=200;
  }
  else{
    diamondWidth=100;
  }
  draw();
  console.log(myBattleMap.diamonds.length);
  for(var i = 0; i < myBattleMap.diamonds.length; i++){
    console.log(myBattleMap.diamonds[i].getPixelLocation()[0]);
  }
}

function draw() {
  console.log('draw');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.font = "30px Arial";
    ctx.canvas.height = canvasHeight;
    ctx.canvas.width = canvasWidth;
    ctx.fillStyle = "#000000";//"#303030";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    drawDiamond(ctx);

    var gobbo = new Image();
    gobbo.src = 'media/images/character-sprites/goblin-1.png';

    gobbo.onload = function(){
        ctx.drawImage(gobbo, 725, 175, 150, 150);
        ctx.drawImage(gobbo, 725, 275, 150, 150);
        ctx.drawImage(gobbo, 725, 375, 150, 150);
    }
  }
}
