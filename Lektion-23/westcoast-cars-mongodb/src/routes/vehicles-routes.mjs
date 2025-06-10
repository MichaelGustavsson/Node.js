import express from 'express';
import {
  addVehicle,
  deleteVehicle,
  findVehicle,
  findVehicleByRegNo,
  listVehicles,
  updateVehicle,
} from '../controllers/vehicles-controller.mjs';

const router = express.Router();

router.route('/').get(listVehicles).post(addVehicle);
router.route('/:id').get(findVehicle).delete(deleteVehicle).put(updateVehicle);

// Kan vara bad practice...
router.route('/regno/:regno').get(findVehicleByRegNo);

export default router;
