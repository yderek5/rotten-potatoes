var express = require('express');
var router = express.Router();
var db = require('../models');


router.get('/api/topTenGames', function(req, res){
    // console.log("get"); //this part works
    // console.log(db.game_tables);
    db.game_tables.findAll().then(function(results){
        // console.log(results)
        res.json(results);
    })

    // db.Author.findAll({
    //     include: [db.Post]
    //   }).then(function(dbAuthor) {
    //     res.json(dbAuthor);
    //   });
});

router.get('/api/worstGames', function(req, res){
    db.game_tables.findAll({}).then(function(results){
        // console.log(results);
        res.json(results);
    })
});

module.exports = router;
