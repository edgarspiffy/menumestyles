const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name:String,
  spotName:String,
  ingredients:[String],
  attributes:{
    vegan:Boolean,
    spicy:Boolean,
    price:Number
  }
});

module.exports = mongoose.model("dish", dishSchema);