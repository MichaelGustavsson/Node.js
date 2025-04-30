import AppError from '../models/appError.mjs';
import Customer from '../models/Customer.mjs';

export default class CustomerRepository {
  async listAll() {
    return await Customer.find();
  }

  async findByEmail(email) {
    return await Customer.findOne({ email: email });
  }

  async add(customer) {
    return await Customer.create(customer);
  }
}
