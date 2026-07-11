const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotelId: String,
  hotelName: String,
  totalPrice: Number,
  guests: Number,
  rooms: Number,
  bedType: String,       // 'single' | 'double' | 'king'
  foodService: String,   // 'none' | 'breakfast' | 'halfBoard' | 'fullBoard'
  checkInDate: String,
  checkOutDate: String,
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);