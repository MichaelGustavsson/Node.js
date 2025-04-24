import { v4 as uuidv4 } from 'uuid';
import Storage from '../storage.mjs';

export const listAllVehicles = async (req, res) => {
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();
  res.status(200).json({ success: true, data: vehicles });
};

// findVehicle

// addVehicle

// deleteVehicle

// updateVehicle

// updateModelYear
