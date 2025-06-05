import { WebSocket, WebSocketServer } from 'ws';

// ws://????
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;
// MEMBER_NODES ws://localhost:3000,ws://localhost:3001
const NODES = process.env.MEMBER_NODES
  ? process.env.MEMBER_NODES.split(',')
  : [];

export default class Network {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.nodes = [];
  }

  listen() {
    console.log('SOCKET_PORT', SOCKET_PORT);

    // Skapa en websocket server...
    const server = new WebSocketServer({ port: SOCKET_PORT });

    // Vi lyssnar på anslutningar...
    server.on('connection', (socket) => this.connectNode(socket));

    // Registerar den nya noden till min array av noder...
    this.connectNodes();

    console.log(`Lyssnar på anslutningar på socket: ${SOCKET_PORT}`);
  }

  connectNodes() {
    NODES.forEach((node) => {
      const socket = new WebSocket(node);
      socket.on('open', () => this.connectNode(socket));
    });
  }

  connectNode(socket) {
    this.nodes.push(socket);
    console.log('connected node');

    this.messageHandler(socket);

    socket.send(JSON.stringify(this.blockchain));
    // socket.send(JSON.stringify(`Hej på dig ${SOCKET_PORT}`));
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      this.blockchain.replaceChain(data.chain);
      console.log('Blockchain: ', data);
    });
  }

  broadcastChain() {
    this.nodes.forEach((socket) => {
      socket.send(JSON.stringify(this.blockchain));
    });
  }
}
