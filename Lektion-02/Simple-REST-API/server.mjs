import express from 'express';
import { vehicles } from './data/vehicles.mjs';
import { v4 as uuidv4 } from 'uuid';

// Skapa en server ifrån express...
const app = express();

// Middleware...
app.use(express.json());

// Här skapa våra endpoints...
// Jag hämtar alla bilar...
app.get('/api/vehicles', (req, res) => {
  res.status(200).json({ success: true, data: vehicles });
});

// Jag hämtar en bil med dess id...
app.get('/api/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const vehicle = vehicles.find((v) => v.id === +id);
  res.status(200).json({ success: true, data: vehicle });
});

// Jag lägger till en ny bil...
app.post('/api/vehicles', (req, res) => {
  req.body.id = uuidv4().replaceAll('-', '');
  vehicles.push(req.body);
  res.status(201).json({ success: true, data: req.body });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servern är startad på porten: ${PORT}`));
