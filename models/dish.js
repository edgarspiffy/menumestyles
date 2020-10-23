const mongoose = require('mongoose');
const restaurant = require('../models/restaurant');

const dishSchema = new mongoose.Schema({
  name:String,
  restaurant:String,
  ingredients:[String],
  attributes:{
    vegan:Boolean,
    spicy:Boolean,
    price:Number
  },
  hours: {
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String
  },
  restaurantID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant'
  }]
});

module.exports = mongoose.model("dish", dishSchema);