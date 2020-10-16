if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var expressLayouts = require('express-ejs-layouts')
var app = express();

const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport);
const mongoose = require('mongoose')


//DB Connection  

const db = require('./config/keys').MongoURI;

//Mongo Connection 
mongoose.connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// app.use(expressLayouts)
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(express.urlencoded({
  extended: false
}));


app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


// Global Variables 
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('Success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next();
})
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





module.exports = app;