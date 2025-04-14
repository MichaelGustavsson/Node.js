import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Variabler för att hålla sökvägar...
  const folderPath = path.join(__dirname, 'logs');
  const filePath = path.join(__dirname, 'logs', 'logs.txt');

  /* ÖPPNA FILER */
  /*const file = await fs.open(filePath, 'a');
  await file.appendFile('\nKolla jag uppdaterade filen...', 'utf-8');
  await file.close();*/

  /* KOPIERA FILER... */
  /*await fs.copyFile(filePath, path.join(__dirname, 'logs', 'logs2.txt'));*/

  /* BYT NAMN PÅ FILER... */
  /*await fs.rename(
    path.join(__dirname, 'logs', 'logs2.txt'),
    path.join(__dirname, 'logs', 'newLogs.txt')
  );*/

  /* TA BORT FILER... */
  /*await fs.unlink(path.join(__dirname, 'logs', 'newLogs.txt'));*/
} catch (error) {
  console.error(error);
}
