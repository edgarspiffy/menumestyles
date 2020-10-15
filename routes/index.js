const express = require('express');
const mongoose = require('mongoose');
const dish = require('../models/dish');
const spot = require('../models/restaurant');
const router = express.Router();
const restaurant = require('../models/restaurant');

let foodFilters = ["vegan", "vegetarian", "spicy", "under 10 bucks"];
let spotFilters = ["hole in the wall", "in happy hour", "serves beer & alcohol"];

router.get('/', function (req, res, next) {
  res.render('index',
    {
      title: 'Discover Something Good',
      page_id: 'home-page',
      path: req.url,
      foodFilters: foodFilters,
      spotFilters: spotFilters
    });
});


router.get('/search', function (req, res, next) {
  let queryArray = Object.keys(req.query);


  let search = {};
  let ingredient = req.query.ingredient;
  let newIngreident = ingredient.toLowerCase();
  search.ingredients = newIngreident;
  let vegan = req.query.vegan;
  let spicy = req.query.spicy;
  let vegetarian = req.query.vegetarian;
  console.log(req.query);
  if (vegan) {
    let key = "attributes.vegan"
    search[key] = true;
  }
  if (spicy) {
    let key = "attributes.spicy"
    search[key] = true;
  }
  if (vegetarian) {
    let key = "attributes.vegetarian"
    search[key] = true;
  }
  // console.log(search);
  dish.find(search, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render('search', {
        title: 'Searching',
        page_id: 'search-page',
        data: found,
        queryArray: queryArray,
        ingredient: ingredient,
        vegan: vegan,
        spicy: spicy,
        vegetarian: vegetarian,
        path: req.url,
        foodFilters: foodFilters,
        spotFilters: spotFilters
      });
    }
  })
});


router.get('/spot/:id', function (req, res, next) {
  const restaurant = req.params.id
  res.render('spotInfo', { title: 'Searching', page_id: 'info-page' });
});


router.get('/adminspots', function (req, res, next) {
  restaurant.find({}, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      // console.log(found);
      res.render('adminSpots', { title: 'Searching', data: found, page_id: 'info-page' });
    }
  })
})



router.post('/adminspots', function (req, res, next) {
  const doc = {
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    zip: req.body.zip,
    website: req.body.website,
    hours: {
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
  restaurant.create(doc, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/adminspots')
    }
  })
})

router.get('/edit/:id', function (req, res, next) {
  let yo = req.params.id;
  restaurant.findById(yo, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render('adminSpotEdit', { title: 'Searching', data: found, page_id: 'info-page' })
    }
  })
})




module.exports = router;
