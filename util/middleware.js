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

module.exports = { errorHandler }
