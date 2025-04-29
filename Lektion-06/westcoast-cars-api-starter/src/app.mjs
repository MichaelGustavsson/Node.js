import express from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.mjs';
import vehicleRouter from './routes/vehicles-routes.mjs';
import AppError from './models/appError.mjs';
import errorHandler from './middleware/errorHandler.mjs';

dotenv.config({ path: './config/settings.env' });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api/v1/vehicles', vehicleRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Vi kan tyvärr inte hitta resursen som du söker, ${req.originalUrl}`,
      404
    )
  );
});

app.use(errorHandler);

export { app };
