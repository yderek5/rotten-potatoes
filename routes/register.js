module.exports = function(app,passport){

	var express = require('express');
	var router = express.Router();

	/* GET register page. */
	router.get('/', function(req, res) {
	    res.render('./register/register',{message: req.flash('message').toString()});
	});

	/*AUTHENTICATE REGISTRATION*/
 	router.post('/',
 		passport.authenticate('local-register', 
	 			{
		        	successRedirect: '/',
		 
		        	failureRedirect: '/register',
		        	failureFlash: true
	    		}
 			) 
 	)

return router;

}

