import vehicleModel from '../models/schemas/vehicleModel.mjs';

export default class VehicleRepository {
  // Lägg till en ny bil...
  async add(vehicle) {
    return await vehicleModel.create(vehicle);
  }

  // Ta bort en bil...
  async delete(id) {
    await vehicleModel.findByIdAndDelete(id);
  }

  // Hämta en speciell bil...
  async find(id) {
    return await vehicleModel.findById(id);
  }

  // Hitta en bil baserat på dess registreringsnummer...
  async findByRegNo(regNo) {
    return await vehicleModel.findOne({ registrationNumber: regNo });
  }

  // Hämta alla dokument över vilka bilar som finns i systemet...
  async list() {
    return await vehicleModel.find();
  }

  // Uppdatera en bil...
  async update(vehicle) {
    await vehicleModel.findByIdAndUpdate(vehicle.id, vehicle);
  }
}
