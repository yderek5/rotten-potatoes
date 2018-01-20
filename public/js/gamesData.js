//get list of top ten games


$.get("apiRoutes/api/allGames", function(data){
    // console.log("get");
    var addTable = $("<ul class='list-group game-list'>");
    for (var i = 0; i < data.length; i++){
        addTable.append("<li class='list-group-item game'><span class='badge'>+3.5</span>" + data[i].name + "</li>"); 
        // console.log(addTable); 
    };
    addTable.append("</ul>")
    $("#best-games-list").append(addTable);
});

//get list of worst games
$.get("apiRoutes/api/allGames", function(data){
    var addTable = $("<ul class='list-group game-list'>");
    for (var i = 0; i < data.length; i++){
        addTable.append("<li class='list-group-item game'><span class='badge'>+3.5</span>" + data[i].name + "</li>"); 
        // console.log(addTable); 
    };
    $("#worst-games-list").append(addTable);
})
