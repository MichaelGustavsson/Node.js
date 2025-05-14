import express from 'express';
import { getInfo } from '../controllers/controller.mjs';

const router = express.Router();

router.route('/').get(getInfo);

export default router;
