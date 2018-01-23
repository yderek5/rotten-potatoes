module.exports = function(app,passport){

	var express = require('express');
	var router = express.Router();

	/* GET users profile page */
	router.get('/:username', function(req, res) {
	  res.render('./users/show', {title: 'show'});
	});

	/* GET user edit page */
	router.get('/:username/edit', function(req, res) {
	  res.render('./users/edit', {title: 'edit'});
	});


return router;

}