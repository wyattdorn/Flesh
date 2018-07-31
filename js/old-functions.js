//File for storing old, unused functions for later reference.

//added 7/30/18
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

//added 7/30/18
function distanceBetweenPoints(x1, y1, x2, y2){
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

//added 7/30/18 to retain commented out section
function drawDiamond(ctx){
  ctx.font = 0.15*diamondWidth+"px Arial";
  ctx.fillStyle = "blue";

  var layerStart = firstSquare[0];

  //Procs when cube image loads
  //cube.onload = function () {
    for(var i = 0; i < myBattleMap.diamonds.length; i++){
      ctx.drawImage(cube, myBattleMap.diamonds[i].getPixelLocation()[0]*diamondWidth+firstSquare[0]-diamondWidth/2, myBattleMap.diamonds[i].getPixelLocation()[1]*diamondWidth+firstSquare[1]-diamondWidth/4, diamondWidth, diamondWidth);
      //console.log(myBattleMap.diamonds[i].getPixelLocation()[0] + " , " + myBattleMap.diamonds[i].getPixelLocation()[1]);
    }

    /***********************************************************************
    //draw the top half of the map
    for(var x = 0; x < mapSize; x++){
      for(var y = 0; y < x+1; y++){
        ctx.drawImage(cube, layerStart+(diamondWidth*y), x*(diamondWidth/4)+firstSquare[1], diamondWidth,diamondWidth);
        //console.log(x + ", " + y);//(layerStart[0]+(200*x)) + " , "+ (layerStart[1]+(y*100)));
        console.log(layerStart+(diamondWidth*y));
        ctx.fillText(y + ", " + Math.abs(y-x), (y-Math.abs(y-x)+1)*(diamondWidth/2)+firstSquare[0], (x+1)*(diamondWidth/4)+firstSquare[1]);
        ctx.beginPath();
        ctx.arc((y-Math.abs(y-x)+1)*(diamondWidth/2)+firstSquare[0], (x+1)*(diamondWidth/4)+firstSquare[1], (2*diamondWidth/(Math.sqrt(5)*4)), 0, 2*Math.PI);
        ctx.stroke();
      }
      layerStart-=(diamondWidth/2);
    }
    layerStart+=(diamondWidth/2);
    //draw the second half of the map
    for(var x = mapSize-2; x >=0; x--){
      for(var y = x; y>=0; y--){
        ctx.drawImage(cube, layerStart+(diamondWidth/2)+(diamondWidth*y), (mapSize-1)*(diamondWidth/4)+((diamondWidth/4)*(mapSize-x-1))+firstSquare[1], diamondWidth,diamondWidth);
        var z = (mapSize-(x-y)-1);
        ctx.fillText(z + ", " + (mapSize-1-y), (z-(mapSize-1-y))*(diamondWidth/2)+firstSquare[0]+diamondWidth/2, (diamondWidth/4)*(2*mapSize-x-1)+firstSquare[1]);
        ctx.beginPath();
        ctx.arc((z-mapSize+2+y)*(diamondWidth/2)+firstSquare[0], (diamondWidth/4)*(2*mapSize-x-1)+firstSquare[1], (2*diamondWidth/(Math.sqrt(5)*4)), 0, 2*Math.PI);
        ctx.stroke();
      }
      layerStart+=(diamondWidth/2);
    }*************************/
  //}
}
