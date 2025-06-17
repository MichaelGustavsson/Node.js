import Database from './database.mjs';

export const setupDatabase = async () => {
  const db = new Database();
  await db.open();

  // Skapa tabellen manufacturers
  const sql_manufacturers = `CREATE TABLE IF NOT EXISTS manufacturers(
    id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE
  )`;

  // Skapa tabellen fuelTypes
  const sql_fuelTypes = `CREATE TABLE IF NOT EXISTS fuelTypes(
    id VARCHAR(128) PRIMARY KEY,
    fuelType VARCHAR(20) NOT NULL UNIQUE
  )`;

  // Skapa tabellen vehicles...
  const sql_vehicles = `CREATE TABLE IF NOT EXISTS vehicles(
    id VARCHAR(128) PRIMARY KEY,
    registrationNumber VARCHAR(6) UNIQUE NOT NULL,
    manufacturerId VARCHAR(128) NOT NULL,
    model VARCHAR(80) NOT NULL,
    modelYear INT NOT NULL,
    mileage INT NOT NULL,
    color VARCHAR(20),
    fuelTypeId VARCHAR(128),
    FOREIGN KEY(manufacturerId) REFERENCES manufacturers(id),
    FOREIGN KEY(fuelTypeId) REFERENCES fuelTypes(id)
  )`;

  await db.execute(sql_manufacturers);
  await db.execute(sql_fuelTypes);
  await db.execute(sql_vehicles);

  await db.close();
};
