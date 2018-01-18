//get list of top ten games
$.get("apiRoutes/api/topTenGames", function(data){
    var addTable = $("<ul>");
    for (var i = 0; i < data.length; i++){
        addTable.append("<li>" + data[i].name + "</li>"); 
        console.log(addTable); 
    };
    $("#best-games-list").append(addTable);
});

//get list of worst games
$.get("apiRoutes/api/worstGames", function(data){
    var addTable = $("<ul>");
    for (var i = 0; i < data.length; i++){
        addTable.append("<li>" + data[i].name + "</li>"); 
        console.log(addTable); 
    };
    $("#worst-games-list").append(addTable);
})
