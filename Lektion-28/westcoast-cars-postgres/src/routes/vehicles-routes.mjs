import express from 'express';
import {
  addVehicle,
  deleteVehicle,
  findVehicle,
  listVehicles,
  updateVehicle,
} from '../controllers/vehicles-controller.mjs';

import { addManufacturer } from '../controllers/manufacturers-controller.mjs';
import { addFuelType } from '../controllers/fuelTypes-controller.mjs';

const router = express.Router();

router.route('/').get(listVehicles).post(addVehicle);
router.route('/:id').get(findVehicle).delete(deleteVehicle).put(updateVehicle);

router.route('/manufacturers').post(addManufacturer);
router.route('/fueltypes').post(addFuelType);

export default router;
