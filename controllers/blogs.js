const express = require("express");
const { Blog, User } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");

const blogRouter = express.Router();

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ message: 'token missing' });
  }
  try {
    req.decodedToken = jsonwebtoken.verify(authorization.substring(7), SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'token invalid' });
  }

  next()
}

blogRouter.get('/', async (req, res) => {
  const where = {};
  const searchFilter = [{
    title: {
      [Op.iLike]: `%${req.query.search}%`
    }
  },
  {
    author: {
      [Op.iLike]: `%${req.query.search}%`
    }
  }]
  if (req.query.search) {
    where[Op.or] = searchFilter
  }
  // console.log(where); // symbol trick

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['password'],
      },
    },
    attributes: {
      exclude: ['userId'],
    },
    where,
    order: [['likes', 'DESC']]
  });
  // console.log(JSON.stringify(blogs, null, 2))
  return res.json(blogs)
})

blogRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user === null)
    return res.status(401).json({ message: 'bad user' })
  const newblog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(newblog);
})

blogRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user === null)
    return res.status(401).json({ message: 'bad user' })

  const blog = await Blog.findByPk(req.params.id);
  if (blog === null) {
    return res.status(204).end();
  }
  if (blog.userId !== user.id) {
    return res.status(401).json({ message: 'unauthorized user' })
  }
  await blog.destroy();
  return res.status(204).end();
})

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog)
    return res.status(404).end();
  if (req.body.likes === undefined)
    return res.status(400).json({ message: 'likes number missing' });
  blog.likes = req.body.likes;

  await blog.save();
  return res.json(blog);
})

module.exports = blogRouter;
