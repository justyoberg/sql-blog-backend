import { Router } from 'express';
import Blog from '../models/blog.js';

const router = Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw new Error('Invalid blog ID');
  next();
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const deletedBlog = await req.blog.destroy();
    if (deletedBlog) return res.json(deletedBlog);
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes++;
    await req.blog.save();
    return res.json({ likes: req.blog.likes });
  }
});

export default router;
