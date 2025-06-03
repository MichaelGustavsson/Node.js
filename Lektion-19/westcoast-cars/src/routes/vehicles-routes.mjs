import express from 'express';
import {
  listAllVehicles,
  findById,
  addVehicle,
} from '../controllers/vehicles-controller.mjs';

const router = express.Router();

router.route('/').get(listAllVehicles).post(addVehicle);
router.route('/:id').get(findById);

export default router;
