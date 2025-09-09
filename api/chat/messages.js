// Simple in-memory message store for polling
// In production, use Redis or database

let messages = [];
let lastMessageId = 0;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get messages since lastMessageId
    const { since, userSiteId } = req.query;
    const sinceId = since ? parseInt(since) : 0;

    // Filter messages: show only personal messages for this user OR global messages (without userSiteId)
    let filteredMessages = messages.filter((msg) => {
      if (msg.id <= sinceId) return false;

      // If message has userSiteId, show only to that user
      if (msg.userSiteId) {
        return msg.userSiteId === userSiteId;
      }

      // If message has no userSiteId, it's a global message - show to everyone
      return true;
    });

    return res.status(200).json({
      success: true,
      messages: filteredMessages,
      lastMessageId: messages.length > 0 ? messages[messages.length - 1].id : 0,
    });
  }

  if (req.method === 'POST') {
    // Add new message (called by webhook)
    console.log('📨 Messages API POST called:', req.body);
    const { message } = req.body;

    if (!message || !message.text) {
      console.log('❌ Invalid message format:', message);
      return res.status(400).json({ error: 'Invalid message format' });
    }

    const newMessage = {
      id: ++lastMessageId,
      text: message.text,
      timestamp: message.timestamp || Date.now(),
      type: 'bot', // Messages from webhook are always from bot
      userSiteId: message.userSiteId || null, // Add userSiteId for personal messages
    };

    console.log('💾 Storing new message:', newMessage);
    messages.push(newMessage);
    console.log('📊 Total messages count:', messages.length);

    // Keep only last 50 messages
    if (messages.length > 50) {
      messages = messages.slice(-50);
    }

    return res.status(200).json({ success: true, messageId: newMessage.id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
