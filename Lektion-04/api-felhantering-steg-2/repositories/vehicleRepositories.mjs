import { v4 as uuidv4 } from 'uuid';
import Storage from '../storage.mjs';

export default class VehicleRepository {
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
    return vehicles.find((v) => v.id === id);
  }

  async add(vehicle) {
    // Något saknas...
    throw new Error('Det gick åt h-e, något saknas');
    vehicle.id = uuidv4().replaceAll('-', '');
    const vehicles = await this.#storage.readFromFile();
    vehicles.push(vehicle);
    await this.#storage.writeToFile(JSON.stringify(vehicles));
    return vehicle;
  }

  async remove(id) {
    console.log(id);
    const vehicles = await this.#storage.readFromFile();
    const list = vehicles.filter((v) => v.id !== id);
    await this.#storage.writeToFile(JSON.stringify(list));
  }

  async update(data, id) {
    const vehicles = await this.#storage.readFromFile();
    const vehicle = vehicles.find((v) => v.id === id);
    vehicle.manufacturer = data.manufacturer;
    vehicle.model = data.model;
    vehicle.modelYear = data.modelYear;

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
