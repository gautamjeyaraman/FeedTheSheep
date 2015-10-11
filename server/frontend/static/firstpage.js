function start_game(_id){
	window.obstacles = [];
  if(_id !== undefined)
  {
	 window.current_id = _id;
  }
	window.distance = 0;
  window.area = 0;
              $.get("/api/latest/path/"+window.current_id).then(function(res){
              	if(res.success)
              	{
                window.distance = res.distance;
                window.area = res.area;
                $('#highest_percentage_completed').html(window.area);
                document.getElementById("highestScore").innerHTML= "LeastDistanceTravelled: ".concat(window.distance);
                document.getElementById("score").innerHTML= "DistanceTravelled: ".concat(0);
                $('#percentage_completed').html(0);
                $('#draggable').css("left", "15px");
                $('#draggable').css("top", "0px");


            }
              });
	$.get("/api/latest/getlayout/"+window.current_id).then(function(res){
		window.obstacles = JSON.parse(res.layout);
		$("#welcome_page").addClass("hide").removeClass("show");
		$("#game_starts").removeClass("hide").addClass("show");
		initFunc();
	})
}
function stats_onload()
{
		window.location.href = '/stats/' + window.current_id;
}
function renderBestLayout(number)
{
	$.get("/api/latest/path/"+number).then(function(res){
                if(res.success)
                {
                path=res.path;
                iterateOverPoints(path);
            }
       });

}