
//CODE FOR THE GAME IN THE MAIN PAGE

var path = [];

var ctx = canvas.getContext("2d"),
    foreground = new Image,
    background = new Image,
    radius = 40;
    var counts = 0;

function initFunc(){
  foreground.onload = initload;
  foreground.src = "/static/images/foreground.png";
}


function initload(){
  ctx.fillStyle = ctx.createPattern(foreground, "repeat");
  ctx.fillRect(0,0,900,500);
  drawObstacles();
  
  //$(document).ready(ion.sound.play("voice_of_birds"));
}
$(document).ready(function(){playSounds();});
//$(document).ready(function(){init();});

function playSounds(){

  ion.sound({
    sounds: [
        {name: "beer_can_opening"},
        {name: "bell_ring"},
        {name: "voice_of_birds",
         loop: true
        },
        {name: "sheep_bleat"}
    ],
    path: "/static/sounds/",
    preload: true,
    volume: 1.5,
    
  });


  $(".start_button").on("click", function(){
    ion.sound.play("voice_of_birds");    
  });

  $("#sheep").on("click", function(){
    ion.sound.play("sheep_bleat");
  });
  
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
      document.getElementById("score").innerHTML= "Score: ".concat(counts+" " + window.distance);
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

      path.push([Math.floor(x),Math.floor(y)]);
    
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
  var data = {"path": path,
              "layout_id": window.current_id,
              "distance":  counts,
              "area": 98
              };
  
              if(window.distance==0 || window.distance>counts)
              {
                $.post("/api/latest/path/"+window.current_id, data={"data": JSON.stringify(data)}).then(function(res){
                console.log(res);
              });
        }
}


var done = 0;
function drawObstacles(){
  for(var i=0; i<window.obstacles.length; i++){
    if(_.has(window.obstacles[i], "circle")){
      drawCircle(window.obstacles[i]);
    }
    if(_.has(window.obstacles[i], "box")){
      drawBox(window.obstacles[i]);
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
    done += 1;
    if(done > 1){
      background.onload = setup;
      background.src = "/static/images/background.png"
    }
  }
  img.src = "/static/images/obs.png";
}

function drawBox(obstacle){
  obstacle = obstacle.box;
  var img = new Image;
  img.onload = function(){
    ctx.fillStyle = ctx.createPattern(img, "repeat");
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.length);
    done += 1;
    if(done > 1){
      background.onload = setup;
      background.src = "/static/images/background.png"
    }
  }
  img.src = "/static/images/obs.png";
}
function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
        alert(event.type);
         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }
 
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
 
function init() 
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);    
}

//var obstacles = [{"box": {"y": 409, "width": 15, "length": 63, "x": 176}}, {"circle": {"radius": 23, "center": {"y": 439, "x": 502}}}, {"box": {"y": 271, "width": 148, "length": 57, "x": 364}}, {"circle": {"radius": 78, "center": {"y": 343, "x": 722}}}, {"circle": {"radius": 21, "center": {"y": 310, "x": 454}}}];

//$("#b01").click();
