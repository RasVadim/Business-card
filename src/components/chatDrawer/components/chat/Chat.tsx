import { FC } from 'react';

import { usePolling } from '@/hooks';

import { ChatHeader, MessageList, ChatInput } from '../index';

import s from './s.module.styl';

export const Chat: FC = () => {
  usePolling(); // Polling automatically handles receiving messages

  return (
    <div className={s.chatContainer}>
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </div>
  );
};
