import userModel from '../models/schemas/userModel.mjs';

export default class UserRepository {
  async add(user) {
    return await userModel.create(user);
  }

  async findById(id) {
    return await userModel.findById(id);
  }

  async find(email, login) {
    return login === true
      ? await userModel.findOne({ email: email }).select('+password')
      : await userModel.findOne({ email: email });
  }

  async list() {
    return await userModel.find();
  }
}
