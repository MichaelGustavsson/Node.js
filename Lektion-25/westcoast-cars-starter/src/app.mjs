import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './db/database.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

dotenv.config({ path: './config/config.env' });

await connectDb();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  console.log(req.requestTime);

  console.log('Header Info: ', req.headers);

  const token = req.headers.authorization;
  console.log('TOKEN: ', token);

  next();
});

export { app };
