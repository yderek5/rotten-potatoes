var express = require('express');
var router = express.Router();
var db = require('../models');
/* GET review page */
router.get('/', function(req, res) {
    res.render('./reviews/index', {title: 'Reviews'});
});

/* GET single review page */
router.get('/:id', function(req, res) {
    var gameId = req.params.id;
    db.game_tables.findOne({
        where: {
            id: gameID,
        }
   }).then(function(results){
       res.json(results);
   })
});

/* GET edit page */
router.get('/:id/edit', function(req, res) {
    res.render('./reviews/edit', {title: 'edit or delete'});
});

module.exports = router;