var express = require('express');  // require类似于Java的import，需要用到其他包里面的东西，就把它引用过来
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

///=======路由信息 （接口地址）开始 存放在./routes目录下===========//
var index = require('./routes/index');  //home page接口
var users = require('./routes/users');  //用户接口
var sun = require('./routes/sun');  //sun接口

var mongoDelete = require('./routes/mongodb/delete');  //mongo接口
var mongoFind = require('./routes/mongodb/find');       //mongo接口
var mongoInsert = require('./routes/mongodb/insert');  //mongo接口
var mongoUpdate = require('./routes/mongodb/update');  //mongo接口

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);  //在app中注册routes该接口，当输入根目录(http://localhost:3000)的时候，调用index.js
app.use('/users', users); //在app中注册users接口
app.use('/sun', sun); //在app中注册sun接口

app.use('/mongo', mongoDelete); //在app中注册mongo接口
app.use('/mongo', mongoFind);   //在app中注册mongo接口
app.use('/mongo', mongoInsert); //在app中注册mongo接口
app.use('/mongo', mongoUpdate); //在app中注册mongo接口

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
