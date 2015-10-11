function start_game(_id){
	window.obstacles = [];
	window.current_id = _id;
	$.get("/api/latest/getlayout/"+_id).then(function(res){
		window.obstacles = JSON.parse(res.layout);
		$("#welcome_page").addClass("hide").removeClass("show");
		$("#game_starts").removeClass("hide").addClass("show");
		initFunc();
	})
}