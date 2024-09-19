const express = require('express');
require('express-async-errors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { errorHandler } = require('./util/middleware');

const app = express()
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log('server listening on', PORT);
  })
}

start()
