var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('./home/index', { title: 'Home' });
});


//this route can be moved, just testing front end for it.  lmg 1.15.18
router.get('/game', function(req, res) {
  res.render('./home/game', { title: 'Home' });
});

module.exports = router;
