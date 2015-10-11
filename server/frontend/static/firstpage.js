function start_game(_id){
	window.obstacles = [];
	window.current_id = _id;
	window.distance = 0;
              $.get("/api/latest/path/"+window.current_id).then(function(res){
              	if(res.success)
              	{
                window.distance = res.distance;
                console.log(res.distance);
            }
              });
	$.get("/api/latest/getlayout/"+_id).then(function(res){
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
                alert(res.path);
                path=res.path;
                iterateOverPoints(path);
            }
       });

}