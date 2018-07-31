class Map{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.grid = [];
    for(var xx = 0; xx < x; xx++){
      this.grid[xx] = new Array();
      for(var yy = 0; yy < y; yy++){
        this.grid[xx][yy] = new Diamond;
      }
    }
  }

  isEmptySquare(x,y){
    return !(this.grid[x][y].isOccupied);
  }

}

class BattleMap{
  constructor(mapSize){
    this.diamonds = [];
    this.totalDiamonds = mapSize * mapSize;
    this.grid = [];
    for(var x = 0; x < mapSize; x++){
      this.grid[x] = new Array();
      for(var y = 0; y < mapSize; y++){
        this.grid[x][y] = new Diamond;
      }
    }
    //this.startXX = 0;
    /*
    for (var i = 0; i < this.totalDiamonds; i++) {
      array[i]
    }
    */
  }

  generateGrid(){
    console.log("test " + this.diamonds[0].getGridLocation()[1]);
    for(var x = 0; x < this.diamonds.length; x++){
      this.grid[this.diamonds[x].getGridLocation()[0], this.diamonds[x].getGridLocation()[1]] = this.diamonds[x];
      if(this.grid[this.diamonds[x].getGridLocation()[0], this.diamonds[x].getGridLocation()[1]].getPixelLocation[0] != this.diamonds[x].getPixelLocation[0]){
        console.log("poop");
      }
    }
  }

  generateMap(startX, startY, diamondWidth){
    //draw the top half of the map
    var startXX = startX;
    for(var x = 0; x < mapSize; x++){
      for(var y = 0; y < x+1; y++){
        this.addDiamond(new Diamond(y, Math.abs(y-x), (y-Math.abs(y-x)+1)*(1/2), (x+1)*(1/4)));
      }
      startXX-=(diamondWidth/2);
    }
    startXX+=(diamondWidth/2);
    //draw the second half of the map
    for(var x = mapSize-2; x >=0; x--){
      for(var y = x; y>=0; y--){
        var z = (mapSize-(x-y)-1);
        this.addDiamond(new Diamond(z, (mapSize-1-y), (z-mapSize+2+y)*(1/2), (1/4)*(2*mapSize-x-1)));
      }
      startXX+=(diamondWidth/2);
    }
    //this.generateGrid();
  }

  addDiamond(diamond){
    this.diamonds.push(diamond);
    this.grid[diamond.getGridLocation()[0]][diamond.getGridLocation()[1]] = diamond;
  }


}

class Diamond {
  constructor(xG, yG, xP, yP) {
    this.isOccupied = false;
    this.height = 5;
    this.terrainType = 'dirt';
    this.pixelLocation = [xP, yP]; //The center of the given diamond on the canvas, measured in pixels. Location is relative and scales with different diamondWidth value
    this.gridLocation = [xG, yG]; //The grid coordinates of the diamond, from [0,0] to [mapSize, mapSize]
  }

  getPixelLocation(){
    return this.pixelLocation;
  }

  getGridLocation(){
    return this.gridLocation;
  }
}
