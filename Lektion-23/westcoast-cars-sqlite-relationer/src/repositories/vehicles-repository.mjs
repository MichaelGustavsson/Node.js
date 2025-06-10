import crypto from 'crypto';
import { db } from '../db/database.mjs';
import ManufacturerRepository from './manufactures-repository.mjs';

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

    /* Add måste nu delas upp i två steg */
    // Steg 1.  Är att hitta id för angiven/medskickad tillverkare
    const make = await db.get('SELECT * FROM manufacturers WHERE name=?', [
      manufacturer,
    ]);

    // Steg 2.  Är att lägga en ny bil med id fångat i steg 1.
    const id = crypto.randomUUID().replaceAll('-', '');
    const sql = 'INSERT INTO vehicles VALUES(?,?,?,?,?,?,?,?)';

    await db.run(sql, [
      id,
      registrationNumber,
      make.id,
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
    return await db.get(
      'SELECT v.id,registrationNumber,m.name AS manufacturer, model,modelYear,mileage,color,fuelType FROM vehicles AS v INNER JOIN manufacturers AS m ON v.manufacturerId = m.id WHERE v.id=?',
      [id]
    );
  }

  async list() {
    return await db.all(
      'SELECT v.id,registrationNumber,m.name AS manufacturer, model,modelYear,mileage,color,fuelType FROM vehicles AS v INNER JOIN manufacturers AS m ON v.manufacturerId = m.id'
    );
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
