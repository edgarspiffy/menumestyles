const express      = require('express');
const dish         = require('../models/dish');
const restaurant   = require('../models/restaurant');
const router       = express.Router();

function buildRestaurantModel(req){
  const doc = {
    name:    req.body.name,
    phone:   req.body.phone,
    address: req.body.address,
    city:    req.body.city,
    zip:     req.body.zip,
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
  return doc;
}


function buildDishModel(data,req){
  const doc = {
    name: req.body.dishName,
    ingredients: [req.body.ingredients],
    price: req.body.price,

    
    restaurant: data.name,
    restaurantID: [data._id],
    hours: {
      mon: data.hours.mon,
      tue: data.hours.tue,
      wed: data.hours.wed,
      thu: data.hours.thu,
      fri: data.hours.fri,
      sat: data.hours.sat,
      sun: data.hours.sun,
    },
  }
  return doc;
}

// INDEX
router.get('/', (req,res,next)=>{
  restaurant.find({},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.render('admin/index',
      {
        title:    'admin',
        page_id:  'admin-index',
        data:      data
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
    .exec((err, found)=>{
    if (err) {
      console.log(err);
    } else {
      res.render('admin/edit', 
      {
        title:   'Searching',
        data:     found,
        page_id: 'info-page',
        id:       req.params.id
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
      res.redirect('/admin');
    }
  });
});

// UPDATE RESTAURANT
router.put('/:id', (req, res) => {
  restaurant.findByIdAndUpdate(req.params.id, buildRestaurantModel(req), err => {
    if (err) {
      console.log(err);
    } else {
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
      dish.create(buildDishModel(data,req), (err, newDish)=> {
        if(err){
          console.log(err);
        }else{
          data.dishes.push(newDish._id);
          data.save(err => {
            if(err){
              console.log(err);
            }else{
              res.redirect(`/admin/${req.params.id}`);
            }
          })     
        }
      });
    }
  });
});

module.exports = router;
