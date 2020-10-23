const mongoose = require('mongoose');
const dish = require('../models/dish');

const restaurantSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  website:String,
  hours:{
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String
  },
  dishes:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'dish' 
  }]
});

module.exports = mongoose.model("restaurant", restaurantSchema);