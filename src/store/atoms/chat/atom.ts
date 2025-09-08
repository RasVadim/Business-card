import { atomWithStorage } from 'jotai/utils';

import { IChatState } from '@/types';

export const ChatStateAtom = atomWithStorage<IChatState>(
  'chatState',
  {
    messages: [],
    isLoading: false,
    isConnected: false,
    userId: undefined,
  },
  undefined,
  {
    getOnInit: true,
  },
);
