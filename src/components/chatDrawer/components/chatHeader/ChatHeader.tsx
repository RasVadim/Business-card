import { FC } from 'react';

import cn from 'classnames';

import { useTranslation } from '@/hooks';
import { useChatState } from '@/store/atoms';

import s from './s.module.styl';

export const ChatHeader: FC = () => {
  const [chatState] = useChatState();
  const { t } = useTranslation();

  return (
    <div className={s.chatHeader}>
      <h3 className={s.chatTitle}>{t('profile.name')}</h3>
      <div className={s.chatStatus}>
        <div className={cn(s.statusDot, { [s.connected]: chatState.isConnected })} />
        <span className={s.statusText}>
          {chatState.isConnected ? t('layout.online') : t('layout.offline')}
        </span>
      </div>
    </div>
  );
};
