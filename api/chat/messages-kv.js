// Vercel KV storage for reliable message delivery
// Stores undelivered messages for 15 days with automatic cleanup

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Get undelivered messages for specific user
    const { userSiteId } = req.query;

    if (!userSiteId) {
      return res.status(400).json({ error: 'userSiteId is required' });
    }

    try {
      // Get message keys for this user AND global messages
      const userMessageKeys = await kv.keys(`message:${userSiteId}:*`);
      const globalMessageKeys = await kv.keys(`message:global:*`);

      // Combine both arrays
      const allMessageKeys = [...userMessageKeys, ...globalMessageKeys];

      if (allMessageKeys.length === 0) {
        return res.status(200).json({
          success: true,
          messages: [],
          count: 0,
        });
      }

      // Get all messages at once
      const messages = await kv.mget(...allMessageKeys);

      // Filter out null values and format messages
      const validMessages = messages
        .filter((msg) => msg !== null)
        .map((msg) => ({
          id: msg.id,
          text: msg.text,
          timestamp: msg.timestamp,
          type: msg.type,
          userSiteId: msg.userSiteId,
        }))
        .sort((a, b) => a.timestamp - b.timestamp);

      // Delete delivered messages from KV
      if (allMessageKeys.length > 0) {
        await kv.del(...allMessageKeys);
      }

      return res.status(200).json({
        success: true,
        messages: validMessages,
        count: validMessages.length,
      });
    } catch (error) {
      console.error('❌ Error fetching messages from KV:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  if (req.method === 'POST') {
    // Store new message with 15-day TTL
    const { message } = req.body;

    if (!message || !message.text || !message.userSiteId) {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    try {
      const messageKey = `message:${message.userSiteId}:${message.id}`;
      const messageData = {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp || Date.now(),
        type: message.type || 'owner',
        userSiteId: message.userSiteId,
        createdAt: new Date().toISOString(),
      };

      // Store with 15-day TTL (15 * 24 * 60 * 60 = 1,296,000 seconds)
      await kv.setex(messageKey, 15 * 24 * 60 * 60, messageData);

      return res.status(200).json({
        success: true,
        messageId: message.id,
        ttl: 15 * 24 * 60 * 60,
      });
    } catch (error) {
      console.error('❌ Error storing message in KV:', error);
      return res.status(500).json({ error: 'Failed to store message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
