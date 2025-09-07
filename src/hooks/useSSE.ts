import { useEffect, useRef } from 'react';

import { useAddMessage, useSetConnected } from '@/store/atoms';
import { IChatMessage } from '@/types';

export const useSSE = () => {
  const addMessage = useAddMessage();
  const setConnected = useSetConnected();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const connect = () => {
      // Don't create multiple connections
      if (eventSourceRef.current?.readyState === EventSource.OPEN) {
        return;
      }

      // Close existing connection if any
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      try {
        console.log('Connecting to SSE...');
        // Use local SSE server for development
        const sseUrl = import.meta.env.DEV ? 'http://localhost:3001/api/chat/sse' : '/api/chat/sse';
        eventSourceRef.current = new EventSource(sseUrl);

        eventSourceRef.current.onopen = () => {
          console.log('SSE connection opened');
          setConnected(true);
          reconnectAttemptsRef.current = 0; // Reset attempts on successful connection

          // Clear any pending reconnection
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
          }
        };

        eventSourceRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'message' && data.data.message) {
              const chatMessage: IChatMessage = {
                id: data.data.id || Date.now().toString(),
                text: data.data.message,
                timestamp: data.data.timestamp || Date.now(),
                isFromUser: false,
              };
              addMessage(chatMessage);
            } else if (data.type === 'status') {
              setConnected(data.data.status === 'connected');
            } else if (data.type === 'ping') {
              // Keep connection alive - no need to log every ping
            }
          } catch (error) {
            console.error('Error parsing SSE message:', error);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          console.error('SSE error:', error);
          setConnected(false);

          // Only attempt to reconnect if we haven't exceeded max attempts
          if (reconnectAttemptsRef.current < maxReconnectAttempts && !reconnectTimeoutRef.current) {
            reconnectAttemptsRef.current++;
            console.log(
              `Attempting to reconnect SSE... (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`,
            );

            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectTimeoutRef.current = null;
              connect();
            }, 3000);
          } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
            console.log('Max reconnection attempts reached. SSE connection failed.');
          }
        };
      } catch (error) {
        console.error('Error connecting to SSE:', error);
        setConnected(false);
      }
    };

    const disconnect = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      setConnected(false);
    };

    // Connect on mount
    connect();

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, []); // Empty dependency array to prevent re-creation

  return {
    isConnected: eventSourceRef.current?.readyState === EventSource.OPEN,
  };
};
