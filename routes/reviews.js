var express = require('express');
var router = express.Router();
var db = require('../models');
/* GET all reviews for a single game page */
router.get('/', function(req, res) {
    res.render('./reviews/index', {title: 'Reviews'});
});
/* POST review form data */
router.post('/api', function(req, res) {
    res.json(req.body);
});

/* GET edit page */
router.get('/:id/edit', function(req, res) {
    res.render('./reviews/edit', {title: 'edit or delete'});
});

module.exports = router;