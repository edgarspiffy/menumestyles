const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  hours:{
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String
  },
  // dishes:[{
  //   stories: [{ type: Schema.Types.ObjectId, ref: 'dishes' }]
  // }]
});

module.exports = mongoose.model("spot", spotSchema);