const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Test Route
router.get('/', (req, res) => {
  res.json({ message: 'User route working' });
});

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;