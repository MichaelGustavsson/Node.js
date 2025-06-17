import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupDatabase } from './db/setup-database.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

dotenv.config({ path: './config/config.env' });

await setupDatabase();

// Konfigurera regler för begränsning av förfrågningar ifrån en och samma ip-adress
const limiter = rateLimit({
  max: 100, // maximalt 100 anrop
  windowMs: 60 * 60 * 1000, // per timme,
  message: 'You are killing me, get lost!!!',
});

const app = express();

// Sätter ett antal egenskaper som skydd i http header...
app.use(helmet());

// Alla får komma in och är välkomna...
app.use(cors());

// Anropsbegränsning...
app.use('/api/', limiter);

// Begränsning av pakets storlek
app.use(express.json({ limit: '10kb' }));

// Tvätta/sanera body, query,params, header data...
app.use(xss());

app.use(hpp());

export { app };
