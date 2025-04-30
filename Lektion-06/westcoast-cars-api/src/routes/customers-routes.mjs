import express from 'express';
import {
  listAllCustomers,
  addCustomer,
  findCustomerByEmail,
} from '../controllers/customers-controller.mjs';

const customerRouter = express.Router();

customerRouter.route('/').get(listAllCustomers).post(addCustomer);
customerRouter.route('/email/:email').get(findCustomerByEmail);
export default customerRouter;
