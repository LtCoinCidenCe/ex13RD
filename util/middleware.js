const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Session, User } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ message: 'token missing' });
  }
  try {
    const tokenString = authorization.substring(7);
    const decodedToken = jsonwebtoken.verify(tokenString, SECRET);
    const itsSession = await Session.findOne({
      where: {
        token: tokenString,
      },
    });
    if (itsSession === null) {
      return res.status(401).json({ message: 'token revoked' });
    }
    const user = await User.findByPk(decodedToken.id);
    if (user.disabled)
      return res.status(401).json({ message: 'user disabled, contact admin for information' });
    req.decodedToken = decodedToken;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'token expired' });
    }
    return res.status(401).json({ message: 'token invalid' });
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  console.error('error:', error, '\n\n\n\n')

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({ message: error.errors[0].message })
  }
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ message: error.errors[0].message })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).end()
  }

  next(error)
}

module.exports = { errorHandler, tokenExtractor }
