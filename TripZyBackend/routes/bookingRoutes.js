const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.bookRoom);
router.get('/user/:userId', bookingController.getUserBookings);

module.exports = router;