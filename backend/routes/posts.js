const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//getting all
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
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
  });
  console.log(req.body.color);
  try {
    const newPost = await post.save();
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
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete('/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Post deleted' });
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
