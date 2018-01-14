var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res) {
    res.render('./register/register', {title: 'Register'});
});

module.exports = router;