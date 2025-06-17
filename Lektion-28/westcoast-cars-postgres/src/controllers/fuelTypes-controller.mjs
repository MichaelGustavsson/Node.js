import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import FuelTypeRepository from '../repositories/fuelTypes-repositories.mjs';
import AppError from '../models/appError.mjs';

export const addFuelType = catchErrorAsync(async (req, res, next) => {
  let fuelType = await new FuelTypeRepository().add(req.body);

  fuelType = await new FuelTypeRepository().find(req.body.fuelType);

  res.status(201).json({ success: true, statusCode: 201, data: { fuelType } });
});

export const listFuelTypes = catchErrorAsync(async (req, res, next) => {
  console.log('ListFuelTypes');
  const fuelTypes = await new FuelTypeRepository().list();
  res.status(200).json({ success: true, statusCode: 200, data: { fuelTypes } });
});
