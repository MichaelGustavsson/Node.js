import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config/config.env' });

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

app.use(express.json());

export { app };
