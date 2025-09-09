import { useEffect, useRef } from 'react';

import { useAddMessage } from '@/store/atoms';
import { IChatMessage, EMessageType } from '@/types';
import { getUserSiteId } from '@/utils';

const POLLING_INTERVAL = 10 * 1000;

export const usePolling = () => {
  const addMessage = useAddMessage();
  const lastMessageIdRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const pollMessages = async () => {
      try {
        const userSiteId = getUserSiteId();
        const response = await fetch(
          `/api/chat/messages?since=${lastMessageIdRef.current}&userSiteId=${userSiteId}`,
        );

        if (response.ok) {
          const data = await response.json();

          if (data.success && data.messages.length > 0) {
            data.messages.forEach(
              (msg: { id: number; text: string; timestamp: number; userSiteId?: string }) => {
                const chatMessage: IChatMessage = {
                  id: msg.id.toString(),
                  text: msg.text,
                  timestamp: msg.timestamp,
                  type: EMessageType.BOT,
                  userSiteId: msg.userSiteId, // Include userSiteId for personal messages
                };
                addMessage(chatMessage);
              },
            );

            lastMessageIdRef.current = data.lastMessageId;
          }
        } else {
          console.error('Polling failed with status:', response.status);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Start polling every POLLING_INTERVAL seconds
    intervalRef.current = setInterval(pollMessages, POLLING_INTERVAL);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [addMessage]);

  return {
    lastMessageId: lastMessageIdRef.current,
  };
};
