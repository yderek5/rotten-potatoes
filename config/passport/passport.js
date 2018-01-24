var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport,user) {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;
	
	passport.use('local-register', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true//allows us to pass back the entire request to the callback
		},
		function(req,email,password,done){
			var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8),null)
			}
			
			User.findOne({

				where: {
					email:email
				}
			}).then(function(user){
				if(user){
					return done(null,false, {
						message: req.flash('message','That email is already taken')
					})
				} else
				{
					var userPassword = generateHash(password);
					var data = {
						email: email,
						password: userPassword,
						firstname: req.body.firstname,
						lastname: req.body.lastname
					}
					User.create(data).then(function(newUser, created){
						if(!newUser){
							return done(null, false);
						}

						if(newUser) {
							return done(null, newUser);
						}
					})
				}
			})
		}
	));

	passport.use('local-login', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req,email,password,done){
			console.log("email, pass: ",email,password);
			var User = user;
			var isValidPassword = function(userpass, password){
				return bCrypt.compareSync (password, userpass);
			}

			User.findOne({
				where: {
					email:email
				}
			}).then(function(user){
				if(!user){
					return done(null, false, {
						message: req.flash('message','Email does not exist')
					});
				}

				if( !isValidPassword(user.password,password)) {
					return done(null, false,{
						message: req.flash('message','Invalid Password')
					})
				}

				var userinfo = user.get();
				return done(null, userinfo);
			}).catch(function(err) {
				console.log("Error:", err);
				return done (null, false, {
					message: req.flash('message','Something went wrong with your Login')
				});
			});
		}




		))

	//serialize
	passport.serializeUser(function(user, done) {
 
    	done(null, user.id);
 
	});

	// deserialize user 
	passport.deserializeUser(function(id, done) {
 
    	User.findById(id).then(function(user) {
 
        	if (user) {
 
            	done(null, user.get());
 
        	} else {
 
            	done(user.errors, null);
 
        	}
 
    	});
 
	});
}