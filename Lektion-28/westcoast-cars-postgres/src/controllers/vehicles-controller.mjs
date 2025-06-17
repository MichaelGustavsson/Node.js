import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import VehicleRepository from '../repositories/vehicles-repository.mjs';
import AppError from '../models/appError.mjs';

export const addVehicle = catchErrorAsync(async (req, res, next) => {
  const id = await new VehicleRepository().add(req.body);
  const vehicle = await new VehicleRepository().find(id);

  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { vehicle: vehicle } });
});

export const deleteVehicle = catchErrorAsync(async (req, res, next) => {
  await new VehicleRepository().delete(req.params.id);

  res.status(204).end();
});

export const findVehicle = catchErrorAsync(async (req, res, next) => {
  const vehicle = await new VehicleRepository().find(req.params.id);

  if (!vehicle) {
    return next(new AppError(`Hittade ingen bil med id: ${id}`, 404));
  }

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { vehicle: vehicle } });
});

export const findVehicleByRegNo = catchErrorAsync(async (req, res, next) => {
  const vehicle = await new VehicleRepository().findByRegNo(req.params.regno);

  if (!vehicle) {
    return next(
      new AppError(
        `Hittade ingen bil med registeringsnummer: ${req.params.regno}`,
        404
      )
    );
  }

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { vehicle: vehicle } });
});

export const listVehicles = catchErrorAsync(async (req, res, next) => {
  const vehicles = await new VehicleRepository().list();

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { vehicles: vehicles } });
});

export const updateVehicle = catchErrorAsync(async (req, res, next) => {
  req.body.id = req.params.id;
  await new VehicleRepository().update(req.body);

  res.status(204).end();
});
