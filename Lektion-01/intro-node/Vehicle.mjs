import { vehicles } from './vehicles.mjs';

export default class Vehicle {
  listVehicles() {
    return vehicles;
  }

  findVehicle(id) {
    return vehicles.find((vehicle) => vehicle.id === id);
  }
}
