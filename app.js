var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dish = require('./models/dish');
var spot = require('./models/restaurant');
var bodyParser = require('body-parser');



// mongo setup
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true, useNewUrlParser: true  });

mongoose.connect('mongodb://admin:Abcd!234@ds153314.mlab.com:53314/crayvyt', { useUnifiedTopology: true, useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are live');
});

// spot.create({name:"MyGoods"},function(err,newEntry){
//   if(err){
//     console.log(err);
//   }
// })

// schema construction
// const kittySchema = new mongoose.Schema({
//   name: String
// });

// const Kitten = mongoose.model('Kitten', kittySchema);

// const silence = new Kitten({ name: 'Silence' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ exnteded: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

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
