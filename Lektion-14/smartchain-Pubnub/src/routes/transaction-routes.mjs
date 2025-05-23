import express from 'express';
import {
  addTransaction,
  listAllTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transactions').post(addTransaction).get(listAllTransactions);

export default router;
