if(process.env.NODE_ENV !== 'production'){
require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();

const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./public/js/passport-config');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: false
}));


app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Router middleware at the end
app.use('/', indexRouter);




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


initializePassport(passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id))
  
module.exports = app;