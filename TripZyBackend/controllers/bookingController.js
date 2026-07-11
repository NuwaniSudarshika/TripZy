const Booking = require('../models/Booking');

exports.bookRoom = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Room booked successfully", booking });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};