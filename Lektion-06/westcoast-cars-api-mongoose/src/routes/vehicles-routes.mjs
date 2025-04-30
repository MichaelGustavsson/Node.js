import express from 'express';
import {
  listAllVehicles,
  findVehicle,
  addVehicle,
  deleteVehicle,
  updateVehicle,
  // updateVehicleModelYear,
} from '../controllers/vehicles-controller.mjs';

const vehicleRouter = express.Router();

// TODO: Måste fixa felhantering med storage.mjs.

vehicleRouter.route('/').get(listAllVehicles).post(addVehicle);

vehicleRouter
  .route('/:id')
  .get(findVehicle)
  .delete(deleteVehicle)
  .put(updateVehicle)
  .patch(updateVehicle);

export default vehicleRouter;
