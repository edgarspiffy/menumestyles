const express = require('express');
const dish = require('../models/dish');
const restaurant = require('../models/restaurant');
const attributes = require('../attributes');

const router = express.Router();


function buildRestaurantModel(req) {
  const doc = {
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
  };
  return doc;
}


function buildDishModel(data, req) {
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
    // PULLED DATA
    restaurantInfo: {
      name: data.restaurantInfo.name,
      phone: data.restaurantInfo.phone,
      website: data.restaurantInfo.website
    },
    restaurantAddress: {
      street: data.restaurantAddress.street,
      city: data.restaurantAddress.city,
      zip: data.restaurantAddress.zip,
      state: "CA",
    },
    restaurantAttributes: {
      holeInWall: data.restaurantAttributes["hole in the wall"],
      alcohol: data.restaurantAttributes["in happy hour"],
      happyHour: data.restaurantAttributes["serves beer & alcohol"]
    },
    restaurantHours: {
      mon: [data.hours.openMonday, data.hours.closeMonday],
      tue: [data.hours.openTuesday, data.hours.closeTuesday],
      wed: [data.hours.openWednesday, data.hours.closeWednesday],
      thu: [data.hours.openThursday, data.hours.closeThursday],
      fri: [data.hours.openFriday, data.hours.closeFriday],
      sat: [data.hours.openSaturday, data.hours.closeSaturday],
      sun: [data.hours.openSunday, data.hours.closeSunday]
    },
    restaurantID: [data._id],
  }
  return doc;
}


// GET ALL RESTAURANTS
router.get('/', (req, res, next) => {
  restaurant.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/index',
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



// CREATE NEW RESTAURANT
router.post('/', (req, res, next) => {
  restaurant.create(buildRestaurantModel(req), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
});

// VIEW INDIVIDUAL LISTING WITH DISHES
router.get('/:id', (req, res, next) => {
  restaurant.findById(req.params.id)
    .populate('dishes')
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render('admin/edit',
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
              name: req.body.name
            }
          }
        })
        .exec();
      res.redirect(`/admin/${req.params.id}`);
    }
  });
});

// NEW DISH
router.post('/newDish/:id', (req, res, next) => {
  restaurant.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      dish.create(buildDishModel(data, req), (err, newDish) => {
        if (err) {
          console.log(err);
        } else {
          data.dishes.push(newDish._id);
          data.save(err => {
            if (err) {
              console.log(err);
            } else {
              res.redirect(`/admin/${req.params.id}`);
            }
          })
        }
      });
    }
  });
});

module.exports = router;
