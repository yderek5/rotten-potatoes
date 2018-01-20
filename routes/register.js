var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res) {
    res.render('./register/register');
});

router.post('/api', function(req, res) {
    res.json(req.body);
});

module.exports = router;