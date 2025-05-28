import express from 'express';
import {
  addTransaction,
  listAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transactions').post(addTransaction).get(listAllTransactions);
router.route('/transactions/mine').get(mineTransactions);

export default router;
