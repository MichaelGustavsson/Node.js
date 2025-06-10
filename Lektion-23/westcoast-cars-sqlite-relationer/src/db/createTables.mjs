import crypto from 'crypto';
import { db } from './database.mjs';
import AppError from '../models/appError.mjs';

export const createTableVehicle = async () => {
  try {
    // Skapa tabellen manufacturers före vehicles...
    await db.exec(
      'CREATE TABLE IF NOT EXISTS manufacturers(id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE)'
    );
    // Skapa tabellen vehicles...
    await db.exec(
      'CREATE TABLE IF NOT EXISTS vehicles(id TEXT PRIMARY KEY, registrationNumber TEXT NOT NULL UNIQUE, manufacturerId TEXT NOT NULL, model TEXT NOT NULL, modelYear INTEGER NOT NULL, mileage INTEGER NOT NULL,color TEXT NOT NULL, fuelType TEXT NOT NULL)'
    );
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

export const createVehicleData = async () => {
  try {
    // Skapa några tillverkare...
    const manufacturers = await db.all('SELECT * FROM manufacturers');
    if (manufacturers.length > 0) return;

    // Skapa ett antal unika id för våra bilar...
    const volvoId = crypto.randomUUID().replaceAll('-', '');
    const fiatId = crypto.randomUUID().replaceAll('-', '');
    const fordId = crypto.randomUUID().replaceAll('-', '');
    const bmwId = crypto.randomUUID().replaceAll('-', '');

    let sql = 'INSERT INTO manufacturers(id,name) VALUES(?,?)';
    await db.run(sql, [volvoId, 'Volvo']);
    await db.run(sql, [fiatId, 'Fiat']);
    await db.run(sql, [fordId, 'Ford']);
    await db.run(sql, [bmwId, 'BMW']);

    // Skapa lite dummy bilar...
    const vehicles = await db.all('SELECT * FROM vehicles');

    if (vehicles.length > 0) return;

    sql =
      'INSERT INTO vehicles(id, registrationNumber,manufacturerId, model,modelYear,mileage,color,fuelType) VALUES(?,?,?,?,?,?,?,?)';
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'ABC123',
      volvoId,
      'V40',
      2017,
      115000,
      'Mörkblå',
      'Bensin',
    ]);
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'EFG456',
      fiatId,
      'Punto',
      2013,
      175000,
      'Orange',
      'Bensin',
    ]);
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'HIJ789',
      bmwId,
      'X3e',
      2024,
      21950,
      'Mineralvit',
      'Hybrid',
    ]);
    await db.run(sql, [
      crypto.randomUUID().replaceAll('-', ''),
      'KLM123',
      fordId,
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
