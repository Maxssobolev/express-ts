import { Sequelize } from 'sequelize-typescript';
import { User } from './models/users.model';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  storage: ':memory:',
  models: [User],
});
