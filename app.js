var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var hbsHelpers = require('./helpers/handlebars')
var hbs = require('hbs');

var app = express();
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
var flash = require('express-flash');
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Custom HBS Helper to swap medium rating logo
hbs.registerHelper('image_swap_med', function(score) { 
  var image;
  if (score >= 8){
      image = "/images/rotten-potatos-status-baked-md.png"
  }
  else if (score >= 6 && score > 0){
      image = "/images/rotten-potatos-status-fresh-md.png"
  }
  else if (score < 6 && score > 0){
    image = "/images/rotten-potatos-status-rotten-md.png"
  }
  else {
      image = "/images/rotten-potatos-status-new-md.png"
  }
  return image;
 });

 // Custom HBS Helper to swap small rating logo
 hbs.registerHelper('image_swap_sm', function(score) { 
  var image;
  if (score >= 8){
      image = "/images/rotten-potatos-status-baked-sm.png"
  }
  else if (score >= 6){
      image = "/images/rotten-potatos-status-fresh-sm.png"
  }
  else if (score < 6 && score > 0){
    image = "/images/rotten-potatos-status-rotten-sm.png"
  }
  else {
      image = "/images/rotten-potatos-status-new-sm.png"
  }
  return image;
 });

 // Custom HBS Helper to remove scores that are NaN
 hbs.registerHelper('replace_nan', function(score) { 
  var replaceText;
  if (isNaN(score)){
      replaceText = "No reviews yet for this title.";
  }
  else {
    replaceText = score;
  }
  return replaceText;
 });

  // Custom HBS Helper to change review link based on whether game is reviewed
  hbs.registerHelper('link_nan', function(id, score) { 
    var replaceLink;
    if (isNaN(score)){
        replaceLink = "<h7>Be the first to review this game below!</h7>";
    }
    else {
      replaceLink = "<a class ='btn btn-success btn-sm' href ='/reviews/" + id + "' role = 'button'>View individual reviews for this game!</a>";
    }
    return new hbs.SafeString(replaceLink);
   });


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for passport
app.use(session({secret: 'keyboard cat',resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//load passport strategies
var models = require('./models');
require('./config/passport/passport.js')(passport,models.user);
//var routes = require('./routes/auth.js')(app,passport);
//app.use('/', routes);


// These just require our controllers(controllers are = ./routes)
var register = require('./routes/register')(app,passport);
var login = require('./routes/login')(app,passport);
var index = require('./routes/index')(app,passport);
var users = require('./routes/users')(app,passport);
var reviews = require('./routes/reviews')(app,passport);
var forgot = require('./routes/forgotPass');

// These are the URL endpoints
app.use('/register', register);
app.use('/login', login);
app.use('/', index);
app.use('/users', users);
app.use('/reviews', reviews);
app.use('/forgot', forgot);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
