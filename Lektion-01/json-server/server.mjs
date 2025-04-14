import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'data', 'vehicles.json');

const server = http.createServer(async (req, res) => {
  const { method } = req;

  let vehicles;
  const fileContent = await fs.readFile(filePath, 'utf-8');
  // Skapar en array av ev befintliga bilar i filen...
  vehicles = JSON.parse(fileContent);

  switch (method) {
    case 'GET':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(vehicles), 'utf-8');
      break;
    case 'POST':
      // Leker med att skapa en bil manuellt...
      const vehicle = {
        id: uuidv4().replaceAll('-', ''),
        manufacturer: 'Ford',
        model: 'Fusion',
      };

      // Lägg till nya bilen till vår array av bilar...
      vehicles.push(vehicle);

      try {
        // Skriv ner vår array av bilar till filen...
        await fs.writeFile(filePath, JSON.stringify(vehicles), 'utf-8');
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(vehicle), 'utf-8');
      } catch (error) {
        console.error(error);
      }
      break;
    case 'PUT':
      break;
    case 'DELETE':
      break;
  }
});
const PORT = 5001;
server.listen(PORT, () =>
  console.log(`Servern är upp och lyssnar på url http://localhost:${PORT}`)
);
