import { useEffect, useRef } from 'react';

import { useAddMessage } from '@/store/atoms';
import { IChatMessage } from '@/types';

export const usePolling = () => {
  const addMessage = useAddMessage();
  const lastMessageIdRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?since=${lastMessageIdRef.current}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success && data.messages.length > 0) {
            console.log('Received messages via polling:', data.messages);
            
            data.messages.forEach((msg: any) => {
              const chatMessage: IChatMessage = {
                id: msg.id.toString(),
                text: msg.text,
                timestamp: msg.timestamp,
                isFromUser: false,
              };
              addMessage(chatMessage);
            });
            
            lastMessageIdRef.current = data.lastMessageId;
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Start polling every 2 seconds
    intervalRef.current = setInterval(pollMessages, 2000);

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
