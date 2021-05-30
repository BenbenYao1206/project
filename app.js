var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var ejs = require('ejs');


var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var indexRouter = require('./routes/index');
var juiceRouter = require('./routes/juice');
var testimonialRouter = require('./routes/testimonial');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var managerRouter = require('./routes/manager');
var addRouter = require('./routes/add');
var managRouter = require('./routes/manag');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".html",ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('exercise'));
app.use(session({
  secret:'exercise',
  name: 'text',
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/index', indexRouter);
app.use('/juice', juiceRouter);
app.use('/tes', testimonialRouter);
app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/manager', managerRouter);
app.use('/add', addRouter);
app.use('/manag', managRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));

});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;
