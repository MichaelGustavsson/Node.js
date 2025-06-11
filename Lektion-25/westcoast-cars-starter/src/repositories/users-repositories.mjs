import userModel from '../models/schemas/userModel.mjs';

export default class UserRepository {
  async add(user) {
    const { firstName, lastName, email, password } = user;
    return await userModel.create({ firstName, lastName, email, password });
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
