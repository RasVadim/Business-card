import { atom } from 'jotai';

import { IChatState } from '@/types';

export const chatStateAtom = atom<IChatState>({
  messages: [],
  isLoading: false,
  isConnected: false,
  userId: undefined,
});
