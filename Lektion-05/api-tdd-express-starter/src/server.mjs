import express from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.mjs';
import vehicleRouter from './routes/vehicles-routes.mjs';
import AppError from './models/appError.mjs';
import errorHandler from './middleware/errorHandler.mjs';

// Konfigurera config.env
dotenv.config({ path: './config/settings.env' });

// Skapa en server ifrån express...
const app = express();

// Middleware...
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api/v1/vehicles', vehicleRouter);

// Catch-All (catch all routing errors)...
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Vi kan tyvärr inte hitta resursen som du söker, ${req.originalUrl}`,
      404
    )
  );
});

app.use(errorHandler);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () =>
  console.log(
    `Servern är startad på adress http://localhost:${PORT} och kör i läge ${process.env.NODE_ENV}`
  )
);
