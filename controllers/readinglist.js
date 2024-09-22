const express = require("express");
const { Blog, User } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");
const ReadingList = require("../models/readinglist");
const { tokenExtractor } = require("../util/middleware");

const readingListRouter = express.Router();

readingListRouter.post('/', async (req, res) => {
  const readone = await ReadingList.create(req.body);
  res.json(readone);
})

readingListRouter.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user === null)
    return res.status(401).json({ message: 'invalid user' });
  const aread = await ReadingList.findByPk(req.params.id);
  if (aread === null)
    return res.status(404).end()
  if (aread.userId !== user.id)
    return res.status(401).json({ message: 'invalid user' });
  aread.state = req.body.read === true ? 'done' : 'unread';
  await aread.save();
  res.json(aread);
})

module.exports = readingListRouter;
