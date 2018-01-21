var express = require('express');
var router = express.Router();
var db = require('../models');
/* GET all reviews for a single game page */

router.get('/:id', function(req, res) {
    var gameId = req.params.id;
    db.reviews_tables.findAll({
        where: {
            gameTableid: gameId,
        }
    }).then(function(data){
        db.game_tables.findOne({
            where: {
                id: gameId,
            }
        }).then(function(childData){
            res.render('./reviews/index', {title: 'Reviews', gameReviews:data, gameData: childData});
        })
        
    })
});

/* POST review form data */
router.post('/api', function(req, res) {
    // THIS IS WHERE THE REVIEW FORM GOES
   
    db.reviews_tables.create({
        comment: req.body.description,
        graphics_rating: req.body.graphics,
        game_play_rating: req.body.gameplay,
        replayability: req.body.replayability,
        soundtrack: req.body.soundtrack,
        average: average,
        gameTableId: req.body.gameId, 
        userTableEmail: "jnguye89@gmail.com",
    },).then(function(data){
        res.json(data);
    })
});

/* GET edit page */
router.get('/:id/edit', function(req, res) {
    res.render('./reviews/edit', {title: 'edit or delete'});
});

module.exports = router;