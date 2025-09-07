import { useCallback } from 'react';

import { sendTelegramMessage } from '@/api';
import { useAddMessage, useSetLoading, useSetConnected } from '@/store/atoms';
import { IChatMessage } from '@/types';
import { getUserMetadata } from '@/utils';

export const useTelegramBot = () => {
  const addMessage = useAddMessage();
  const setLoading = useSetLoading();
  const setConnected = useSetConnected();

  const sendMessage = useCallback(
    async (message: string) => {
      setLoading(true);

      try {
        const userMetadata = getUserMetadata();
        await sendTelegramMessage(message, userMetadata);

        // Add bot confirmation message
        const botMessage: IChatMessage = {
          id: Date.now().toString(),
          text: '✅ Сообщение отправлено! Я передам его владельцу сайта.',
          timestamp: Date.now(),
          isFromUser: false,
        };

        addMessage(botMessage);
        setConnected(true);
      } catch (error) {
        console.error('Error sending message to Telegram:', error);

        // Add error message
        const errorMessage: IChatMessage = {
          id: Date.now().toString(),
          text: '❌ Произошла ошибка при отправке сообщения. Попробуйте еще раз.',
          timestamp: Date.now(),
          isFromUser: false,
        };

        addMessage(errorMessage);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    },
    [addMessage, setLoading, setConnected],
  );

  return {
    sendMessage,
  };
};
