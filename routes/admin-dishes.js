
const express = require('express');
const dish = require('../models/dish');
const restaurant = require('../models/restaurant');
const attributes = require('../app_modules/attributes');
const buildDishModel = require('../app_modules/buildDishModel');
const updateDish = require('../app_modules/updateDish');
const router = express.Router();

// CREATE NEW DISH
router.post('/:id', (req, res, next) => {
  restaurant.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      dish.create(buildDishModel(data, req), (err, newDish) => {
        if (err) {
          console.log(err);
        } else {
          console.log(newDish);
          data.dishes.push(newDish._id);
          data.save(err => {
            if (err) {
              console.log(err);
            } else {
              res.redirect(req.get('referer'));
            }
          })
        }
      });
    }
  });
});

// EDIT EXISTING DISH
router.put('/:id', (req, res) => {
  dish.findByIdAndUpdate(req.params.id, updateDish(req), err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(req.get('referer'));
    }
  })
})

// DELETE DISH
router.delete('/:id', (req, res) => {
  dish.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(req.get('referer'));
    }
  })
})

module.exports = router;