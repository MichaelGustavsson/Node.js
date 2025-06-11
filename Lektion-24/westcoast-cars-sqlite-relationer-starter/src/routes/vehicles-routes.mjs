import express from 'express';
import {
  addVehicle,
  deleteVehicle,
  findVehicle,
  listVehicles,
  updateVehicle,
  updateVehicleMileage,
} from '../controllers/vehicles-controller.mjs';

const router = express.Router();

router.route('/').get(listVehicles).post(addVehicle);
router
  .route('/:id')
  .get(findVehicle)
  .delete(deleteVehicle)
  .put(updateVehicle)
  .patch(updateVehicleMileage);

export default router;
