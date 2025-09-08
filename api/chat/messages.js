// Simple in-memory message store for polling
// In production, use Redis or database

let messages = [];
let lastMessageId = 0;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get messages since lastMessageId
    const { since } = req.query;
    const sinceId = since ? parseInt(since) : 0;
    
    const newMessages = messages.filter(msg => msg.id > sinceId);
    
    return res.status(200).json({
      success: true,
      messages: newMessages,
      lastMessageId: messages.length > 0 ? messages[messages.length - 1].id : 0
    });
  }
  
  if (req.method === 'POST') {
    // Add new message (called by webhook)
    const { message } = req.body;
    
    if (!message || !message.text) {
      return res.status(400).json({ error: 'Invalid message format' });
    }
    
    const newMessage = {
      id: ++lastMessageId,
      text: message.text,
      timestamp: message.timestamp || Date.now(),
      isFromUser: false
    };
    
    messages.push(newMessage);
    
    // Keep only last 50 messages
    if (messages.length > 50) {
      messages = messages.slice(-50);
    }
    
    console.log('Message stored:', newMessage);
    
    return res.status(200).json({ success: true, messageId: newMessage.id });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
