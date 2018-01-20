var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/api/topTenGames', function(req, res){
    db.Game_table.findAll().then(function(results){
        console.log(results);
        res.json(results);
    })
});

router.get('/api/worstGames', function(req, res){
    db.Game_table.findAll().then(function(results){
        console.log(results);
        res.json(results);
    })
});

module.exports = router;
