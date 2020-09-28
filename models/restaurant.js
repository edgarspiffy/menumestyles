const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("spot", spotSchema);