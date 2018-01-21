var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('./home/index');
});

/* GET specific game info */
router.get('/games/:id', function(req, res) {
  var gameID = req.params.id;
  db.game_tables.findOne({
    where: {
      id: gameID,
    }, include:[db.reviews_tables]
  }).then(function(data){
    
    var averages = getAverage(data.dataValues.reviews_tables);
    console.log(averages);
    res.render('./home/game', { 
      overallScore: averages[4],
      replayability: averages[2],
      graphics: averages[0],
      soundtrack: averages[3],
      gameTitle: data.name, 
      gameplay: averages[1],
      gameImage: data.image_thumbnail, 
      gameDescription: data.description 
    });
  })
});

/* GET list of all games we have on record */
router.get('/games', function(req, res) {
  console.log("get route"); //this part works
    // console.log(db.game_tables);
    db.game_tables.findAll().then(function(data){
        console.log("/games route working");
        console.log(data);

        

  res.render('./home/gameList', {title: 'game list',  gamesList: data});
  })
});

//route for search results, added by Leo 1.17.18

router.get('/search/:filter', require('../public/javascripts/apiCall').getGames);

var getAverage = function(table){
  var total_graphics_rating = 0;
  var total_game_play_rating = 0;
  var total_replayability_rating = 0;
  var total_soundtrack_rating = 0;

  for (i = 0; i < table.length; i ++){
    var current_graphics_rating = parseInt(table[i].dataValues.graphics_rating);
    var current_game_play_rating = parseInt(table[i].dataValues.game_play_rating);
    var current_replayability_rating = parseInt(table[i].dataValues.replayability);
    var current_soundtrack_rating = parseInt(table[i].dataValues.soundtrack);
    total_graphics_rating += current_graphics_rating;
    total_game_play_rating += current_game_play_rating;
    total_replayability_rating += current_replayability_rating;
    total_soundtrack_rating += current_soundtrack_rating;
  }


  var avg_graphics_rating = total_graphics_rating/table.length;
  var avg_game_play_rating = total_game_play_rating/table.length;
  var avg_replayability_rating = total_replayability_rating/table.length;
  var avg_soundtrack_rating = total_soundtrack_rating/table.length;
  var totalAvg = (avg_graphics_rating + avg_game_play_rating + avg_replayability_rating + avg_soundtrack_rating)/4;

  var avgTable = [];
  avgTable.push(avg_graphics_rating);
  avgTable.push(avg_game_play_rating);
  avgTable.push(avg_replayability_rating);
  avgTable.push(avg_soundtrack_rating);
  avgTable.push(totalAvg);

  return avgTable;
}

module.exports = router;