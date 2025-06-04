import crypto from 'crypto';
import { blockchain } from '../server.mjs';
import AppError from '../models/error/appError.mjs';

export default class VehicleRepository {
  async listAll() {
    const vehicles = await this.cleanUpBlockchainData();

    return vehicles;
  }

  async findById(id) {
    const list = await this.cleanUpBlockchainData();
    const vehicle = list.find((v) => v.id === id);

    if (vehicle) return vehicle;

    throw new AppError(`Hittade ingen bil med id: ${id}`, 404);
  }

  async findByManufacturer(make) {
    const list = await this.cleanUpBlockchainData();
    const vehicles = list.filter(
      (vehicle) => vehicle.manufacturer.toLowerCase() === make.toLowerCase()
    );

    return vehicles;
  }

  async add(vehicle) {
    vehicle.id = crypto.randomUUID().replaceAll('-', '');
    blockchain.addBlock({ data: vehicle });
    return blockchain.chain;
  }

  /* Support funktioner */
  async cleanUpBlockchainData() {
    const blocks = blockchain.chain.slice(1);
    const list = blocks.map((blocks) => blocks.data.data);
    return list;
  }
}
