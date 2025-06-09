import { app } from './app.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import vehiclesRouter from './routes/vehicles-routes.mjs';

const PORT = process.env.PORT || 5002;

app.use('/api/v1/vehicles', vehiclesRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is up and running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  )
);
