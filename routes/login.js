	
module.exports = function(app,passport){

	var express = require('express');
	var router = express.Router();

	
	/* LOGIN form */
 	router.get('/', function(req, res) {
    	res.render('./login/login',{message: req.flash('message').toString()});
	});

	/* AUTHENTICATE LOGIN */
 	router.post('/',passport.authenticate('local-login',
	 		{
	 			successRedirect: '/',
	 			failureRedirect: '/login',
	 			failureFlash: true

	 		}
 		)
 	)


return router;

}