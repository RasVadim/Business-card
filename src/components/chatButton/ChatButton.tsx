import { FC } from 'react';

import { ChatBotIcon } from '@/icons';
import { useSetOpenDrawerKey } from '@/store/atoms';
import { EModalKeys } from '@/types';

import s from './s.module.styl';

export const ChatButton: FC = () => {
  const setOpenDrawerKey = useSetOpenDrawerKey();

  const handleOpenChat = () => {
    setOpenDrawerKey(EModalKeys.CHAT_DRAWER);
  };

  return (
    <button className={s.chatButton} onClick={handleOpenChat} aria-label="Open chat">
      <div className={s.chatButtonIcon}>
        <ChatBotIcon size="24" />
      </div>
      <div className={s.chatButtonPulse} />
    </button>
  );
};
