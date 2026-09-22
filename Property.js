const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  price: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model("Property", PropertySchema);