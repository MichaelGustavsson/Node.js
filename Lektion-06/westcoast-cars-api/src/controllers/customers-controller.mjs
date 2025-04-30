import CustomerRepository from '../repositories/customerRepository.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllCustomers = catchErrorAsync(async (req, res) => {
  const customers = await new CustomerRepository().listAll();
  res.status(200).json({ success: true, data: customers });
});

export const findCustomerByEmail = catchErrorAsync(async (req, res) => {
  const customer = await new CustomerRepository().findByEmail(req.params.email);
  res.status(200).json({ success: true, data: customer });
});

export const addCustomer = catchErrorAsync(async (req, res) => {
  const customer = new CustomerRepository().add(req.body);
  res.status(201).json({ success: true, data: customer });
});
