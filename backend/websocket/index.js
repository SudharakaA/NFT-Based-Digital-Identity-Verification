const WebSocket = require('ws');

let wss;
const clients = new Set();

const initializeWebSocket = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.add(ws);
        
        ws.on('close', () => {
            clients.delete(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
};

const broadcastToClients = (data) => {
    const message = JSON.stringify(data);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

module.exports = {
    initializeWebSocket,
    broadcastToClients
};
