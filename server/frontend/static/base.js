
//CODE FOR THE GAME IN THE MAIN PAGE

var ctx = canvas.getContext("2d"),
    foreground = new Image,
    background = new Image,
    radius = 40;

foreground.onload = initload;
foreground.src = "/static/images/foreground.png";

function initload(){
  ctx.fillStyle = ctx.createPattern(foreground, "repeat");
  ctx.fillRect(0,0,900,500);
  drawObstacles();
  background.onload = setup;
  background.src = "/static/images/background.png"
}
function setup() {
  
  // set image as pattern for fillStyle
  ctx.fillStyle = ctx.createPattern(background, "repeat");
  

  var mouseDown = 0;
  canvas.onmousedown = function() { 
    ++mouseDown;
  }
  canvas.onmouseup = function() {
    --mouseDown;
  }
  // for demo only, reveals image while mousing over canvas with click
  canvas.onmousemove = function(e) {
    if(mouseDown == 1){
      var r = this.getBoundingClientRect(),
      x = e.clientX - r.left,
      y = e.clientY - r.top;
    
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, 2*Math.PI);
      ctx.fill();
    }
  };
}


function drawObstacles(){
  for(var i=0; i<obstacles.length; i++){
    if(_.has(obstacles[i], "circle")){
      drawCircle(obstacles[i]);
    }
    if(_.has(obstacles[i], "box")){
      drawBox(obstacles[i]);
    }
  }
}

function drawCircle(obstacle){
  obstacle = obstacle.circle;
  var img = new Image;
  img.onload = function(){
    ctx.fillStyle = ctx.createPattern(img, "repeat");
    ctx.beginPath();
    ctx.moveTo(obstacle.center.x + radius, obstacle.center.y);
    ctx.arc(obstacle.center.x, obstacle.center.y, obstacle.radius, 0, 2*Math.PI);
    ctx.fill();
  }
  img.src = "/static/images/obs.png";
}

function drawBox(obstacle){
  obstacle = obstacle.box;
  var img = new Image;
  img.onload = function(){
    ctx.fillStyle = ctx.createPattern(img, "repeat");
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.length);
  }
  img.src = "/static/images/obs.png";
}

var obstacles = [
  {"circle": {"radius": 10, "center": {"x": 100, "y": 200}}},
  {"circle": {"radius": 50, "center": {"x": 600, "y": 350}}},
  {"box": {"x": 800, "y": 30, "length": 100, "width": 50}}
]