const express = require("express");
const { User } = require("../models");
const { SECRET } = require("../util/config");
const crypto = require('node:crypto');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  res.json(users);
})

userRouter.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.validate();
  if (user.password.length < 5)
    return res.status(400).json({ message: 'password too short' });
  const passwordHash = crypto.hash('sha256', user.password);
  user.password = passwordHash;
  await user.save();
  res.json(user);
})

userRouter.put('/:username', async (req, res) => {
  const newUsername = req.body.username;
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  });
  if (user === null)
    return res.status(404).end();
  user.username = newUsername;
  await user.validate();
  await user.save();
  res.json(user);
})

module.exports = userRouter;
