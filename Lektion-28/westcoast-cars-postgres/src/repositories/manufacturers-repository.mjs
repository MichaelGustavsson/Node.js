import Database from '../db/database.mjs';
import { generateId } from '../utilities/uuid.mjs';

export default class ManufacturerRepository {
  constructor() {
    this.db = new Database();
  }

  async add(manufacturer) {
    manufacturer = { id: generateId(), ...manufacturer };

    await this.db.open();

    await this.db.execute(
      'INSERT INTO manufacturers(id, name) VALUES(?,?)',
      Object.values(manufacturer)
    );
    await this.db.close();
  }

  async list() {}

  async find(criteria) {
    await this.db.open();
    const result = await this.db.execute(
      'SELECT * FROM manufacturers WHERE UPPER(name)=?',
      criteria.toUpperCase()
    );
    await this.db.close();
    return result;
  }
}
