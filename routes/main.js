var express = require('express');
var mongojs = require('mongojs')
var router = express.Router();

var db = mongojs(connectionString, [collections])


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  res.send('respond');
});

module.exports = router;
