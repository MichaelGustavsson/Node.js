import express from 'express';
import {
  listAllVehicles,
  findById,
  addVehicle,
  findByManufacturer,
} from '../controllers/vehicles-controller.mjs';

const router = express.Router();

router.route('/').get(listAllVehicles).post(addVehicle);
router.route('/:id').get(findById);
router.route('/manufacturer/:make').get(findByManufacturer);

export default router;
