import { app } from './app.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import vehiclesRouter from './routes/vehicles-routes.mjs';
import usersRouter from './routes/users-routes.mjs';
import authRouter from './routes/auth-routes.mjs';

const PORT = process.env.PORT || 5002;

app.use('/api/v1/vehicles', vehiclesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is up and running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  )
);
