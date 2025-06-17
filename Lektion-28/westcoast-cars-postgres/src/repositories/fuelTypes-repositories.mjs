import Database from '../db/database.mjs';
import { generateId } from '../utilities/uuid.mjs';

export default class FuelTypeRepository {
  constructor() {
    this.db = new Database();
  }

  async add(fuelType) {
    fuelType = { id: generateId(), ...fuelType };

    await this.db.open();

    const result = await this.db.execute(
      'INSERT INTO fuelTypes(id, fuelType) VALUES($1,$2) RETURNING *',
      Object.values(fuelType)
    );

    await this.db.close();

    return result.rows;
  }

  async list() {
    await this.db.open();
    const sql = 'SELECT * FROM fuelTypes';
    const result = await this.db.execute(sql);
    await this.db.close();
    return result;
  }

  async find(criteria) {
    await this.db.open();
    const sql = 'SELECT * FROM fuelTypes WHERE UPPER(fuelType)=$1';
    const result = await this.db.execute(sql, [criteria.toUpperCase()]);
    await this.db.close();
    return result.rows;
  }
}
