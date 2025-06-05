import express from 'express';
import Blockchain from './models/blockchain/Blockchain.mjs';

const PORT = process.env.PORT || 5001;

const app = express();
const blockchain = new Blockchain();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server kör på adress http://localhost:${PORT}`);
});
