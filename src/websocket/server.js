import WebSocket, { WebSocketServer } from 'ws';
import { consumer } from '../config/kafka.js';

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

consumer.on('message', (message) => {
    const vote = JSON.parse(message.value);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(vote));
        }
    });
});

export default wss;
