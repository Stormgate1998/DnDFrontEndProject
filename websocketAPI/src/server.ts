import express from 'express';
import http from 'http';
import { Server as WebSocketServer } from 'ws';

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/chatws' });
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(message.toString());//removing tostring breaks things
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});