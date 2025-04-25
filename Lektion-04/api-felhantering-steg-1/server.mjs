import express from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.mjs';
import vehicleRouter from './routes/vehicles-routes.mjs';

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
  const err = new Error(
    `Vi kan tyvärr inte hitta resursen som du söker, ${req.originalUrl}`
  );

  err.statusCode = 404;
  err.status = 'Not Found';
  err.success = false;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';
  res.status(err.statusCode).json({
    success: err.success,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () =>
  console.log(
    `Servern är startad på adress http://localhost:${PORT} och kör i läge ${process.env.NODE_ENV}`
  )
);
