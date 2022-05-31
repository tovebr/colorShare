const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const genAuthToken = require('../utils/genAuthToken');
const User = require('../models/user');

// creating one
router.post('/register', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res
      .status(500)
      .json({ message: 'Email is already registered, login instead' });
  }

  if (req.body.name && req.body.email && req.body.password) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      posts: [],
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    let newUser;
    try {
      newUser = await user.save(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    const token = genAuthToken(newUser);
    res.send({ jwt: token });
  }
});

router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: 'No user matches this email' });
  }

  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = genAuthToken(user);
  res.send({ jwt: token });
});

module.exports = router;
