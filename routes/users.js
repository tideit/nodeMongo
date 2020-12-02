var URL = require('url');
var User = require('./user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//http://localhost:3000/users/getUserInfo?id=1
router.get('/getUserInfo', function(req, res, next){
  var user = new User();

  var params = URL.parse(req.url, true).query;

  if (params.id === '1'){
    user.name = "test";
    user.age = "10";
    user.city = "上海";
  }else{
    user.name = "sun";
    user.age = "20";
    user.city = "东京";
  }

  var response = {status:1, data:user};
  res.send(JSON.stringify(response));

})

module.exports = router;
