const mongoose = require('mongoose');
const restaurant = require('../models/restaurant');

const dishSchema = new mongoose.Schema({
  // UNIQUE DATA
  dishInfo:{
    name: String,
    ingredients: [String],
    price: String,
  },
  dishAttributes:{
    vegan:Boolean,
    vegetarian:Boolean,
    spicy:Boolean
  },
  // PULLED DATA
  restaurantInfo:{
    name:String,
    phone:String,
    website:String
  },
  restaurantAddress:{
    street:String,
    city:String,
    zip:String,
    state:String,
  },
  restaurantHours:{
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String
  },
  restaurantAttributes:{
    vegan: Boolean,
    spicy: Boolean,
  },
  restaurantID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant'
  }]
});

module.exports = mongoose.model("dish", dishSchema);