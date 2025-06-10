import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import AppError from '../models/appError.mjs';

export let db;

export const connectDb = async () => {
  try {
    db = await open({
      filename: `./src/db/${process.env.DATABASE}`,
      driver: sqlite3.Database,
    });
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
