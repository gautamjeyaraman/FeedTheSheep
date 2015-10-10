
//CODE FOR THE GAME IN THE MAIN PAGE

var ctx = canvas.getContext("2d"),
    foreground = new Image,
    background = new Image,
    radius = 40;
    var counts = 0;

foreground.onload = initload;
foreground.src = "/static/images/foreground.png";

function initload(){
  ctx.fillStyle = ctx.createPattern(foreground, "repeat");
  ctx.fillRect(0,0,900,500);
  drawObstacles();
}
function setup() {
  
  // set image as pattern for fillStyle
  ctx.fillStyle = ctx.createPattern(background, "repeat");
  

  var mouseDown = 0;
  /*canvas.onmousedown = function() { 
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
  };*/
$( "#draggable" ).mousedown(function(){
	mouseDown = 1;
});
$( "#draggable" ).mouseup(function(){
	mouseDown = 0;
});
$( "#draggable" ).draggable({
      drag: function(e) {
	if(mouseDown == 1)
	{
        counts++;
      var r = canvas.getBoundingClientRect(),
      x = e.clientX - r.left,
      y = e.clientY - r.top;
      for(var i=0;i<obstacles.length;i++)
      {
      	if(_.has(obstacles[i], "circle")){
		obstacle = obstacles[i].circle;
		var distance = Math.sqrt(Math.pow(obstacle.center.x - x,2) + Math.pow(obstacle.center.y - y,2));
		var minimumDistance = obstacle.radius + radius;
		if(distance < minimumDistance)
		{
			return false;
		}
	}
	if(_.has(obstacles[i], "box")){
	    obstacle = obstacles[i].box;

	    var distX = Math.abs(x - obstacle.x-obstacle.width/2);
	    var distY = Math.abs(y - obstacle.y-obstacle.length/2);

	    if (distX > (obstacle.width/2 + radius)) { continue; }
	    if (distY > (obstacle.length/2 + radius)) { continue; }


	    if (distX <= (obstacle.width/2)) { return false; } 
	    if (distY <= (obstacle.length/2)) { return false; }

	    var dx=distX-obstacle.width/2;
	    var dy=distY-obstacle.length/2;
	    if(dx*dx+dy*dy<=(radius*radius)){return false;}
	}
      }
    
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, 2*Math.PI);
      ctx.fill();
      }},
      containment:'#game'
    });
  }
reloadVar = document.getElementById("reload");
reloadVar.onclick = reload;
function reload()
{
alert(counts);
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

  background.onload = setup;
  background.src = "/static/images/background.png"
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
