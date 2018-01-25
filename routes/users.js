module.exports = function(app,passport){

	var express = require('express');
	var router = express.Router();

	/* GET users profile page */
	router.get('/:username', function(req, res) {
		
		// var firstname = '';
	 //      if(req.user){
	 //        firstname = req.user.firstname;
	 //      }
		// console.log(req.user.id);
	});

	/* GET user edit page */
	router.get('/:username/edit', function(req, res) {
	  res.render('./users/edit', {title: 'edit'});
	});


return router;

}