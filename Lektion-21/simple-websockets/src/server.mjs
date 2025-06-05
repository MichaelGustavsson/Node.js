import express from 'express';
import NetworkServer from './network.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';

const PORT = process.env.PORT || 5001;

const app = express();
const blockchain = new Blockchain();
const server = new NetworkServer(blockchain);

app.use(express.json());

app.get('/api/v1/vehicles', (req, res) => {
  res
    .status(200)
    .json({ success: true, statusCode: 200, data: blockchain.chain });
});

app.post('/api/v1/vehicles', (req, res) => {
  blockchain.addBlock(req.body);

  server.broadcastChain();

  res.status(201).json({ success: true, statusCode: 201, data: blockchain });
});

app.listen(PORT, () => {
  console.log(`Server kör på adress http://localhost:${PORT}`);
  // Starta upp vår websocket server...
  server.listen();
});
