var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('1er/index', { title: 'Express' });
});


module.exports = router;
