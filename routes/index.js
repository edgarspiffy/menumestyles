const express       = require('express');
const dish          = require('../models/dish');
const restaurant    = require('../models/restaurant');
const router        = express.Router();



let foodFilters = ["vegan", "vegetarian", "spicy", "under 10 bucks"];
let spotFilters = ["hole in the wall", "in happy hour", "serves beer & alcohol"];









router.get('/',(req, res, next) => {
  res.render('index',
    {
      title: 'Discover Something Good',
      page_id: 'home-page',
      path: req.url,
      foodFilters: foodFilters,
      spotFilters: spotFilters
    });
});


router.get('/search', (req, res, next) => {
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
  //swap the bottom with search
  dish.find({}, function (err, found) {
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


router.get('/spot/:id',(req, res, next) => {
  dish.findById(req.params.id)
    .populate('restaurantID')
    .exec((err,data)=>{
      if(err){
        console.log(err);
      }else{
        res.render('spotInfo',
        {
          title: 'Searching',
          page_id: 'info-page',
          path: req.url,
          data: data
        })
      }
    })
});

 





module.exports = router;
