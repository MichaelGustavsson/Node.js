import crypto from 'crypto';
import { db } from '../db/database.mjs';

export default class ManufacturerRepository {
  async add(name) {
    const id = crypto.randomUUID().replaceAll('-', '');
    await db.run('INSERT INTO manufacturers VALUES(?,?)', [id, name]);

    return { id, name };
  }

  async find(id) {
    return await db.get('SELECT * FROM manufacturers WHERE id=?', [id]);
  }

  async list() {
    return await db.all('SELECT * FROM manufacturers');
  }
}
