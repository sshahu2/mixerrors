var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());//uses middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;]


app.post('getData', function (req, res, next) {
  switch (req.intent) {
    case 'revenueDetails':
      var query = "Select SUM(PLAN_REV_FY18) from SALES_TB_HIST WHERE"
      for (each in req.entities) {
        if (typeof (each.value) == 'string')
          query += " " + each.key + " = " + each.value + " ,"
        else (typeof (each.value) == 'object' && each.length > 0)
        {
          query += " " + each.key + " in (";
          each.value.forEach(element => {
           query += " " + element + " ,"
          });
          query[query.length] = " )"
        }
      }
      query[query.length] = ";"
  }
})
