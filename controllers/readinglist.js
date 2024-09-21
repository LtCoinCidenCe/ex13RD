const express = require("express");
const { Blog, User } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");
const ReadingList = require("../models/readinglist");

const readingListRouter = express.Router();

readingListRouter.post('/', async (req, res) => {
  const readone = await ReadingList.create(req.body);
  res.json(readone);
})

module.exports = readingListRouter;
