const express = require("express");
const { User, Blog } = require("../models");
const crypto = require('node:crypto');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId'],
      }
    }
  });
  res.json(users);
})

userRouter.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt', 'password'],
    },
    include: {
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      through: {
        attributes: ['id', 'state'],
      },
    }
  })
  res.json(user)
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
