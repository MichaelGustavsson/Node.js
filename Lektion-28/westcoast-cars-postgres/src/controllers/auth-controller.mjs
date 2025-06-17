import { promisify } from 'util';
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

  res.cookie('jwt', token, {
    expiresIn: new Date(Date.now() * 24 * 60 * 60 * 1000),
    secure: true, // https
    httpOnly: true, // Ingen tillgång ifrån javascript...
  });

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { token: token } });
});

export const protect = catchErrorAsync(async (req, res, next) => {
  let token;
  // Hämta ut token om det är medskickat...
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('Du måste vara inloggad för att nå resursen', 401)
    );
  }

  const decoded = await verifyToken(token);

  const user = await new UserRepository().findById(decoded.id);

  req.user = user;

  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Du har inte behörighet till resursen', 403));
    }
    next();
  };
};

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};
