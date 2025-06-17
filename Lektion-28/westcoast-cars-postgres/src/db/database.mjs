import { Client } from 'pg';

export default class Database {
  constructor() {
    this.connection = new Client({
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      host: 'localhost',
      port: process.env.PG_PORT,
      database: process.env.DB_NAME,
    });
  }

  // Metod som öppnar databasen...
  async open() {
    await this.connection.connect();
  }

  async close() {
    if (this.connection) await this.connection.end();
  }

  // Generell metod för att exekvera frågor...
  async execute(sql, args) {
    return await this.connection.query(sql, args);
  }
}
