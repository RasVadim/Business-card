// Vercel Serverless Function for sending Telegram messages
// This runs on Vercel's serverless infrastructure

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, userMetadata } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get bot token from server environment (secure!)

    // eslint-disable-next-line no-undef
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    // eslint-disable-next-line no-undef
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: 'Telegram bot not configured' });
    }

    // Format message with metadata
    const formattedMessage = formatMessageForTelegram(message, userMetadata);

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || 'Failed to send message');
    }

    res.status(200).json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}

function formatMessageForTelegram(message, userMetadata) {
  let formattedMessage = `💬 <b>Новое сообщение с сайта</b>\n\n`;
  formattedMessage += `📝 <b>Сообщение:</b>\n${message}\n\n`;

  // Add userSiteId for reply functionality
  if (userMetadata.userSiteId) {
    formattedMessage += `🆔 <b>userSiteId:</b> ${userMetadata.userSiteId}\n\n`;
  }

  if (userMetadata) {
    formattedMessage += `📊 <b>Метаданные:</b>\n`;

    if (userMetadata.timestamp) {
      formattedMessage += `🕐 <b>Время:</b> ${new Date(userMetadata.timestamp).toLocaleString('ru-RU')}\n`;
    }

    if (userMetadata.pageUrl) {
      formattedMessage += `🌐 <b>Страница:</b> ${userMetadata.pageUrl}\n`;
    }

    if (userMetadata.referrer) {
      formattedMessage += `🔗 <b>Источник:</b> ${userMetadata.referrer}\n`;
    }

    if (userMetadata.userAgent) {
      formattedMessage += `💻 <b>Устройство:</b> ${getDeviceInfo(userMetadata.userAgent)}\n`;
    }
  }

  return formattedMessage;
}

function getDeviceInfo(userAgent) {
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const isTablet = /iPad|Tablet/.test(userAgent);

  if (isTablet) return 'Планшет';
  if (isMobile) return 'Мобильное устройство';
  return 'Десктоп';
}
