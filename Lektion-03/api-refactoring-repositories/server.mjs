import express from 'express';
import vehicleRouter from './routes/vehicles-routes.mjs';

// Skapa en server ifrån express...
const app = express();

// TODO: Felhantering!!!
// Middleware...
app.use(express.json());
app.use('/api/v1/vehicles', vehicleRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servern är startad på adress http://localhost:${PORT}`)
);
