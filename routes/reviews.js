var express = require('express');
var router = express.Router();
var db = require('../models');
/* GET all reviews for a single game page */

router.get('/', function(req, res) {
    res.render('./reviews/index', {title: 'Reviews'});
});

/* POST review form data */
router.post('/api', function(req, res) {
    // THIS IS WHERE THE REVIEW FORM GOES
    console.log(req.body)
    var average = (req.body.graphics + req.body.gameplay + req.body.replayability + req.body.soundtrack)/4;
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