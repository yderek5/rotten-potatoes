module.exports = function (app, passport) {
    var express = require('express');
    var router = express.Router();
    var db = require('../models');
    /*SEARCH FOR GAMES*/
    router.get('/', function (req, res) {
        var firstname = '';
        if (req.user) {
            firstname = req.user.firstname;
        }
        db.game_tables.findAll({
            where: {
                name: {
                    $like: '%' + req.query.searchTerm + '%'
                }
            }
        }).then(function (data) {
            res.render('./home/search', {
                title: 'game list',
                gamesList: data,
                loggedin: req.isAuthenticated(),
                firstname: firstname
            });
        })

    });

    /* AUTOCOMPLETE */
    router.get('/auto', function (req, res) {

        var query = req.query.term;
        console.log('Query:' + query);
        db.game_tables.findAll({
            where: {
                name: {
                    $like: '%' + query + '%'
                }
            }
        }).then(function (data) {
            console.log('data:' + data.length);
            var autoCompleteOptions = [];
            for (i = 0; i < data.length; i++) {
                var game = {
                    value: 'games/' + data[i].id,
                    label: data[i].name
                }

                autoCompleteOptions.push(game);
            }

            res.send(autoCompleteOptions);
        })


    });

    var externalSearch = require('../public/javascripts/externalSearch.js');
    /* get external games */
    router.get('/external/search', externalSearch);

    return router;
}