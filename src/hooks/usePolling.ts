import { useEffect, useRef } from 'react';

import { useAddMessage } from '@/store/atoms';
import { IChatMessage, EMessageType } from '@/types';
import { getUserSiteId } from '@/utils';

const POLLING_INTERVAL = 10 * 1000;

export const usePolling = () => {
  const addMessage = useAddMessage();
  const lastMessageIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const pollMessages = async () => {
      try {
        const userSiteId = getUserSiteId();

        const response = await fetch(`/api/chat/messages-kv?userSiteId=${userSiteId}`);

        if (response.ok) {
          const data = await response.json();

          if (data.success && data.messages && data.messages.length > 0) {
            console.log(`📨 Received ${data.messages.length} new messages from KV`);

            data.messages.forEach(
              (msg: {
                id: string;
                text: string;
                timestamp: number;
                type: string;
                userSiteId?: string;
              }) => {
                const chatMessage: IChatMessage = {
                  id: msg.id,
                  text: msg.text,
                  timestamp: msg.timestamp,
                  type: msg.type as EMessageType,
                  userSiteId: msg.userSiteId,
                };
                addMessage(chatMessage);
              },
            );

            // Note: KV API automatically deletes messages after delivery
            // so we don't need to track lastMessageId
          } else {
            console.log('📭 No new messages');
          }
        } else {
          console.error('❌ Polling failed with status:', response.status);
        }
      } catch (error) {
        console.error('❌ Polling error:', error);
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
