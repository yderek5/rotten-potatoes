
module.exports = function(app,passport){


  var express = require('express');
  var router = express.Router();
  var db = require('../models');
  var bestGames = [];
  var worstGames = [];
  var bestGamesList

  /* GET home page. */
  router.get('/', function(req, res) {

    db.game_tables.findAll({
      limit: 10,
      order: [['original_release_date', 'DESC']]
    }).then(function(data){
      db.average_table.findAll({
        order: [['average']]
      }).then(function(childData){
        var worstTable = getSortedTable(childData);
        var bestTable = getSortedTable(childData.reverse());

        var firstname = '';
        if(req.user){
          firstname = req.user.firstname;
        }

        res.render('./home/index', {topTen: bestTable, worstGames: worstTable, newGames: data, loggedin: req.isAuthenticated(),firstname: firstname});

      })
      
    })

    var getSortedTable = function(data){
      var tableGameId = [];
      var table = [];

      for (i = 0; i < data.length; i++){
        var dataExists = tableGameId.indexOf(data[i].dataValues.gameId);
        if (dataExists === -1){
          if (table.length < 10){
            table.push({gameId: data[i].dataValues.gameId, gameName: data[i].dataValues.gameName, average: data[i].dataValues.average})
            tableGameId.push(data[i].dataValues.gameId);
          }
        }
      };
      return table;
    }
  });

  /* GET specific game info */
  router.get('/games/:id', function(req, res) {
    var gameID = req.params.id;
    db.game_tables.findOne({
      where: {
        id: gameID,
      }, include:[db.reviews_tables]
    }).then(function(data){
      
      var firstname = '';
      if(req.user){
        firstname = req.user.firstname;
      }


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
        gameDescription: data.description, 
        gameid: gameID,

        loggedin: req.isAuthenticated(),
        firstname: firstname
      });
    })
  });

  /* GET list of all games we have on record */
  router.get('/games', function(req, res) {
    console.log("get route"); //this part works
      // console.log(db.game_tables);
      var firstname = '';
      if(req.user){
        firstname = req.user.firstname;
      }
      db.game_tables.findAll({
        attributes: ['name', 'description', 'image_thumbnail', 'id'],
        order: [['name']],
      }).then(function(data){
    res.render('./home/gameList', {title: 'game list',  gamesList: data, loggedin: req.isAuthenticated(),firstname: firstname});
    })
  });

  //route for search results, added by Leo 1.17.18

  router.get('/search/:filter', require('../public/javascripts/apiCall').getGames);


  /* DISPLAY ACCOUNT DETAILS */
  router.get('/account',function(req, res) {

    db.reviews_tables.findAll({
        where: {
            userId: req.user.id,
        }, include: [db.game_tables],
    }).then(function(data){
      console.log(data)
      var firstname = '';
      if(req.user){
        firstname = req.user.firstname;
      }
      res.render('./users/show', {user:req.user, loggedin:req.isAuthenticated(), firstname:req.user.firstname, reviewsList: data});
    })
  });

  /* LOGOUT */
  router.get('/logout',function(req, res) {
      req.logout();
      res.render('./logout/logout');
  });


  //function to get the average ratings of all reviews for a specific game
  var getAverage = function(table){
    var total_graphics_rating = 0;
    var total_game_play_rating = 0;
    var total_replayability_rating = 0;
    var total_soundtrack_rating = 0;
    var total_average = 0;

    for (i = 0; i < table.length; i ++){
      var current_graphics_rating = parseInt(table[i].dataValues.graphics_rating);
      var current_game_play_rating = parseInt(table[i].dataValues.game_play_rating);
      var current_replayability_rating = parseInt(table[i].dataValues.replayability);
      var current_soundtrack_rating = parseInt(table[i].dataValues.soundtrack);
      var current_average = parseInt(table[i].dataValues.average);
      total_graphics_rating += current_graphics_rating;
      total_game_play_rating += current_game_play_rating;
      total_replayability_rating += current_replayability_rating;
      total_soundtrack_rating += current_soundtrack_rating;
      total_average += current_average;
    }


    var avg_graphics_rating = total_graphics_rating/table.length;
    var avg_game_play_rating = total_game_play_rating/table.length;
    var avg_replayability_rating = total_replayability_rating/table.length;
    var avg_soundtrack_rating = total_soundtrack_rating/table.length;
    var avg_average = total_average/table.length

    var avgTable = [];
    avgTable.push(avg_graphics_rating);
    avgTable.push(avg_game_play_rating);
    avgTable.push(avg_replayability_rating);
    avgTable.push(avg_soundtrack_rating);
    avgTable.push(avg_average);

    return avgTable;
  }

  //funciton to get top ten gameIDs from the reviews table
  var getGamesArray= function(data){
    var gamesList = [];
    var indexGame = 0;
    for (var i = 0; i < data.length; i++){
      indexGame = gamesList.indexOf(data[i].dataValues.gameTableId);
      // console.log(indexGame);
      if (indexGame = -1){
        gamesList.push(data[i].dataValues.gameTableId);
      }
    }
    var newGamesList = gamesList.slice(9);
    console.log(newGamesList)
    return newGamesList;
  }

return router;

}