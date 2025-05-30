import express from 'express';
import {
  addTransaction,
  getWalletInfo,
  listAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transactions').post(addTransaction).get(listAllTransactions);
router.route('/transactions/mine').get(mineTransactions);
router.route('/info').get(getWalletInfo);

export default router;
