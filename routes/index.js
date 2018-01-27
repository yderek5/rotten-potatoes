module.exports = function (app, passport) {


  var express = require('express');
  var router = express.Router();
  var db = require('../models');
  var bestGames = [];
  var worstGames = [];
  var bestGamesList

  /* GET home page. */
  router.get('/', function (req, res) {

    db.game_tables.findAll({
      limit: 10,
      order: [
        ['original_release_date', 'DESC']
      ]
    }).then(function (data) {
      db.game_tables.findAll({
        order: [
          ['average']
        ]
      }).then(function (childData) {
        var worstTable = getSortedTable(childData);
        var bestTable = getSortedTable(childData.reverse());

        var firstname = '';
        if (req.user) {
          firstname = req.user.firstname;
        }

        res.render('./home/index', {
          topTen: bestTable,
          worstGames: worstTable,
          newGames: data,
          loggedin: req.isAuthenticated(),
          firstname: firstname
        });

      })

    })

    //function to get the list of best and worst games
    var getSortedTable = function (data) {
      var tableGameId = [];
      var table = [];

      for (i = 0; i < data.length; i++) {
        var dataExists = tableGameId.indexOf(data[i].dataValues.id);
        if (data[i].dataValues.average !== null) {
          if (dataExists === -1) {
            if (table.length < 10) {
              table.push({
                gameId: data[i].dataValues.id,
                gameName: data[i].dataValues.name,
                average: data[i].dataValues.average
              })
              tableGameId.push(data[i].dataValues.id);
            }
          }
        }
      };
      return table;
    }
  });

  /* LOGOUT */
  router.get('/logout', function (req, res) {
    req.logout();
    res.render('./logout/logout');
  });





  return router;

}