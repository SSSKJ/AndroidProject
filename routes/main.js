var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

var connectionString = 'localhost:27017/ListDB';
var collection = ['users'];

var db = mongojs(connectionString, collection);


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.post('/login', function(req, res, next) {
  db.users.findOne({username:req.body.username}, function(err, user) {
    if (err) res.send('Server Error');
    if (!user) res.send('用户名不存在');
    else {
      if (user.password == req.body.password) {
      req.session.username = req.body.username;
      res.send('OK');
      } else {
        res.send('密码错误');
      }
    }
  });
});

router.post('/register', function(req, res, next) {

  db.users.findOne({username:req.body.username}, function(err, user) {
    if (err) res.send('Server Error');

    if (!user) {
      db.users.save({username:req.body.username, password:req.body.password}, function(err, saved) {
        if (err || !saved) res.send("Server Error");
        else  {
          req.session.username = req.body.username;
          res.send("OK");
        }
      });
    } else res.send("用户名已存在");
  });
});

router.post('/save', function(req, res, next) {

});

router.get('/load', function(req, res, next) {

});



module.exports = router;
