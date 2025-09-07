import { useAtom, useSetAtom } from 'jotai';

import { IChatMessage } from '@/types';

import { chatStateAtom } from './atom';

export const useChatState = () => useAtom(chatStateAtom);
export const useSetChatState = () => useSetAtom(chatStateAtom);

// Helper hooks for specific actions
export const useAddMessage = () => {
  const setChatState = useSetChatState();

  return (message: IChatMessage) => {
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
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
