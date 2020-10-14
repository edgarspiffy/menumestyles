var express = require('express');
const mongoose = require('mongoose');
const dish = require('../models/dish');
const spot = require('../models/restaurant');
var router = express.Router();
<<<<<<< HEAD

=======
var bodyParser = require('body-parser');
var functions = require('../functions');
>>>>>>> home_page_styles
const restaurant = require('../models/restaurant');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Discover Something Good | Crayvyt', page_id: 'home-page' });
});


router.get('/search', function (req, res, next) {
  let search = {};
  let query = req.query;
  let ingredient = req.query.ingredient;
  let newIngreident = ingredient.toLowerCase();
  search.ingredients = newIngreident;

  let vegan = req.query.vegan;
  console.log(vegan);
  let spicy = req.query.spicy;
  let vegetarian = req.query.vegetarian;

  if(vegan){
    let key = "attributes.vegan"
    search[key] = true;
  }
  if(spicy){
    let key = "attributes.spicy"
    search[key] = true;
  }
  if(vegetarian){
    let key = "attributes.vegetarian"
    search[key] = true;
  }
  console.log(search);
  dish.find(search,function(err,found){
    if(err){
      console.log(err);
    }else{
      res.render('search', { 
        title: 'Searching', 
        page_id: 'search-page', 
        data: found, 
        ingredient: ingredient,
        vegan:vegan,
        spicy:spicy,
        vegetarian:vegetarian
      });
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
      // console.log(found);
      res.render('adminSpots', { title: 'Searching', data: found, page_id: 'info-page'});
    }
  })
})



router.post('/adminspots',function(req,res,next){
  const doc = {
    name:req.body.name,
    phone: req.body.phone,
    address:req.body.address,
    city: req.body.city,
    zip:req.body.zip,
    website:req.body.website,
    hours:{
      mon: req.body.mon,
      tue: req.body.tue,
      wed: req.body.wed,
      thu: req.body.thu,
      fri: req.body.fri,
      sat: req.body.sat,
      sun: req.body.sun
    }
  };
  // console.log(doc);
  // res.redirect('/adminspots')
  restaurant.create(doc,function(err,data){
    if(err){
      console.log(err);
    }else{
      res.redirect('/adminspots')
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
