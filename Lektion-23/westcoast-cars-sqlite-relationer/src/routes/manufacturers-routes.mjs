import express from 'express';
import {
  addManufacturer,
  findManufacturer,
  listManufacturers,
} from '../controllers/manufacturers-controller.mjs';

const router = express.Router();

router.route('/').get(listManufacturers).post(addManufacturer);
router.route('/:id').get(findManufacturer);

export default router;
