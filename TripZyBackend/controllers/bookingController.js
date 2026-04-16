const Booking = require('../models/Booking');

exports.bookRoom = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Room booked" });
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};