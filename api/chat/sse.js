// Server-Sent Events endpoint for real-time chat responses
// This works on Vercel!

// In-memory store for connected clients (in production, use Redis or similar)
const clients = new Set();

export default async function handler(req, res) {
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  });

  // Add this client to the set
  clients.add(res);

  // Send initial connection event
  res.write('data: {"type":"status","data":{"status":"connected"}}\n\n');

  // Keep connection alive with less frequent pings
  const keepAlive = setInterval(() => {
    try {
      res.write('data: {"type":"ping"}\n\n');
    } catch (error) {
      // Connection closed, cleanup
      clearInterval(keepAlive);
      clients.delete(res);
    }
  }, 60000); // Ping every minute instead of 30 seconds

  // Cleanup on disconnect
  req.on('close', () => {
    clearInterval(keepAlive);
    clients.delete(res);
  });

  // Handle client disconnect
  req.on('aborted', () => {
    clearInterval(keepAlive);
    clients.delete(res);
  });

  // Handle errors
  req.on('error', () => {
    clearInterval(keepAlive);
    clients.delete(res);
  });
}

// Function to broadcast message to all connected clients
export function broadcastMessage(message) {
  const data = JSON.stringify({
    type: 'message',
    data: {
      message: message.text,
      timestamp: message.timestamp || Date.now(),
      id: message.id || Date.now().toString(),
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
}
