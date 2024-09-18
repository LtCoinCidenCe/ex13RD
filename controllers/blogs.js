const express = require("express");
const Blog = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  // console.log(JSON.stringify(blogs, null, 2))
  return res.json(blogs)
})
blogRouter.post('/', async (req, res) => {
  // console.log(req.body)

  try {
    const newblog = await Blog.create(req.body);
    return res.json(newblog);
  }
  catch (error) {
    return res.status(400).json({ error });
  }
})
blogRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog)
    await blog.destroy();
  return res.status(204).end();
})
blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog)
    return res.status(404).end();
  if (req.body.likes === undefined)
    return res.status(400).end();
  blog.likes = req.body.likes;

  await blog.save();
  return res.json(blog);
})

module.exports = blogRouter;
