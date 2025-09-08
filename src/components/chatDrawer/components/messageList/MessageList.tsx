import { FC, useRef, useEffect } from 'react';

import cn from 'classnames';

import { useTranslation } from '@/hooks';
import { useChatState } from '@/store/atoms';

import s from './s.module.styl';

export const MessageList: FC = () => {
  const [chatState] = useChatState();
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  return (
    <div className={s.messagesContainer}>
      {chatState.messages.length === 0 ? (
        <div className={s.emptyState}>
          <p>{t('layout.yourMessageWillBeSent')}</p>
        </div>
      ) : (
        chatState.messages.map((message) => (
          <div key={message.id} className={cn(s.message, { [s.userMessage]: message.isFromUser })}>
            <div className={s.messageContent}>
              <p className={s.messageText}>{message.text}</p>
              <span className={s.messageTime}>
                {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))
      )}

      {chatState.isLoading && (
        <div className={cn(s.message, s.botMessage)}>
          <div className={s.messageContent}>
            <div className={s.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
