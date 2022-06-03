const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const genAuthToken = require('../utils/genAuthToken');
const User = require('../models/user');

/**
 * route for creating a user
 * @param  {String} /register the route
 * @return {string} jwt token
 */
router.post('/register', async (req, res) => {
  // calls on database and searches it for attached email
  const existingUser = await User.findOne({ email: req.body.email });

  //if it is found: abort cause user/email is already registered
  if (existingUser) {
    return res
      .status(500)
      .json({ message: 'Email is already registered, login instead' });
  }

  // if all required attributes exists on requestbody
  if (req.body.name && req.body.email && req.body.password) {
    // validation schema is created
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });

    // schema validates requestbody
    const { error } = schema.validate(req.body);

    // if any error function is returned
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // new user is created with mongoose schema
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      posts: [],
    });

    // password is encrypted using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // try to save new user to database
    let newUser;
    try {
      newUser = await user.save(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    // if save user to database is successfull jwt is generated and returned
    const token = genAuthToken(newUser);
    res.send({ jwt: token });
  }
});

/**
 * Log in funciton
 * @param  {String} '/login' route path to login
 * @return {string} jwt
 */
router.post('/login', async (req, res) => {
  // calls on database and searches it for attached email
  let user = await User.findOne({ email: req.body.email });

  //if it is not found: abort
  if (!user) {
    return res.status(400).json({ message: 'No user matches this email' });
  }

  // validation schema is created
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  // schema validates requestbody
  const { error } = schema.validate(req.body);

  //if any error was returned
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // comparing hashed password from database with password from client
  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // if password is correct jwt will be generated and returned to client
  const token = genAuthToken(user);
  res.send({ jwt: token });
});

module.exports = router;
