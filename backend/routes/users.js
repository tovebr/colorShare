const axios = require('axios');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

//getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// finding one
router.get('/:id', getUser, async (req, res) => {
  res.send(res.user.toObject({ getters: true }));
});

// updating one
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name) res.user.name = req.body.name;
  if (req.body.email) res.user.email = req.body.email;
  if (req.body.password) res.user.password = req.body.password;

  try {
    const updatedUser = await res.user.save();
    /* res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      id: updatedUser._id,
    }); */
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting one
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User cannot be found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
