import fs from 'fs/promises';
import path from 'path';

export const logger = async (req, res, next) => {
  const filePath = path.join(__appdir, 'logs', 'app.log');
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}`;

  console.log(message);
  // Skriv loggen till en fil i en katalog som ska heta logs.
  // Skapa en fil som heter logs.log
  await fs.appendFile(filePath, message + '\n');

  next();
};
