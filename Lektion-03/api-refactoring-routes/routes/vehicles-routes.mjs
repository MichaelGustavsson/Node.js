import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Storage from '../storage.mjs';

const vehicleRouter = express.Router();

// TODO: Måste fixa felhantering med storage.mjs.

vehicleRouter
  .route('/')
  .get(async (req, res) => {
    const storage = new Storage('data', 'vehicles.json');
    const vehicles = await storage.readFromFile();
    res.status(200).json({ success: true, data: vehicles });
  })
  .post(async (req, res) => {
    const storage = new Storage('data', 'vehicles.json');
    const vehicles = await storage.readFromFile();
    req.body.id = uuidv4().replaceAll('-', '');
    vehicles.push(req.body);
    await storage.writeToFile(JSON.stringify(vehicles));
    res.status(201).json({ success: true, data: req.body });
  });

vehicleRouter
  .route('/:id')
  .get(async (req, res) => {
    const storage = new Storage('data', 'vehicles.json');
    const vehicles = await storage.readFromFile();
    const { id } = req.params;
    const vehicle = vehicles.find((v) => v.id === id);
    res.status(200).json({ success: true, data: vehicle });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const storage = new Storage('data', 'vehicles.json');
    const vehicles = await storage.readFromFile();
    const list = vehicles.filter((v) => v.id !== id);
    await storage.writeToFile(JSON.stringify(list));
    res.status(204).end();
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const storage = new Storage('data', 'vehicles.json');
    const vehicles = await storage.readFromFile();
    const vehicle = vehicles.find((v) => v.id === id);

    vehicle.manufacturer = req.body.manufacturer;
    vehicle.model = req.body.model;
    vehicle.modelYear = req.body.modelYear;

    const list = vehicles.filter((v) => v.id !== id);
    list.push(vehicle);

    await storage.writeToFile(JSON.stringify(list));

    res.status(204).end();
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { modelYear } = req.body;
    const storage = new Storage('data', 'vehicles.json');
    const vehicles = await storage.readFromFile();

    if (!modelYear) {
      res.status(400).json({
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

export default vehicleRouter;
