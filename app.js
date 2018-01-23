var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var hbsHelpers = require('./helpers/handlebars')
var hbs = require('hbs');

// These just require our controllers(controllers are = ./routes)
var register = require('./routes/register');
var login = require('./routes/login');
var index = require('./routes/index');
var users = require('./routes/users');
var reviews = require('./routes/reviews');
var forgot = require('./routes/forgotPass');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper('image_swap_med', function(score) { 
  var image;
  if (score >= 8){
      image = "/images/rotten-potatos-status-baked-md.png"
  }
  else if (score >= 6){
      image = "/images/rotten-potatos-status-fresh-md.png"
  }
  else {
      image = "/images/rotten-potatos-status-rotten-md.png"
  }
  return image;
 });

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
