const express = require("express");
const { User, Session } = require("../models");
const { SECRET } = require("../util/config");
const crypto = require('node:crypto');
const jsonwebtoken = require("jsonwebtoken");

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    where: {
      username: body.username,
    }
  });
  if (!(user && body.password))
    return res.status(401).json({ message: 'invalid username or password' });

  const passwordHash = crypto.hash('sha256', body.password);
  if (user.password !== passwordHash)
    return res.status(401).json({ message: 'invalid username or password' });

  if (user.disabled)
    return res.status(401).json({ message: 'user disabled, contact admin for information' });
  const tokenInfo = { id: user.id, username: user.username };
  const token = jsonwebtoken.sign(tokenInfo, SECRET, { expiresIn: '15 minutes' });
  await Session.create({ token });
  return res.json({ token, username: user.username, name: user.name });
})

module.exports = loginRouter;
