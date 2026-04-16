const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  res.json({ message: "User registered" });
};

// Login
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  res.json({ message: "Login success", user });
};