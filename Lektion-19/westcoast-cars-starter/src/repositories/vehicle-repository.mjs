import AppError from '../models/error/appError.mjs';

export default class VehicleRepository {
  async listAll() {
    const response = await fetch('http://localhost:3000/vehicles');
    if (response.ok) {
      const vehicles = await response.json();
      return vehicles;
    } else {
      throw new AppError(response.statusText, response.status);
    }
  }

  async findById(id) {
    const response = await fetch(`http://localhost:3000/vehicles/${id}`);
    if (response.ok) {
      const vehicle = await response.json();
      return vehicle;
    } else {
      throw new AppError(response.statusText, response.status);
    }
  }

  async add(vehicle) {
    const response = await fetch('http://localhost:3000/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });

    if (response.ok) {
      const vehicle = await response.json();
      return vehicle;
    } else {
      throw new AppError(response.statusText, response.status);
    }
  }
}
