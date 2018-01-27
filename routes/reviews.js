module.exports = function(app,passport){

    var express = require('express');
    var router = express.Router();
    var db = require('../models');
    /* GET all reviews for a single game page */

    router.get('/:id', function(req, res) {
        var gameId = req.params.id;
        var average = 0;
        db.reviews_tables.findAll({
            order: [['id', 'DESC']],
            where: {
                gameTableid: gameId,
            }, include: [db.user]
        }).then(function(data){
            average = getAverage(data)
            var firstname = '';
            if(req.user){
              firstname = req.user.firstname;
            }

            db.game_tables.findOne({
                where: {
                    id: gameId,
                }
            }).then(function(childData){
                //pushes to the average table of all games
                db.game_tables.update({
                    average: average,
                },{where: {
                        id: gameId,
                    }
                })
                res.render('./reviews/index', {title: 'Reviews', gameReviews:data, gameData: childData, loggedin: req.isAuthenticated(),firstname: firstname});
            })
            
        })
    });

    /* POST review form data */
    router.post('/api', function(req, res) {
        // THIS IS WHERE THE REVIEW FORM GOES
        console.log(req.body);
       
        var firstname = '';
        if(req.user){
          firstname = req.user.firstname;
        }

        
        db.reviews_tables.create({
            comment: req.body.description,
            graphics_rating: req.body.graphics,
            game_play_rating: req.body.gameplay,
            replayability: req.body.replayability,
            soundtrack: req.body.soundtrack,
            average: req.body.average,
            gameTableId: req.body.gameId, 
            userId: req.user.id
        }).then(function(result){
            var url = "/reviews/" + result.dataValues.gameTableId;
            res.send({url:url})
          })
    });

    /* GET edit page */
    router.get('/:id/edit', function(req, res) {
        res.render('./reviews/edit', {title: 'edit or delete'});
    });

return router;

}


var getAverage = function(table){
    var total_average = 0;

    for (i = 0; i < table.length; i ++){
      var current_average = parseInt(table[i].dataValues.average);
      total_average += current_average;
    }

    var avg_average = total_average/table.length

    return avg_average;
  }

var checkGameExists = function(gameId){
    return db.average_table.count({
        where: {id: gameId}
    }).then(function(data){
        if (count != 0){
            return false;
        }
        return true;
    })
}