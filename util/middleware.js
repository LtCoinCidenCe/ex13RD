const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("./config");

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

const errorHandler = (error, req, res, next) => {
  console.error('error:', error, '\n\n\n\n')

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ message: error.errors[0].message })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).end()
  }

  next(error)
}

module.exports = { errorHandler, tokenExtractor }
