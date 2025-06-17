import Database from '../db/database.mjs';
import { generateId } from '../utilities/uuid.mjs';
import ManufacturerRepository from './manufacturers-repository.mjs';
import FuelTypeRepository from './fuelTypes-repositories.mjs';

export default class VehicleRepository {
  constructor() {
    this.db = new Database();
  }

  // Lägg en ny bil...
  async add(vehicle) {
    vehicle.id = generateId();
    const {
      id,
      registrationNumber,
      manufacturer,
      model,
      modelYear,
      mileage,
      color,
      fuelType,
    } = vehicle;

    await this.db.open();

    // 1. Hämta id för tillverkare
    const make = await new ManufacturerRepository().find(manufacturer);

    // 2. Hämta id för bränsletyp
    const fuel = await new FuelTypeRepository().find(fuelType);

    // 3. Skapa argumentlistan för vehicles
    const args = [
      id,
      registrationNumber,
      make[0].id,
      model,
      modelYear,
      mileage,
      color,
      fuel[0].id,
    ];

    // 4. Spara bilen till tabellen...
    await this.db.execute(
      `INSERT INTO vehicles(id,registrationNumber,manufacturerId,model,modelYear,mileage,color,fuelTypeId)
      VALUES(?,?,?,?,?,?,?,?)`,
      args
    );

    await this.db.close();
    return vehicle;
  }

  // Ta bort en bil...
  async delete(id) {
    // DELETE FROM vehicles WHERE id=?
  }

  // Hämta en speciell bil...
  async find(id) {
    await this.db.open();

    const sql = `SELECT v.id, registrationNumber, m.name, model,modelYear,mileage,color,f.fueltype 
      FROM vehicles AS v INNER JOIN manufacturers AS m ON v.manufacturerId = m.id
      INNER JOIN fuelTypes AS f ON v.fuelTypeId = f.id  WHERE v.id=?`;

    const result = await this.db.execute(sql, id);
    await this.db.close();

    return result;
  }

  // Hämta alla dokument över vilka bilar som finns i systemet...
  async list() {
    await this.db.open();

    const sql = `SELECT v.id, registrationNumber, m.name, model,modelYear,mileage,color,f.fueltype 
      FROM vehicles AS v INNER JOIN manufacturers AS m ON v.manufacturerId = m.id
      INNER JOIN fuelTypes AS f ON v.fuelTypeId = f.id`;

    const result = await this.db.execute(sql);
    await this.db.close();

    return result;
  }

  // Uppdatera en bil...
  async update(vehicle) {
    // UPDATE vehicles SET modelYear=?, mileage=? WHERE id=?
  }
}
