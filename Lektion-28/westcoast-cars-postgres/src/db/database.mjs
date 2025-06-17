import mysql from 'mysql2/promise';

export default class Database {
  constructor() {
    this.databaseName = process.env.DB_NAME;
    this.connection = undefined;
  }

  // Metod som öppnar databasen...
  async open() {
    this.connection = await mysql.createConnection({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    await this.connection.query(
      'CREATE DATABASE IF NOT EXISTS ' + this.databaseName
    );
  }

  async close() {
    if (this.connection) await this.connection.end();
  }

  // Generell metod för att exekvera frågor...
  async execute(sql, args) {
    await this.connection.query('USE ' + this.databaseName);

    if (!args) {
      const [result] = await this.connection.query(sql);
      return result;
    }

    const [result] = await this.connection.query(sql, args);
    // const [result, fields] = await this.connection.query(sql, args);

    return result;
  }
}
