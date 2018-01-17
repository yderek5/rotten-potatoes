var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('./home/index', { title: 'Home' });
});

/* GET specific game info */
router.get('/games/:gameTitle', function(req, res) {
  res.render('./home/game', { title: 'single game' });
});

/* GET list of all games we have on record */
router.get('/games', function(req, res) {
  res.render('./home/gameList', {title: 'game list'});
});

module.exports = router;
