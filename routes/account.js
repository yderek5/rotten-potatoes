module.exports = function (app, passport) {
	var express = require('express');
	var router = express.Router();
    var db = require('../models');

	/* DISPLAY ACCOUNT DETAILS */
	router.get('/', function (req, res) {

		db.reviews_tables.findAll({
			where: {
				userId: req.user.id,
			},
			include: [db.game_tables],
		}).then(function (data) {
			var firstname = '';
			if (req.user) {
				firstname = req.user.firstname;
			}
			res.render('./users/show', {
				user: req.user,
				loggedin: req.isAuthenticated(),
				firstname: req.user.firstname,
				reviewsList: data
			});
		})
	});

	return router;

}