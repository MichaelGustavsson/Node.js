import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './db/database.mjs';
import { createTableVehicle, createVehicleData } from './db/createTables.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

dotenv.config({ path: './config/config.env' });

await connectDb();
await createTableVehicle();
await createVehicleData();

const app = express();

app.use(express.json());

export { app };
