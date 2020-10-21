const mongoose = require('mongoose');
const restaurant = require('../models/restaurant');

const dishSchema = new mongoose.Schema({
  name:String,
  spotName:String,
  ingredients:[String],
  attributes:{
    vegan:Boolean,
    spicy:Boolean,
    price:Number
  },
  restaurantID:String
});

module.exports = mongoose.model("dish", dishSchema);