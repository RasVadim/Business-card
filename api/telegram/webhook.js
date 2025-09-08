// Webhook endpoint for receiving messages from Telegram Bot
// This endpoint will be called by Telegram when you reply to the bot

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || !message.text) {
      console.log('Invalid message format:', message);
      return res.status(400).json({ error: 'Invalid message format' });
    }

    // Check if this is a message from a user (not from bot itself)
    if (message.from && !message.from.is_bot) {
      // Extract userSiteId from reply if this is a reply to a message with userSiteId
      let userSiteId = null;

      if (message.reply_to_message && message.reply_to_message.text) {
        // Look for userSiteId in the replied message
        const userSiteIdMatch = message.reply_to_message.text.match(
          /🆔.*?userSiteId.*?:\s*([^\n]+)/,
        );
        if (userSiteIdMatch) {
          userSiteId = userSiteIdMatch[1].trim();
          console.log('Extracted userSiteId from reply:', userSiteId);
        }
      }

      // If no userSiteId found, this is a global message (no reply or reply without userSiteId)
      if (!userSiteId) {
        console.log('No userSiteId found - this will be a global message');
      }

      // This is a message from user
      const chatMessage = {
        id: message.message_id.toString(),
        text: message.text,
        timestamp: message.date * 1000, // Convert Unix timestamp to milliseconds
        userSiteId: userSiteId, // Add userSiteId for personal messages
      };

      // Also store message for polling fallback
      try {
        // eslint-disable-next-line no-undef
        const baseUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000';

        console.log('Attempting to store message for polling at:', `${baseUrl}/api/chat/messages`);

        const response = await fetch(`${baseUrl}/api/chat/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: chatMessage }),
        });

        console.log('Polling storage response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('Message stored for polling successfully:', result);
        } else {
          const errorText = await response.text();
          console.error(
            'Failed to store message for polling. Status:',
            response.status,
            'Error:',
            errorText,
          );
        }
      } catch (error) {
        console.error('Failed to store message for polling:', error);
      }

      return res.status(200).json({ success: true });
    }

    // If it's from bot itself, ignore it
    return res.status(200).json({ success: true, ignored: true });
  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
