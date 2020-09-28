var express = require('express');
const dish = require('../models/dish');
const spot = require('../models/restaurant');
var router = express.Router();
const mongoose = require('mongoose');
var functions = require('../functions');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Discover Something Good | Crayvyt', page_id: 'home-page' });
});


router.get('/search', function (req, res, next) {
  console.log('this was called');
  console.log(req.query.search);
  const vegan = req.query.vegan;
  const spicy = req.query.spicy;
  const vegetarian = req.query.vegetarian;
  dish.find({ ingredients: req.query.search},function(err,found){
    if(err){
      console.log(err);
    }else{
      res.render('search', { title: 'Searching', page_id: 'search-page',data:found });
    }
  })
});


router.get('/spot/:id', function (req, res, next) {
  const restaurant = req.params.id
  console.log(restaurant);
  spot.findById(restaurant, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      console.log(found);
      res.render('spotInfo', { title: 'Searching', page_id: 'search-page', data: found });
    }
  })
});


router.get('/test', function (req, res, next) {
  console.log('this was called');
  console.log(req.query.search);
  
  dish.find({},function(err,found){
    if(err){
      console.log(err);
    }else{
      res.render('test', { title: 'Searching', page_id: 'search-page', data: found, query: req.query.search, functions:functions});
    }
  })
});

module.exports = router;
