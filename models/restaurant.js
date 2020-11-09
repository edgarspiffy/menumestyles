const mongoose = require('mongoose');
const dish = require('../models/dish');

const restaurantSchema = new mongoose.Schema({
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
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dish'
  }]
});

module.exports = mongoose.model("restaurant", restaurantSchema);