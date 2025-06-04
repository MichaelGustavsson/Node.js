import express from 'express';
import NetworkServer from './network.mjs';

const PORT = process.env.PORT || 3000;
const server = new NetworkServer();

const app = express();

app.listen(PORT, () => {
  console.log(`Server kör på adress http://localhost:${PORT}`), server.listen();
});
