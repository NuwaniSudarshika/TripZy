const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Room', roomSchema);