import VehicleRepository from '../repositories/vehicleRepositories.mjs';

export const listAllVehicles = async (req, res) => {
  const vehicles = await new VehicleRepository().listAll();
  res.status(200).json({ success: true, data: vehicles });
};

export const findVehicle = async (req, res) => {
  const vehicle = await new VehicleRepository().find(req.params.id);
  res.status(200).json({ success: true, data: vehicle });
};

export const addVehicle = async (req, res) => {
  const vehicle = await new VehicleRepository().add(req.body);
  res.status(201).json({ success: true, data: vehicle });
};

export const deleteVehicle = async (req, res) => {
  await new VehicleRepository().remove(req.params.id);
  res.status(204).end();
};

export const updateVehicle = async (req, res) => {
  await new VehicleRepository().update(req.body, req.params.id);
  res.status(204).end();
};

export const updateVehicleModelYear = async (req, res) => {
  await new VehicleRepository().update(req.body.modelYear, req.params.id);
  res.status(204).end();
};
