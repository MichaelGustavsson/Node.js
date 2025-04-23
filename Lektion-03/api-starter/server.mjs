import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import Storage from './storage.mjs';

// Skapa en server ifrån express...
const app = express();

// Middleware...
app.use(express.json());

app.get('/api/v1/vehicles', async (req, res) => {
  res.status(200).json({ success: true, data: 'GET funkar' });
});

app.get('/api/v1/vehicles/:id', async (req, res) => {
  res.status(200).json({ success: true, data: 'GET by id funkar' });
});

app.post('/api/v1/vehicles', async (req, res) => {
  res.status(201).json({ success: true, data: 'POST funkar' });
});

app.delete('/api/v1/vehicles/:id', async (req, res) => {
  res.status(200).json({ success: true, data: 'DELETE funkar' });
});

app.put('/api/v1/vehicles/:id', async (req, res) => {
  res.status(200).json({ success: true, data: 'PUT funkar' });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servern är startad på adress http://localhost:${PORT}`)
);
