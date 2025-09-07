// Simple SSE server for local development
// Run with: node sse-dev-server.js

import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Store connected clients
const clients = new Set();

// SSE endpoint
app.get('/api/chat/sse', (req, res) => {
  console.log('New SSE client connected');

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  });

  // Add client to set
  clients.add(res);

  // Send initial connection event
  res.write('data: {"type":"status","data":{"status":"connected"}}\n\n');

  // Keep connection alive
  const keepAlive = setInterval(() => {
    try {
      res.write('data: {"type":"ping"}\n\n');
    } catch (error) {
      // Connection closed
      clearInterval(keepAlive);
      clients.delete(res);
    }
  }, 30000);

  // Cleanup on disconnect
  req.on('close', () => {
    console.log('SSE client disconnected');
    clearInterval(keepAlive);
    clients.delete(res);
  });

  req.on('aborted', () => {
    clearInterval(keepAlive);
    clients.delete(res);
  });
});

// Endpoint to simulate receiving a message from Telegram
app.post('/api/test-message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Broadcast to all connected clients
  const data = JSON.stringify({
    type: 'message',
    data: {
      message: message,
      timestamp: Date.now(),
      id: Date.now().toString(),
    },
  });

  clients.forEach((client) => {
    try {
      client.write(`data: ${data}\n\n`);
    } catch (error) {
      console.error('Error sending SSE message:', error);
      clients.delete(client);
    }
  });

  res.json({ success: true, clients: clients.size });
});

app.listen(PORT, () => {
  console.log(`SSE dev server running on http://localhost:${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/api/chat/sse`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test-message`);
});
