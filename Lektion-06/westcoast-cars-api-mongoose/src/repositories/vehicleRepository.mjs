import Vehicle from '../models/Vehicle.mjs';
import AppError from '../models/appError.mjs';

export default class VehicleRepository {
  async listAll() {
    const vehicles = await Vehicle.find();
    return vehicles;
  }

  async find(id) {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      throw new AppError(`Vi kan inte hitta någon bil med id: ${id}`, 404);
    }

    return vehicle;
  }

  async add(vehicle) {
    const { manufacturer, model, modelYear } = vehicle;

    if (!manufacturer || !model || !modelYear) {
      throw new AppError('Information saknas för att spara bilen!', 400);
    }

    const result = await Vehicle.create({
      manufacturer,
      model,
      modelYear,
    });

    console.log(result);
    return result;
  }

  async remove(id) {
    await Vehicle.findByIdAndDelete(id);
  }

  async update(data, id) {
    await Vehicle.findByIdAndUpdate(id, data, { new: true });
  }
}
