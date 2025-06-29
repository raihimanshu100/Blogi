import express from 'express';
import Post from '../models/Post.js';
const router = express.Router();

// Utility to clean slug
const slugify = str =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Homepage and all posts page
router.get(['/', '/posts'], async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

// Create post form
router.get('/posts/new', (req, res) => {
  res.render('create', { post: new Post() });
});

// Admin Panel
router.get('/admin', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('admin', { posts });
});

// Create post with optional slug
router.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    slug: req.body.slug ? slugify(req.body.slug) : slugify(req.body.title),
    content: req.body.content
  });
  try {
    const newPost = await post.save();
    res.redirect(`/posts/${newPost.slug}`);
  } catch (e) {
    res.render('create', { post });
  }
});

// View blog post
router.get('/posts/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.redirect('/posts');
  res.render('post', { post });
});

// Edit form
router.get('/posts/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
});

// Update post
router.put('/posts/:id', async (req, res) => {
  let post = await Post.findById(req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  if (req.body.slug) {
    post.slug = slugify(req.body.slug);
  }
  try {
    post = await post.save();
    res.redirect(`/posts/${post.slug}`);
  } catch (e) {
    res.render('edit', { post });
  }
});

// Delete post
router.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/posts');
});

export default router;
