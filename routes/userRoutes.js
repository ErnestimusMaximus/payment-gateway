const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get user profile
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
