  function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
  this.interval; 
}


GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");
  
  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};


GameOfLife.prototype.step = function(){
  // Here is where you want to loop through all the cells
  // on the board and determine, based on its neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
  var x_arr = [];
  var y_arr = [];
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++){
      if(document.getElementById(x+'-'+y).getAttribute('data-status') == 'alive') {
        y_arr.push(true);
      }
      else {
        y_arr.push(false);
      }
    }
    x_arr.push(y_arr);
    y_arr=[];
  }
  this.paintBoard(x_arr); //jump to paintBoard at this point 
};

GameOfLife.prototype.doesItLive= function(x,y, arr) {
  var count=0;
  //this iterates over the neighboring spaces and counts neighbors 
  for(var i=x-1;i<=x+1;i++) {
    for (var k = y-1; k <= y+1; k++){
      if((i<arr.length) && (i>=0) && (k<arr[i].length) && (k>=0) && (arr[i][k]===true)) {
        if((i!==x) || (k!==y)) {
          count++; 
        }        
      }
    }
  }
  if (arr[x][y]===true){
    if (count === 3 || count === 2) return true;
  }
  else if ((arr[x][y]===false) && (count === 3)) {
    return true;
  }  
  else {
    return false;
  }  
};

GameOfLife.prototype.paintBoard = function(arr){
  for(var x =0, len=arr.length; x<len; x++) {
    for(var y=0, len2=arr[x].length; y<len2; y++) {
      var live = this.doesItLive(x,y, arr);
      if (live){
        document.getElementById(x + '-' + y).className = 'alive';
        document.getElementById(x + '-' + y).setAttribute('data-status', 'alive');
      }
      else {
        document.getElementById(x + '-' + y).className = 'dead';
        document.getElementById(x + '-' + y).setAttribute('data-status', 'dead');
      }
    }
  }
};

GameOfLife.prototype.reset = function(){
  this.pause();
  for(var x=0; x<this.width; x++) {
    for(var y=0; y<this.height; y++) {
      var live = Math.round(Math.random());
      if(live) {
        document.getElementById(x + '-' + y).className = 'alive';
        document.getElementById(x + '-' + y).setAttribute('data-status', 'alive');
      } else {
        document.getElementById(x + '-' + y).className = 'dead';
        document.getElementById(x + '-' + y).setAttribute('data-status', 'dead');
      }
    }
  }
};

GameOfLife.prototype.clear = function(){
  this.pause();
  for(var x=0; x<this.width; x++) {
    for(var y=0; y<this.height; y++) {
      document.getElementById(x + '-' + y).className = 'dead';
      document.getElementById(x + '-' + y).setAttribute('data-status', 'dead');
    }
  }
};

GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  if (typeof this.interval === 'undefined'){
    var self = this; 
    this.interval = setInterval(function(){
      self.step();
    }, 200);
  }
  else {
    clearInterval(this.interval); 
    this.interval = undefined; 
  }
};

GameOfLife.prototype.pause = function(){
    if (typeof this.interval !== undefined){
    clearInterval(this.interval); 
    this.interval = undefined; 
  }
};

//=== LOAD SHAPE OBJECT
GameOfLife.prototype.loadShape = function () {
  this.clear()
  //text is now an array of each row of (0-dot) configurations 
  var text = document.getElementById("shape_info").value.split("\n").filter(function(line) {
    if(line[0]==="!") {
      return false;
    } else {
      return true;
    }
  });

  var board = document.getElementById("board");
  board.removeChild(board.children[0]);  //remove all attributes from the board to facilitate the redraw 
  this.width = text[0].length;
  this.height = text.length;
  this.createAndShowBoard();
  for(var y=0, leny=this.height; y<leny; y++) {
    for(var x=0, lenx = this.width; x<lenx;x++){
      if(text[y][x]==="O") {
        document.getElementById(x + '-' + y).className = 'alive';
        document.getElementById(x + '-' + y).setAttribute('data-status', 'alive');
      }
    }
  }
};


GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board
  
  var onCellClick = function (e) {
    
    // coordinates of cell, in case you need them
    var coord_array = this.id.split('-');
    var coord_hash = {x: coord_array[0], y: coord_array[1]};
    
    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
    }
  };
  
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++){
       var cell00 = document.getElementById(x + '-' + y);
        cell00.onclick = onCellClick; 
    }
  }

  //====== EVENT HANDLERS 

  document.getElementById('step').onclick = this.step.bind(this)
  document.getElementById('auto-play').onclick = this.enableAutoPlay.bind(this)
  document.getElementById('clear').onclick = this.clear.bind(this)
  document.getElementById('reset').onclick = this.reset.bind(this)
  document.getElementById('pause').onclick = this.pause.bind(this)
  document.getElementById('load').onclick = this.loadShape.bind(this) 

};


//=== INITIALIZE GAME OBJECT

var gol = new GameOfLife(20,20);
gol.createAndShowBoard();

