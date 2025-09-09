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
      console.error('❌ Invalid message format:', message);
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
        }
      }

      // This is a message from user
      const chatMessage = {
        id: message.message_id.toString(),
        text: message.text,
        timestamp: message.date * 1000, // Convert Unix timestamp to milliseconds
        type: 'owner', // Messages from Telegram are from owner
        userSiteId: userSiteId, // Add userSiteId for personal messages
      };

      // Store message in Vercel KV with retry logic
      const success = await storeMessageInKV(chatMessage);

      if (!success) {
        console.error('❌ Failed to store message in KV');
        return res.status(500).json({ error: 'Failed to store message' });
      }

      console.log(`✅ Message stored in KV for user: ${userSiteId || 'global'}`);

      return res.status(200).json({ success: true });
    }

    // If it's from bot itself, ignore it
    return res.status(200).json({ success: true, ignored: true });
  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Store message in Vercel KV with retry logic
async function storeMessageInKV(message, maxRetries = 3) {
  // eslint-disable-next-line no-undef
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // eslint-disable-line no-undef
    : 'http://localhost:3000';

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Storing message in KV (attempt ${attempt}/${maxRetries})`);

      const response = await fetch(`${baseUrl}/api/chat/messages-kv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TelegramWebhook/1.0',
        },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok) {
        console.log('✅ Message stored successfully in KV');
        return true;
      }

      const errorText = await response.text();
      console.error(`❌ Attempt ${attempt} failed:`, response.status, errorText);

      // If it's a client error (4xx), don't retry
      if (response.status >= 400 && response.status < 500) {
        console.error('❌ Client error, not retrying');
        return false;
      }

      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`❌ Attempt ${attempt} error:`, error.message);

      // If it's a network error, retry
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error('❌ All retry attempts failed');
  return false;
}
