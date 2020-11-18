var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dish = require('./models/dish');
var spot = require('./models/restaurant');
var bodyParser = require('body-parser');
var attributes = require('./app_modules/attributes');


// function buildAttributesObject(data) {
//   const document = {};
//   attributes.spotFilters.forEach(attribute => {
//     document["restaurantAttributes"][attribute] = data.restaurantAttributes[attribute];
//   });
//   return document;
// }

// function updateCollection() {
//   spot.find({}, (err, documents) => {
//     documents.forEach(doc => {
//       spot.findByIdAndUpdate(doc._id, buildAttributesObject(doc), err => {
//         if (err) console.log(err);
//         else console.log('should have worked');
//       });
//     });
//   });
// }

// updateCollection();

const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true, useNewUrlParser: true  });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://admin:Abcd!234@ds153314.mlab.com:53314/crayvyt');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are live');
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var adminRouter = require('./routes/admin');
var adminRestaurants = require('./routes/admin-restaurants');
var adminDishes = require('./routes/admin-dishes');

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

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRestaurants);
app.use('/dishes', adminDishes);

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
