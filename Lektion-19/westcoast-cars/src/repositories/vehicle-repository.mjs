import crypto from 'crypto';
import { blockchain } from '../server.mjs';

export default class VehicleRepository {
  async listAll() {
    return blockchain.chain;
  }

  async findById(id) {
    return blockchain.chain.find((block) => block.id === id);
  }

  // Skapar en metod för att hämta ut en bil med tillverkarens namn...

  async add(vehicle) {
    vehicle.id = crypto.randomUUID().replaceAll('-', '');
    blockchain.addBlock({ data: vehicle });
    return blockchain.chain;
  }
}
