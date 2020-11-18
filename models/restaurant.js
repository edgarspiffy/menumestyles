const mongoose = require('mongoose');
const dish = require('../models/dish');
const attributes = require('../app_modules/attributes');

const restaurantSchema = new mongoose.Schema({
  restaurantInfo: {
    name: String,
    phone: String,
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
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dish'
  }]
});

// Dynamic Adding Restaurant Schema
attributes.spotFilters.forEach(attribute => {
  restaurantSchema.obj["restaurantAttributes"][attribute] = Boolean;
});

module.exports = mongoose.model("restaurant", restaurantSchema);