module.exports = function(app,passport){

	var express = require('express');
	var router = express.Router();

	/* GET register page. */
	router.get('/', function(req, res) {
	    res.render('./register/register');
	});

	/*AUTHENTICATE REGISTRATION*/
 	router.post('/',
 		passport.authenticate('local-register', 
	 			{
		        	successRedirect: '/',
		 
		        	failureRedirect: '/register'
	    		}
 			) 
 	)

return router;

}

