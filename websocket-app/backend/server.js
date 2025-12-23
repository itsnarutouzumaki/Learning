const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// WebSocket server setup
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

wss.on('connection', (ws, req) => {
  console.log('New client connected');
  
  // Generate unique ID for client
  const clientId = Date.now();
  clients.set(clientId, ws);
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Welcome to WebSocket Server!',
    clientId: clientId
  }));
  
  // Broadcast to all clients that a new user joined
  broadcast({
    type: 'user-joined',
    message: `User ${clientId} joined the chat`,
    clientId: clientId,
    timestamp: new Date().toISOString()
  }, clientId);
  
  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);
      
      // Handle different message types
      switch (data.type) {
        case 'chat':
          broadcast({
            type: 'chat',
            message: data.message,
            clientId: clientId,
            username: data.username || `User ${clientId}`,
            timestamp: new Date().toISOString()
          }, clientId);
          break;
          
        case 'typing':
          broadcast({
            type: 'typing',
            clientId: clientId,
            username: data.username || `User ${clientId}`
          }, clientId);
          break;
          
        default:
          // Echo back to sender
          ws.send(JSON.stringify({
            type: 'echo',
            message: 'Message received',
            data: data
          }));
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  // Handle client disconnect
  ws.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    clients.delete(clientId);
    
    // Broadcast user left
    broadcast({
      type: 'user-left',
      message: `User ${clientId} left the chat`,
      clientId: clientId,
      timestamp: new Date().toISOString()
    });
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Helper function to broadcast messages to all clients
function broadcast(data, excludeClientId = null) {
  const message = JSON.stringify(data);
  
  clients.forEach((client, clientId) => {
    if (client.readyState === WebSocket.OPEN && clientId !== excludeClientId) {
      client.send(message);
    }
  });
}

// Simple REST endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'WebSocket server is running',
    connectedClients: clients.size
  });
});

app.get('/api/clients', (req, res) => {
  res.json({
    connectedClients: Array.from(clients.keys())
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
  console.log(`REST API: http://localhost:${PORT}/api/health`);
});