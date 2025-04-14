import path from 'path';
import folder from 'fs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Variabler för att hålla sökvägar...
  const folderPath = path.join(__dirname, 'logs');
  const filePath = path.join(__dirname, 'logs', 'logs.txt');

  if (!folder.existsSync(folderPath)) {
    await fs.mkdir(folderPath, {});
  }

  await fs.writeFile(filePath, 'Log 1 igen', 'utf-8');
  await fs.appendFile(filePath, '\nLog 2 igen', 'utf-8');
  await fs.appendFile(filePath, '\nLog 3', 'utf-8');
  await fs.appendFile(filePath, '\nLog 4', 'utf-8');

  const content = await fs.readFile(filePath, 'utf-8');
  console.log(content);
} catch (error) {
  console.error(error);
}
