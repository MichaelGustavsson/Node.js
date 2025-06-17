import Database from '../db/database.mjs';
import { generateId } from '../utilities/uuid.mjs';

export default class ManufacturerRepository {
  constructor() {
    this.db = new Database();
  }

  async add(manufacturer) {
    manufacturer = { id: generateId(), ...manufacturer };

    await this.db.open();

    const result = await this.db.execute(
      'INSERT INTO manufacturers(id, name) VALUES($1,$2) RETURNING *',
      Object.values(manufacturer)
    );
    await this.db.close();

    return result.rows;
  }

  async list() {}

  async find(criteria) {
    await this.db.open();
    const result = await this.db.execute(
      'SELECT * FROM manufacturers WHERE UPPER(name)=$1',
      [criteria.toUpperCase()]
    );
    await this.db.close();
    return result.rows;
  }
}
