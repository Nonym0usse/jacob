var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('5e/index', { title: 'Express' });
});


module.exports = router;
