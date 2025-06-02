import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import VehicleRepository from '../repositories/vehicleRepositories.mjs';

export const listAllVehicles = catchErrorAsync(async (req, res) => {
  const vehicles = await new VehicleRepository().listAll();
  res.status(200).json({ success: true, data: vehicles });
});

export const findVehicle = catchErrorAsync(async (req, res) => {
  const vehicle = await new VehicleRepository().find(req.params.id);
  res.status(200).json({ success: true, data: vehicle });
});

export const addVehicle = catchErrorAsync(async (req, res) => {
  const vehicle = await new VehicleRepository().add(req.body);
  console.log('addVehicle', vehicle);
  res.status(201).json({ success: true, data: vehicle });
});

export const deleteVehicle = catchErrorAsync(async (req, res) => {
  await new VehicleRepository().remove(req.params.id);
  res.status(204).end();
});

export const updateVehicle = catchErrorAsync(async (req, res) => {
  await new VehicleRepository().update(req.body, req.params.id);
  res.status(204).end();
});

export const updateVehicleModelYear = catchErrorAsync(async (req, res) => {
  await new VehicleRepository().update(req.body.modelYear, req.params.id);
  res.status(204).end();
});
