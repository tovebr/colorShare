const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

//getting all
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    /* res.json(posts); */
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one
router.get('/:id', getPost, async (req, res) => {
  res.send(res.post);
});

// Creating one
router.post('/', async (req, res) => {
  const post = new Post({
    description: req.body.description,
    color: req.body.color,
    creator: req.body.userId,
  });
  console.log(post.creator);

  let user;

  try {
    user = await User.findById(post.creator);
    console.log(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  if (!user) {
    return res
      .status(404)
      .json({ message: 'Could not find user for provided id' });
  }

  try {
    const newPost = await post.save();
    user.posts.push(post);
    await user.save();
    res.json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.color) res.post.color = req.body.color;
  if (req.body.description) res.post.description = req.body.description;

  try {
    const updatedPost = await res.post.save();
    /* {post: updatedPost.toObject({ getters: true })} */

    res.json(updatedPost.toObject({ getters: true }));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete('/:id', async (req, res) => {
  let post;
  try {
    post = await Post.findById(req.params.id).populate('creator');
    if (post) {
      await post.remove();
      post.creator.posts.pull(post);
      await post.creator.save();
      res.status(200).json({ message: 'Post deleted', id: req.params.id });
    } else {
      res.status(404).json({ message: 'Could not find place' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

module.exports = router;
