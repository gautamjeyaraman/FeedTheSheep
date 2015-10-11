//Code for Stats. Base.js messes up on this page

/*var path = //[[100, 500], [7, 20], [8, 20], [10, 20], [11, 20], [12, 20], [13, 20], [14, 21], [14, 21], [15, 22], [16, 22], [17, 25], [19, 29], [20, 33], [21, 35], [22, 38], [22, 41], [22, 42], [22, 45], [22, 47], [22, 50], [22, 53], [22, 56], [22, 58], [22, 62], [22, 65], [22, 68], [21, 71], [21, 74], [21, 78], [20, 81], [20, 85], [20, 86], [20, 87], [20, 88]];
[[9, 28], [9, 34], [9, 45], [9, 57], [9, 78], [9, 89], [9, 101], [9, 108], [9, 113], [9, 115], [9, 118], [9, 121], [9, 128], [9, 136], [9, 147], [9, 157], [9, 168], [9, 179], [9, 191], [9, 204], [9, 216], [9, 228], [10, 236], [11, 243], [13, 246], [13, 247], [13, 248], [12, 244], [12, 247], [12, 253], [12, 262], [12, 272], [12, 281], [12, 292], [12, 303], [12, 314], [12, 324], [12, 333], [12, 343], [12, 352], [12, 362], [12, 372], [12, 378], [13, 382], [13, 384], [13, 386], [16, 387], [18, 387], [26, 388], [30, 388], [36, 388], [45, 388], [51, 388], [58, 388], [68, 388], [80, 390], [93, 394], [105, 400], [119, 406], [131, 412], [139, 416], [144, 419], [146, 420], [147, 421], [148, 421], [149, 421], [150, 421], [157, 423], [164, 425], [174, 428], [184, 431], [192, 432], [202, 433], [210, 435], [218, 438], [225, 440], [230, 443], [236, 444], [242, 446], [248, 448], [254, 452], [264, 454], [281, 458], [296, 463], [314, 468], [335, 472], [349, 474], [368, 476], [386, 477], [402, 479], [408, 481], [412, 484], [415, 483], [422, 477], [435, 465], [457, 443], [472, 427], [490, 407], [505, 388], [517, 367], [534, 336], [541, 322], [547, 310], [554, 301], [561, 292], [576, 280], [584, 277], [592, 274], [598, 272], [605, 271], [608, 270], [613, 270], [617, 270], [619, 270], [616, 270], [611, 268], [605, 263], [601, 257], [596, 246], [588, 229], [582, 202], [575, 166], [569, 144], [565, 128], [560, 121], [553, 117], [542, 116], [524, 116], [507, 117], [488, 124], [468, 133], [454, 138], [437, 142], [428, 145], [418, 146], [412, 147], [409, 147], [407, 148], [406, 148], [406, 145], [408, 138], [416, 128], [425, 119], [435, 110], [442, 107], [449, 104], [456, 103], [462, 103], [468, 103], [473, 103], [479, 105], [484, 106], [489, 107], [495, 109], [498, 111]] ;
*/
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
var img = new Image;
function initFunc(){
	img.onload = initload;
	img.src = "/static/images/black.png";
}

function initload(){
	ctx.strokeStyle = ctx.createPattern(img, "repeat");

}


//$(document).ready(function(){iterateOverPoints();});
function iterateOverPoints(path){
	path = JSON.parse(path);
	

	for (i=1; i<path.length; i++){

		var startX = path[i-1][0];
		var startY = path[i-1][1];
		var endX = path[i][0];
		var endY = path[i][1];
		var amount = 0;
/*		setInterval(function() {
		    amount += 0.05; // change to alter duration
		    if (amount > 1) amount = 1;
		    c.clearRect(0, 0, canvas.width, canvas.height);
		    c.strokeStyle = "black";
		    c.moveTo(startX, startY);
		    // lerp : a  + (b - a) * f
		    c.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
		    c.stroke();
		}, 10);*/


		ctx.beginPath();
		//ctx.lineWidth = 30;
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();

	}
}
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
    ctx.beginPath();
    ctx.moveTo(obstacle.center.x + obstacle.radius, obstacle.center.y);
    ctx.arc(obstacle.center.x, obstacle.center.y, obstacle.radius, 0, 2*Math.PI);
    ctx.fillStyle="red";
    ctx.fill();
}

function drawBox(obstacle){
  obstacle = obstacle.box;
    ctx.fillStyle="red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.length);
    
}
function renderBestLayout(number)
{
	window.current_id=number;
	$.get("/api/latest/getlayout/"+window.current_id).then(function(res){
		window.obstacles = JSON.parse(res.layout);
	});
	$.get("/api/latest/path/"+number).then(function(res){
                if(res.success)
                {
                path=res.path;
                $('#highest_percentage_completed').html(res.area);
                document.getElementById("highestScore").innerHTML= "LeastDistanceTravelled: ".concat(res.distance);
                iterateOverPoints(path);
                drawObstacles();
            }
            else
            {
            	window.location.href='/stats_home';
            	alert("No one has submitted a solution to this layout");

            }
       });

}