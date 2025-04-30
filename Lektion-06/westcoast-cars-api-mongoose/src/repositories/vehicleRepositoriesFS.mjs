import { v4 as uuidv4 } from 'uuid';
import Storage from '../storage.mjs';
import AppError from '../models/appError.mjs';

export default class VehicleRepositoryFS {
  #storage = undefined;

  constructor() {
    this.#storage = new Storage('data', 'vehicles.json');
  }

  async listAll() {
    const vehicles = await this.#storage.readFromFile();
    return vehicles;
  }

  async find(id) {
    const vehicles = await this.#storage.readFromFile();
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle)
      throw new AppError(`Vi kunde inte hitta någon bil med id ${id}`, 404);

    return vehicle;
  }

  async add(vehicle) {
    const { manufacturer, model, modelYear } = vehicle;

    if (!manufacturer || !model || !modelYear)
      throw new AppError('All information om bilen måste skickas med', 400);

    vehicle.id = uuidv4().replaceAll('-', '');
    const vehicles = await this.#storage.readFromFile();
    vehicles.push(vehicle);
    await this.#storage.writeToFile(JSON.stringify(vehicles));
    return vehicle;
  }

  async remove(id) {
    const vehicles = await this.#storage.readFromFile();

    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle)
      throw new AppError(`Vi kunde inte hitta någon bil med id ${id}`, 404);

    const list = vehicles.filter((v) => v.id !== id);
    await this.#storage.writeToFile(JSON.stringify(list));
  }

  async update(data, id) {
    const vehicles = await this.#storage.readFromFile();
    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle)
      throw new AppError(`Vi kunde inte hitta någon bil med id ${id}`, 404);

    vehicle.manufacturer = data.manufacturer || vehicle.manufacturer;
    vehicle.model = data.model || vehicle.model;
    vehicle.modelYear = data.modelYear || vehicle.modelYear;

    const list = vehicles.filter((v) => v.id !== id);
    list.push(vehicle);
    await this.#storage.writeToFile(JSON.stringify(list));
  }

  async updateModelYear(data, id) {
    const vehicles = await this.#storage.readFromFile();
    const vehicle = vehicles.find((v) => v.id === id);

    vehicle.modelYear = data.modelYear;

    const list = vehicles.filter((v) => v.id !== id);
    list.push(vehicle);
    await this.#storage.writeToFile(JSON.stringify(list));
  }
}
