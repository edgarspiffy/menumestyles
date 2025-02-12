const mongoose = require('mongoose');
const restaurant = require('../models/restaurant');
const attributes = require('../app_modules/attributes');

const dishSchema = new mongoose.Schema({
  // UNIQUE DATA
  dishInfo: {
    name: String,
    ingredients: [String],
    price: Number,
  },
  dishAttributes: {
  },
  // PULLED DATA
  restaurantInfo: {
    name: String,
    phone: Number,
    website: String
  },
  restaurantAddress: {
    street: String,
    city: String,
    zip: Number,
    state: String,
  },
  restaurantHours: {
    mon: [String],
    tue: [String],
    wed: [String],
    thu: [String],
    fri: [String],
    sat: [String],
    sun: [String]
  },
  restaurantAttributes: {
    holeInWall: Boolean,
    alcohol: Boolean,
    happyHour: Boolean
  },
  restaurantID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant'
  }]
});

// Dynamic Adding Restaurant Schema
attributes.foodFilters.forEach(attribute => {
  dishSchema.obj["dishAttributes"][attribute] = Boolean;
});

module.exports = mongoose.model("dish", dishSchema);