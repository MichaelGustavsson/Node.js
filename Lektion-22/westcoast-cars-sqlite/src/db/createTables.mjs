import crypto from 'crypto';
import { db } from './database.mjs';
import AppError from '../models/appError.mjs';

export const createTableVehicle = async () => {
  try {
    await db.exec(
      'CREATE TABLE IF NOT EXISTS vehicles(id TEXT, registrationNumber TEXT NOT NULL, manufacturer TEXT NOT NULL, model TEXT NOT NULL, modelYear INTEGER NOT NULL, mileage INTEGER NOT NULL,color TEXT NOT NULL, fuelType TEXT NOT NULL)'
    );
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

export const createVehicleData = async () => {
  try {
    const vehicles = await db.all('SELECT * FROM vehicles');

    if (vehicles.length > 0) return;

    const sql =
      'INSERT INTO vehicles(id, registrationNumber,manufacturer, model,modelYear,mileage,color,fuelType) VALUES(?,?,?,?,?,?,?,?)';
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'ABC123',
      'Volvo',
      'V40',
      2017,
      115000,
      'Mörkblå',
      'Bensin',
    ]);
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'EFG456',
      'Fiat',
      'Punto',
      2013,
      175000,
      'Orange',
      'Bensin',
    ]);
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'HIJ789',
      'BMW',
      'X3e',
      2024,
      21950,
      'Mineralvit',
      'Hybrid',
    ]);
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'KLM123',
      'Ford',
      'Fiesta',
      2015,
      95000,
      'Röd',
      'Diesel',
    ]);
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
