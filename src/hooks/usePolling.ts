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
        console.log('🔄 Polling messages, since:', lastMessageIdRef.current, 'userSiteId:', userSiteId);
        
        const response = await fetch(
          `/api/chat/messages?since=${lastMessageIdRef.current}&userSiteId=${userSiteId}`,
        );

        if (response.ok) {
          const data = await response.json();
          console.log('📥 Polling response:', data);

          if (data.success && data.messages.length > 0) {
            console.log('📨 Found', data.messages.length, 'new messages');
            
            data.messages.forEach(
              (msg: {
                id: number;
                text: string;
                timestamp: number;
                type: string;
                userSiteId?: string;
              }) => {
                console.log('💬 Processing message:', msg);
                const chatMessage: IChatMessage = {
                  id: msg.id.toString(),
                  text: msg.text,
                  timestamp: msg.timestamp,
                  type: msg.type as EMessageType,
                  userSiteId: msg.userSiteId, // Include userSiteId for personal messages
                };
                console.log('➕ Adding message to chat:', chatMessage);
                addMessage(chatMessage);
              },
            );

            lastMessageIdRef.current = data.lastMessageId;
            console.log('📊 Updated lastMessageId to:', lastMessageIdRef.current);
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
