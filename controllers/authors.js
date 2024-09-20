const express = require("express");
const { Blog, User } = require("../models");
const { Sequelize, col } = require("sequelize");

const authorRouter = express.Router();

authorRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: ['author',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'articles'],
      [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']],
    group: 'author',
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
})

module.exports = authorRouter;
