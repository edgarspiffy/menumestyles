const express = require('express');
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const dish = require('../models/dish');
const spot = require('../models/restaurant');
const router = express.Router();
const restaurant = require('../models/restaurant');



router.get('/', function (req, res, next) {
  restaurant.find({}, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      // console.log(found);
      res.render('admin/index', { title: 'Searching', data: found, page_id: 'info-page' });
    }
  })
})



router.post('/', function (req, res, next) {
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
      res.redirect('/admin')
    }
  })
})

router.get('/:id', function (req, res, next) {
  let yo = req.params.id;
  restaurant.findById(yo, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/edit', {
        title: 'Searching',
        data: found,
        page_id: 'info-page',
        id: yo
      })
    }
  })
})


router.delete('/:id', function (req, res) {
  let yo = req.params.id;
  restaurant.findByIdAndRemove({ _id: yo }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  })
})


router.put('/edit', function (req, res) {
  console.log('it worked');
  res.redirect('/');
})





module.exports = router;
