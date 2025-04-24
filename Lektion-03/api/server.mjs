import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import Storage from './storage.mjs';

// Skapa en server ifrån express...
const app = express();

// Middleware...
app.use(express.json());

app.get('/api/v1/vehicles', async (req, res) => {
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();
  res.status(200).json({ success: true, data: vehicles });
});

app.get('/api/v1/vehicles/:id', async (req, res) => {
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();
  const { id } = req.params;
  // const id = req.params.id;
  const vehicle = vehicles.find((v) => v.id === id);

  res.status(200).json({ success: true, data: vehicle });
});

// TODO: Måste fixa felhantering med storage.mjs.
app.post('/api/v1/vehicles', async (req, res) => {
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();
  req.body.id = uuidv4().replaceAll('-', '');
  vehicles.push(req.body);
  await storage.writeToFile(JSON.stringify(vehicles));
  res.status(201).json({ success: true, data: req.body });
});

app.delete('/api/v1/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();
  const list = vehicles.filter((v) => v.id !== id);
  await storage.writeToFile(JSON.stringify(list));
  res.status(204).end();
});

app.put('/api/v1/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();
  const vehicle = vehicles.find((v) => v.id === id);

  // Uppdatera befintlig bil med den nya informationen...
  vehicle.manufacturer = req.body.manufacturer;
  vehicle.model = req.body.model;
  vehicle.modelYear = req.body.modelYear;

  // Ta bort bilen ur listan...
  const list = vehicles.filter((v) => v.id !== id);
  // Lägg till den uppdaterade bilen igen...
  list.push(vehicle);

  await storage.writeToFile(JSON.stringify(list));

  res.status(204).end();
});

// Övning...
// Göra en patch för enbart modelYear...
app.patch('/api/v1/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  const { modelYear } = req.body;
  const storage = new Storage('data', 'vehicles.json');
  const vehicles = await storage.readFromFile();

  if (!modelYear) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Det saknas information om årsmodell för att kunna uppdatera!',
      });
    return;
  }

  const vehicle = vehicles.find((v) => v.id === id);
  // TODO: Kontrollera så att bilen verkligen finns...
  vehicle.modelYear = modelYear;
  const list = vehicles.filter((v) => v.id !== id);
  list.push(vehicle);

  await storage.writeToFile(JSON.stringify(list));
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servern är startad på adress http://localhost:${PORT}`)
);
