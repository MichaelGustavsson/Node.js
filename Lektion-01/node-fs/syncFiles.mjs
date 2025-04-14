import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skapa en tom array...
let vehicles = [];

// Skapa en dummy bil...
let vehicle = {
  id: 1,
  manufacturer: 'Volvo',
  model: 'XC60',
};
vehicles.push(vehicle);

vehicle = {
  id: 2,
  manufacturer: 'Ford',
  model: 'Mustang',
};
vehicles.push(vehicle);

console.log(vehicles);

try {
  // Skriv ner till filsystemet...
  fs.writeFileSync(
    path.join(__dirname, 'data', 'vehicles.json'),
    JSON.stringify(vehicles)
  );

  // Läs in filen ifrån filsystemet...
  const content = fs.readFileSync(
    path.join(__dirname, 'data', 'vehicles.json'),
    'utf-8'
  );
  vehicles = JSON.parse(content);
  console.log(vehicles);
} catch (error) {
  console.error(error);
}
