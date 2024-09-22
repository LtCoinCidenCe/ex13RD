const express = require("express");
const { Session } = require("../models");

const logoutRouter = express.Router();

logoutRouter.delete('/', async (req, res) => {
  const authorization = req.get('Authorization');
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ message: 'token missing' });
  }
  const tokenString = authorization.substring(7);
  const itsSession = await Session.findOne({
    where: {
      token: tokenString,
    },
  });
  if (itsSession === null) {
    return res.status(204).end();
  }
  await itsSession.destroy();

  return res.status(204).end();
})

module.exports = logoutRouter;
