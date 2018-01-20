var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res) {
    res.render('./register/register');
});

router.post('/api/register', function(req, res) {
    res.send(req.body.data);
});

module.exports = router;