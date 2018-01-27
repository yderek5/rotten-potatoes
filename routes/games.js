module.exports = function (app, passport) {
    var express = require('express');
    var router = express.Router();
    var db = require('../models');

    /* GET list of all games we have on record */
    router.get('/', function (req, res) {
        var firstname = '';
        if (req.user) {
            firstname = req.user.firstname;
        }
        db.game_tables.findAll({
            attributes: ['name', 'description', 'image_thumbnail', 'id'],
            order: [
                ['name']
            ],
        }).then(function (data) {
            res.render('./home/gameList', {
                title: 'game list',
                gamesList: data,
                loggedin: req.isAuthenticated(),
                firstname: firstname
            });
        })
    });

    /* GET specific game info */
    router.get('/:id', function (req, res) {
        var gameID = req.params.id;
        db.game_tables.findOne({
            where: {
                id: gameID,
            },
            include: [db.reviews_tables]
        }).then(function (data) {

            var firstname = '';
            if (req.user) {
                firstname = req.user.firstname;
            }


            var averages = getAverage(data.dataValues.reviews_tables);
            res.render('./home/game', {
                overallScore: averages[4],
                replayability: averages[2],
                graphics: averages[0],
                soundtrack: averages[3],
                gameTitle: data.name,
                gameplay: averages[1],
                gameImage: data.image_original,
                gameDescription: data.description,
                gameid: gameID,

                loggedin: req.isAuthenticated(),
                firstname: firstname
            });
        })
    });

    // Add news game external db to our game database
    router.post("/new", function (req, res) {
        var firstname = '';
        if (req.user) {
            firstname = req.user.firstname;
        }

        db.game_tables.findOne({
            where: {
                external_id: req.body.game.external_id
            }
        }).then(function (data) {
            if (data === null) {
                db.game_tables.create({
                    name: req.body.game.name,
                    description: req.body.game.description,
                    image_thumbnail: req.body.game.image_thumbnail,
                    image_original: req.body.game.image_original,
                    external_id: req.body.game.external_id,
                    original_release_date: req.body.game.original_release_date,
                }).then(function (result) {
                    var url = "/games/" + result.dataValues.id;
                    res.send({
                        url: url
                    })
                })
            }
        })
    })






    //function to get the average ratings of all reviews for a specific game
    var getAverage = function (table) {
        var total_graphics_rating = 0;
        var total_game_play_rating = 0;
        var total_replayability_rating = 0;
        var total_soundtrack_rating = 0;
        var total_average = 0;

        for (i = 0; i < table.length; i++) {
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


        var avg_graphics_rating = total_graphics_rating / table.length;
        var avg_game_play_rating = total_game_play_rating / table.length;
        var avg_replayability_rating = total_replayability_rating / table.length;
        var avg_soundtrack_rating = total_soundtrack_rating / table.length;
        var avg_average = total_average / table.length

        var avgTable = [];
        avgTable.push(avg_graphics_rating.toFixed(2));
        avgTable.push(avg_game_play_rating.toFixed(2));
        avgTable.push(avg_replayability_rating.toFixed(2));
        avgTable.push(avg_soundtrack_rating.toFixed(2));
        avgTable.push(avg_average.toFixed(2));

        return avgTable;
    }

    //funciton to get top ten gameIDs from the reviews table
    var getGamesArray = function (data) {
        var gamesList = [];
        var indexGame = 0;
        for (var i = 0; i < data.length; i++) {
            indexGame = gamesList.indexOf(data[i].dataValues.gameTableId);
            if (indexGame = -1) {
                gamesList.push(data[i].dataValues.gameTableId);
            }
        }
        var newGamesList = gamesList.slice(9);
        return newGamesList;
    }

    return router;
}