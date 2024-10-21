import express from 'express';
import 'express-async-errors';
import { PORT } from './utils/config.js';
import { connectToDatabase } from './utils/db.js';
import blogsRouter from './controllers/blogs.js';
import errorHandler from './middleware/errors.js';

const app = express();
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
