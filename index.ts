require('dotenv').config();
import express from 'express';
import { sequelize } from './db';
import { router } from './routes';
import { errorHandler } from './middleware/error-handling.middleware';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname + '/static')));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
