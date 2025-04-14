import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Variabler för att hålla sökvägar...
  const folderPath = path.join(__dirname, 'docs');
  const filePath = path.join(__dirname, 'docs', 'logs.txt');

  // Skapa mappen docs om den inte finns...
  if (!fs.existsSync(folderPath)) {
    // Skapa mappen...
    fs.mkdir(folderPath, {}, (error) => {
      if (error) throw error;
    });
  }

  // Skapa filen...
  fs.writeFile(filePath, 'Log 1', (error) => {
    if (error) throw error;
    else {
      // Uppdatera filen...
      fs.appendFile(filePath, '\nLog 2', (error) => {
        if (error) throw error;
        else {
          // Läs in filen och visa innehållet...
          fs.readFile(filePath, 'utf-8', (error, content) => {
            if (error) throw error;
            console.log(content);
          });
        }
      });
    }
  });
} catch (error) {
  console.error(error);
}
