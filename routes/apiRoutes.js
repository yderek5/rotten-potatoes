var express = require('express');
var router = express.Router();
var Game_table = require("../models/game_table.js");
var Reviews_table = require("../models/reviews_table.js");
var Users_table = require("../models/users_table.js");

router.get('/api/topTenGames', function(req, res){
    Game_table.findAll({}).then(function(results){
        console.log(results);
        res.json(results);
    })
});

router.get('/api/worstGames', function(req, res){
    Game_table.findAll({}).then(function(results){
        console.log(results);
        res.json(results);
    })
});

module.exports = router;
