const axios = require('axios');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

//getting all users
router.get('/', async (req, res) => {
  try {
    // get all users from database
    const users = await User.find({}, '-password');
    // return all users as json
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @param  {String} id
 * @param  {function} getUser function that seraches database for user corresponding with id
 */
router.get('/:id', getUser, async (req, res) => {
  res.send(res.user.toObject({ getters: true }));
});

/**
 * Function that finds a single user based on id
 * @param {object} req request
 * @param {object} res response
 * @param {function} next tells code to execute next part
 * @returns post
 */
async function getUser(req, res, next) {
  let user;

  try {
    // search database for user with id
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User cannot be found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // add post to response object
  res.user = user;
  // move on to next function
  next();
}

module.exports = router;
