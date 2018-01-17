var express = require('express');
var router = express.Router();

/* GET review page */
router.get('/', function(req, res) {
    res.render('./reviews/index', {title: 'Reviews'});
});

/* GET single review page */
router.get('/:id', function(req, res) {
    res.render('./reviews/show', {title: 'single review'});
});

/* GET create review page */
router.get('/new', function(req, res) {
    res.render('./reviews/new', {title: 'create a review'});
});

/* GET edit page */
router.get('/:id/edit', function(req, res) {
    res.render('./reviews/edit', {title: 'edit or delete'});
});

module.exports = router;