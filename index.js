require('dotenv').config();
const express = require('express');
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);
class Blog extends Model { }
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog',
})
Blog.sync()

const app = express()

app.use(express.json())
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  // console.log(JSON.stringify(blogs, null, 2))
  return res.json(blogs)
})
app.post('/api/blogs', async (req, res) => {
  // console.log(req.body)

  try {
    const newblog = await Blog.create(req.body);
    return res.json(newblog);
  }
  catch (error) {
    return res.status(400).json({ error });
  }
})
app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog)
    await blog.destroy();
  return res.status(204).end();
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('server listening on', PORT);
})
