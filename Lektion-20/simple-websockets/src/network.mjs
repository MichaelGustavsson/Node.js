import { WebSocket, WebSocketServer } from 'ws';

const SOCKET_PORT = process.env.SOCKET_PORT || 5001;
// MEMBER_NODES = ws://localhost:5001,ws://localhost:5002...
const NODES = process.env.MEMBER_NODES
  ? process.env.MEMBER_NODES.split(',')
  : [];

export default class Network {
  constructor() {
    this.nodes = [];
  }

  listen() {
    const server = new WebSocketServer({ port: SOCKET_PORT });

    server.on('connection', (socket) => this.connectNode(socket));

    this.connectToNodes();

    console.log(`Lyssnar på anslutningar på socket: ${SOCKET_PORT}`);
  }

  connectNode(socket) {
    this.nodes.push(socket);
    console.log('Dator är ansluten');
    this.messageHandler(socket);

    socket.send(JSON.stringify(`Hello från kompisen: ${SOCKET_PORT}`));
  }

  connectToNodes() {
    NODES.forEach((node) => {
      const socket = new WebSocket(node);
      socket.on('open', () => this.connectNode(socket));
    });
  }

  messageHandler(socket) {
    socket.on('message', (message) =>
      console.log('Message', JSON.parse(message))
    );
  }
}
