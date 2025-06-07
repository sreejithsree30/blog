
import express from 'express';
import Post from '../models/Post.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = new Post({
      title,
      content,
      image,
      author: req.userId
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
