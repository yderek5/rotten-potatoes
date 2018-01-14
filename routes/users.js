var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:username', function(req, res) {
  res.render('./users/show', {title: 'show'});
});

router.get('/:username/:edit', function(req, res) {
  res.render('./users/edit', {title: 'edit'});
});

module.exports = router;
