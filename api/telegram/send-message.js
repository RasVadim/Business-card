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
  let formattedMessage = `\n 💬 ${message}\n\n`;

  if (userMetadata) {
    // User info
    if (userMetadata.userName) {
      formattedMessage += `👤 ${userMetadata.userName}`;
    }
    if (userMetadata.userSiteId) {
      formattedMessage += `\n🆔 ${userMetadata.userSiteId}`;
    }

    // Time and location
    const timeInfo = [];
    if (userMetadata.timestamp) {
      timeInfo.push(new Date(userMetadata.timestamp).toLocaleString('ru-RU'));
    }
    if (userMetadata.time?.timezone) {
      timeInfo.push(userMetadata.time.timezone);
    }
    if (userMetadata.time?.timezoneOffset) {
      const offsetHours = Math.abs(userMetadata.time.timezoneOffset) / 60;
      const offsetSign = userMetadata.time.timezoneOffset <= 0 ? '+' : '-';
      timeInfo.push(`UTC${offsetSign}${offsetHours}`);
    }
    if (userMetadata.time?.localTime) {
      const timeOnly = new Date(userMetadata.time.localTime).toLocaleTimeString('ru-RU');
      timeInfo.push(`(${timeOnly})`);
    }
    if (timeInfo.length > 0) {
      formattedMessage += `\n🕐 ${timeInfo.join(', ')}`;
    }

    // Device info
    const deviceInfo = [];
    if (userMetadata.device?.type) {
      deviceInfo.push(userMetadata.device.type);
    }
    if (userMetadata.os?.name) {
      deviceInfo.push(userMetadata.os.name);
    }
    if (userMetadata.browser?.name) {
      deviceInfo.push(userMetadata.browser.name);
    }
    if (userMetadata.device?.screen) {
      const { width, height } = userMetadata.device.screen;
      deviceInfo.push(`${width}x${height}`);
    }
    if (userMetadata.device?.hardware?.cores) {
      deviceInfo.push(`${userMetadata.device.hardware.cores} cores`);
    }
    if (userMetadata.device?.hardware?.memory) {
      deviceInfo.push(`${userMetadata.device.hardware.memory} GB`);
    }
    if (deviceInfo.length > 0) {
      formattedMessage += `\n💻 ${deviceInfo.join(', ')}`;
    }

    // URL info
    const urlInfo = [];
    if (userMetadata.url?.href) {
      urlInfo.push(userMetadata.url.href);
    }
    if (userMetadata.url?.referrer && userMetadata.url.referrer !== 'Direct transition') {
      urlInfo.push(`from: ${userMetadata.url.referrer}`);
    }
    if (urlInfo.length > 0) {
      formattedMessage += `\n🌐 ${urlInfo.join(', ')}`;
    }

    // Language
    if (userMetadata.locale?.languages) {
      formattedMessage += `\n🗣️ ${userMetadata.locale.languages.join(', ')}`;
    }

    // Visit info
    const visitInfo = [];
    if (userMetadata.behavior?.visitCount) {
      visitInfo.push(`visit #${userMetadata.behavior.visitCount}`);
    }
    if (userMetadata.behavior?.lastVisit) {
      const lastVisitDate = new Date(parseInt(userMetadata.behavior.lastVisit)).toLocaleDateString(
        'ru-RU',
      );
      visitInfo.push(`last: ${lastVisitDate}`);
    }
    if (userMetadata.behavior?.sessionStart) {
      const sessionStartDate = new Date(
        parseInt(userMetadata.behavior.sessionStart),
      ).toLocaleTimeString('ru-RU');
      visitInfo.push(`session: ${sessionStartDate}`);
    }
    if (visitInfo.length > 0) {
      formattedMessage += `\n📈 ${visitInfo.join(', ')}`;
    }
  }

  return formattedMessage;
}
