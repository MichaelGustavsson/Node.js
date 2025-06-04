import { app } from './app.mjs';
import AppError from './models/error/appError.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import vehicleRouter from './routes/vehicles-routes.mjs';

import Blockchain from './models/blockchain/Blockchain.mjs';

// Exporterar en ny instans av vår blockkedja...
export const blockchain = new Blockchain();

const PORT = process.env.PORT || 5010;

/**************************************************************************/
// Middleware...
// När ett request kommer in med url = localhost:5001/api/v1/vehicles...
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
/* End middleware**********************************************************/

app.listen(PORT, () => {
  console.log(`Server är startad på adress: http://localhost:${PORT}`);
});
