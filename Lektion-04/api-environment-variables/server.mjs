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
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api/v1/vehicles', vehicleRouter);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () =>
  console.log(
    `Servern är startad på adress http://localhost:${PORT} och kör i läge ${process.env.NODE_ENV}`
  )
);
