console.log("loaded");

$.get("/api/topTenGames", function(data){
    for (var i = 0; i < data.length; i++){
        var gameList = "<li>";
        gameList.append(data[i]);
        $("#best-games-list").append(gameList);
    }
})