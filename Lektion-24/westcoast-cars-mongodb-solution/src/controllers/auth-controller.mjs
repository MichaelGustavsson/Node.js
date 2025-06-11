import jwt from 'jsonwebtoken';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import AppError from '../models/appError.mjs';
import UserRepository from '../repositories/users-repositories.mjs';

export const loginUser = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('e-post och eller lösenord saknas', 400));
  }

  // Hämta användarens uppgifter...
  const user = await new UserRepository().find(email, true);

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('e-post och eller lösenord är felaktigt', 401));
  }

  // Skapa ett jwt token...
  const token = createToken(user._id);

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { token: token } });
});

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
