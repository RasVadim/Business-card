import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { sendTelegramMessage } from '@/api';
import { useAddMessage, useSetLoading, useSetConnected, useUserName } from '@/store/atoms';
import { IChatMessage, EMessageType } from '@/types';
import { getUserMetadata, getUserSiteId } from '@/utils';

export const useTelegramBot = () => {
  const { t } = useTranslation();

  const addMessage = useAddMessage();
  const setLoading = useSetLoading();
  const setConnected = useSetConnected();
  const [userName] = useUserName();

  const sendMessage = useCallback(
    async (message: string) => {
      setLoading(true);

      try {
        const userMetadata = getUserMetadata();
        const userSiteId = getUserSiteId();

        // Add userSiteId and userName to metadata
        const enhancedMetadata = {
          ...userMetadata,
          userSiteId,
          userName,
        };

        console.log('useTelegramBot sending message with metadata:', enhancedMetadata);

        await sendTelegramMessage(message, enhancedMetadata);

        // Add bot confirmation message
        const botMessage: IChatMessage = {
          id: Date.now().toString(),
          text: t('layout.messageSentSuccessfully'),
          timestamp: Date.now(),
          type: EMessageType.BOT,
        };

        addMessage(botMessage);
        setConnected(true);
      } catch (error) {
        console.error('Error sending message to Telegram:', error);

        // Add error message
        const errorMessage: IChatMessage = {
          id: Date.now().toString(),
          text: t('layout.messageSentFailed'),
          timestamp: Date.now(),
          type: EMessageType.BOT,
        };

        addMessage(errorMessage);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    },
    [addMessage, setLoading, setConnected, userName],
  );

  return {
    sendMessage,
  };
};
