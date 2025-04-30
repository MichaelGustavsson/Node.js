import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './models/appError.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Storage {
  #filePath = undefined;

  constructor(folder, filename) {
    this.#filePath = path.join(__dirname, folder, filename);
  }

  async readFromFile() {
    try {
      const content = await fs.readFile(this.#filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  async writeToFile(data) {
    try {
      await fs.writeFile(this.#filePath, data, 'utf-8');
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
