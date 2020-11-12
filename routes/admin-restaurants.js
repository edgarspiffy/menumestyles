const express = require('express');
const dish = require('../models/dish');
const restaurant = require('../models/restaurant');
const attributes = require('../app_modules/attributes');
const buildRestaurantModel = require('../app_modules/buildRestaurantModel');
const router = express.Router();

function updateDish(req) {
  // Make Ingridients into array
  let ingredients = req.body.ingredients;
  ingredients = ingredients.replace(/\s*,\s*/g, ",");
  ingredients = ingredients.split(",");
  // BUILD DOC
  const doc = {
    // UNIQUE DATA
    dishInfo: {
      name: req.body.dishName,
      ingredients: ingredients,
      price: req.body.price,
    },
    dishAttributes: {
      vegan: true,
      vegetarian: true,
      spicy: true
    },
  }
  return doc;
}


// GET ALL RESTAURANTS
router.get('/', (req, res, next) => {
  restaurant.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('Templates/admin',
        {
          title: 'admin',
          page_id: 'admin-index',
          path: req.path,
          data: data,
          spotFilters: attributes.spotFilters
        });
    }
  });
});

// GET INDIVIDUAL RESTAURANT & DISHES
router.get('/:id', (req, res, next) => {
  restaurant.findById(req.params.id)
    .populate('dishes')
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render('Templates/admin-edit',
          {
            title: 'Searching',
            data: data,
            path: req.path,
            page_id: 'info-page',
            id: req.params.id,
            spotFilters: attributes.spotFilters
          });
      }
    });
});

// CREATE NEW RESTAURANT
router.post('/', (req, res, next) => {
  restaurant.create(buildRestaurantModel(req), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(req.get('referer'));
    }
  });
});

// UPDATE RESTAURANT & BULK DISHES
router.put('/:id', (req, res) => {
  restaurant.findByIdAndUpdate(req.params.id, buildRestaurantModel(req), err => {
    if (err) {
      console.log(err);
    } else {
      dish.updateMany(
        { restaurantID: req.params.id },
        {
          $set: {
            // THIS UPDATES THE DATA NEED TO ADD ALL FIELDS
            restaurantInfo: {
              name: req.body.name,
              phone: req.body.phone,
              website: req.body.website
            },
            restaurantAddress: {
              street: req.body.street,
              city: req.body.city,
              zip: req.body.zip,
              state: "CA",
            },
            restaurantAttributes: {
              holeInWall: req.body["hole in the wall"],
              alcohol: req.body["in happy hour"],
              happyHour: req.body["serves beer & alcohol"]
            },
            restaurantHours: {
              mon: [req.body.openMonday, req.body.closeMonday],
              tue: [req.body.openTuesday, req.body.closeTuesday],
              wed: [req.body.openWednesday, req.body.closeWednesday],
              thu: [req.body.openThursday, req.body.closeThursday],
              fri: [req.body.openFriday, req.body.closeFriday],
              sat: [req.body.openSaturday, req.body.closeSaturday],
              sun: [req.body.openSunday, req.body.closeSunday]
            }
          }
        })
        .exec();
      res.redirect(req.get('referer'));
    }
  });
});

// DELETE RESTAURANT
router.delete('/:id', (req, res) => {
  restaurant.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      dish.deleteMany({ restaurantID: req.params.id }, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/admin');
        }
      });
    }
  });
});

module.exports = router;