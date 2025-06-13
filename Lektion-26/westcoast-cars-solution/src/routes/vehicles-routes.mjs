import express from 'express';
import { authorize, protect } from '../controllers/auth-controller.mjs';
import {
  addVehicle,
  deleteVehicle,
  findVehicle,
  findVehicleByRegNo,
  listVehicles,
  updateVehicle,
} from '../controllers/vehicles-controller.mjs';

const router = express.Router();

router.route('/').get(protect, listVehicles).post(protect, addVehicle);
router
  .route('/:id')
  .get(protect, findVehicle)
  .delete(protect, deleteVehicle)
  .put(protect, updateVehicle);

// Kan vara bad practice...
router.route('/regno/:regno').get(protect, findVehicleByRegNo);

export default router;
