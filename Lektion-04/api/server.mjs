import express from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.mjs';
import vehicleRouter from './routes/vehicles-routes.mjs';

// Konfigurera config.env
dotenv.config({ path: './config/settings.env' });

// Skapa en server ifrån express...
const app = express();

// TODO: Felhantering!!!
// Middleware...
// 1.
app.use(express.json());
// 2.
app.use(logger);
// 3.
app.use('/api/v1/vehicles', vehicleRouter);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () =>
  console.log(`Servern är startad på adress http://localhost:${PORT}`)
);
