/**
 * Format message with user metadata for Telegram
 * @param message - The message to format
 * @param userMetadata - The user metadata
 * @returns The formatted message
 */
export const formatMessageForTelegram = (
  message: string,
  userMetadata?: {
    userAgent?: string;
    referrer?: string;
    timestamp?: number;
    pageUrl?: string;
  },
): string => {
  let formattedMessage = `💬 <b>Новое сообщение с сайта</b>\n\n`;
  formattedMessage += `📝 <b>Сообщение:</b>\n${message}\n\n`;

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
};

/**
 * Extract device information from user agent
 * @param userAgent - The user agent
 * @returns The device information
 */
const getDeviceInfo = (userAgent: string): string => {
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const isTablet = /iPad|Tablet/.test(userAgent);

  if (isTablet) return 'Планшет';
  if (isMobile) return 'Мобильное устройство';
  return 'Десктоп';
};
