var express = require('express');
const mongoose = require('mongoose');
const dish = require('../models/dish');
const spot = require('../models/restaurant');
var router = express.Router();

var functions = require('../functions');
const restaurant = require('../models/restaurant');



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
  res.render('spotInfo', { title: 'Searching',page_id: 'info-page'});
});


router.get('/adminspots',function(req,res,next){
  restaurant.find({},function(err,found){
    if(err){
      console.log(err);
    } else {
      console.log(found);
      res.render('adminSpots', { title: 'Searching', data: found, page_id: 'info-page'});
    }
  })
})

router.get('/edit/:id',function(req,res,next){
  let yo = req.params.id;
  restaurant.findById(yo,function(err,found){
    if(err){
      console.log(err);
    }else{
      res.render('adminSpotEdit', { title: 'Searching', data: found, page_id: 'info-page' })
    }
  })
})

module.exports = router;
