import { useAtom, useSetAtom } from 'jotai';

import { IChatMessage } from '@/types';

import { ChatStateAtom } from './atom';

export const useChatState = () => useAtom(ChatStateAtom);
export const useSetChatState = () => useSetAtom(ChatStateAtom);

// Helper hooks for specific actions
export const useAddMessage = () => {
  const setChatState = useSetChatState();

  return (message: IChatMessage) => {
    setChatState((prev) => {
      // Check if message already exists to prevent duplicates
      const messageExists = prev.messages.some(
        (existingMessage) => existingMessage.id === message.id,
      );

      if (messageExists) {
        console.log('Message already exists, skipping:', message.id);
        return prev;
      }

      return {
        ...prev,
        messages: [...prev.messages, message],
      };
    });
  };
};

export const useSetLoading = () => {
  const setChatState = useSetChatState();

  return (isLoading: boolean) => {
    setChatState((prev) => ({
      ...prev,
      isLoading,
    }));
  };
};

export const useSetConnected = () => {
  const setChatState = useSetChatState();

  return (isConnected: boolean) => {
    setChatState((prev) => ({
      ...prev,
      isConnected,
    }));
  };
};
