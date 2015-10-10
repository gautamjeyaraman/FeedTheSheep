
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
  
  //$(document).ready(ion.sound.play("voice_of_birds"));
}
$(document).ready(function(){playSounds();});

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
  

  /*var mouseDown = 0;
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
  };*/
$( "#draggable" ).draggable({
      drag: function(e) {
        counts++;
      var r = canvas.getBoundingClientRect(),
      x = e.clientX - r.left,
      y = e.clientY - r.top;
    
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, 2*Math.PI);
      ctx.fill();
      },
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


/*var obstacles = [
  {"circle": {"radius": 10, "center": {"x": 100, "y": 200}}},
  {"circle": {"radius": 50, "center": {"x": 600, "y": 350}}},
  {"box": {"x": 800, "y": 30, "length": 100, "width": 50}}
]*/


//$("#b01").click();

var obstacles = [{"box": {"y": 409, "width": 15, "length": 63, "x": 176}}, {"circle": {"radius": 23, "center": {"y": 439, "x": 502}}}, {"box": {"y": 271, "width": 148, "length": 57, "x": 364}}, {"circle": {"radius": 78, "center": {"y": 343, "x": 722}}}, {"circle": {"radius": 21, "center": {"y": 310, "x": 454}}}];
