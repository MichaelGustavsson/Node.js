import AppError from '../models/appError.mjs';
import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log(`Databasen är startad på: ${conn.connection.host}`);
    }
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
