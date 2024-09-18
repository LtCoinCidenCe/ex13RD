const express = require('express');
const blogRouter = require('./controllers/blogs');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const app = express()
app.use(express.json())
app.use('/api/blogs', blogRouter)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log('server listening on', PORT);
  })
}

start()
