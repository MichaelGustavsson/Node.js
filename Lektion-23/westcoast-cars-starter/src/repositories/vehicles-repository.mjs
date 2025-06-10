import crypto from 'crypto';
import { db } from '../db/database.mjs';

export default class VehicleRepository {
  async add(vehicle) {
    const {
      registrationNumber,
      manufacturer,
      model,
      modelYear,
      mileage,
      color,
      fuelType,
    } = vehicle;
    const id = crypto.randomUUID().replaceAll('-', '');
    const sql = 'INSERT INTO vehicles VALUES(?,?,?,?,?,?,?,?)';

    await db.run(sql, [
      id,
      registrationNumber,
      manufacturer,
      model,
      modelYear,
      mileage,
      color,
      fuelType,
    ]);

    vehicle.id = id;
    return vehicle;
  }

  async delete(id) {
    await db.all('DELETE FROM vehicles WHERE id = ?', [id]);
  }

  async find(id) {
    return await db.get('SELECT * FROM vehicles WHERE id=?', [id]);
  }

  async list() {
    return await db.all('SELECT * FROM vehicles');
  }

  async update(vehicle) {
    console.log(vehicle);
    const { id, manufacturer, model, modelYear, mileage, color, fuelType } =
      vehicle;

    const sql =
      'UPDATE vehicles SET manufacturer=?, model=?, modelYear=?, mileage=?, color=?, fuelType=? WHERE id=?';

    await db.run(sql, [
      manufacturer,
      model,
      modelYear,
      mileage,
      color,
      fuelType,
      id,
    ]);
  }

  async updateMileage(id, mileage) {
    const sql = 'UPDATE vehicles SET mileage=? WHERE id=?';

    await db.run(sql, [mileage, id]);
  }
}
