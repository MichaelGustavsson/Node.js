import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import VehicleRepository from '../repositories/vehicle-repository.mjs';

export const listAllVehicles = catchErrorAsync(async (req, res) => {
  const vehicles = await new VehicleRepository().listAll();
  res.status(200).json({ success: true, statusCode: 200, data: vehicles });
});

export const findById = catchErrorAsync(async (req, res) => {
  const vehicle = await new VehicleRepository().findById(req.params.id);
  res.status(200).json({ success: true, statusCode: 200, data: vehicle });
});

export const addVehicle = catchErrorAsync(async (req, res) => {
  const vehicle = await new VehicleRepository().add(req.body);
  res.status(201).json({ success: true, statusCode: 201, data: vehicle });
});
