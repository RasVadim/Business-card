// Telegram Bot API integration utilities

export interface ITelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export interface ITelegramUser {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface ITelegramBotResponse {
  ok: boolean;
  result?: unknown;
  error_code?: number;
  description?: string;
}

/**
 * Send message to Telegram bot via secure backend API
 */
export const sendTelegramMessage = async (
  message: string,
  userMetadata?: {
    userAgent?: string;
    referrer?: string;
    timestamp?: number;
    pageUrl?: string;
  },
): Promise<ITelegramBotResponse> => {
  try {
    // Send to our secure backend API instead of directly to Telegram
    const response = await fetch('/api/telegram/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userMetadata,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    const data = await response.json();
    return { ok: true, result: data };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};
