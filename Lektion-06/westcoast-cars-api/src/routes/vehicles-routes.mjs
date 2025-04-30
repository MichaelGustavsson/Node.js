import express from 'express';
import {
  listAllVehicles,
  findVehicle,
  addVehicle,
  deleteVehicle,
  updateVehicle,
  clearDatabase,
} from '../controllers/vehicles-controller.mjs';

const vehicleRouter = express.Router();

vehicleRouter
  .route('/')
  .get(listAllVehicles)
  .post(addVehicle)
  .delete(clearDatabase);

vehicleRouter
  .route('/:id')
  .get(findVehicle)
  .delete(deleteVehicle)
  .put(updateVehicle)
  .patch(updateVehicle);

export default vehicleRouter;
