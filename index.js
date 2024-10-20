import express from 'express';
import { config } from 'dotenv';
import { Sequelize, Model, DataTypes } from 'sequelize';

config();
const app = express();
app.use(express.json());
const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init(
  {
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
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body);
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    const deletedBlog = await blog.destroy();
    if (deletedBlog) return res.json(deletedBlog);
  }
  res.status(400).json({ error: 'Something went wrong' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started successfully on port ${process.env.PORT}`);
});
