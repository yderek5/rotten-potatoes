var express = require('express');
var router = express.Router();
var db = require('../models');

//sequelize command to pull up a list of all games


//sequelize command to pull the results of a particular game by id
router.get("/api/games/:id"), function(req, res){
    var gameId = req.params.id;
    db.game_tables.findOne({
        where: {
            id: gameID,
        }
   }).then(function(results){
       res.json(results);
   })
};


// //sequelize command to pull results of top ten games
// router.get("/api/topTenGames", function(req,res){
//     db.reviews_tables.
// })

module.exports = router;
