import { FC, useRef, useEffect } from 'react';

import cn from 'classnames';

import { useTranslation } from '@/hooks';
import { useChatState } from '@/store/atoms';
import { EMessageType } from '@/types';

import { MessageGroup, ChatAvatar } from '../index';

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

  // Group consecutive messages from the same sender
  const groupedMessages = chatState.messages.reduce(
    (groups, message, index) => {
      const prevMessage = index > 0 ? chatState.messages[index - 1] : null;

      if (prevMessage && prevMessage.type === message.type) {
        // Add to existing group
        groups[groups.length - 1].push(message);
      } else {
        // Create new group
        groups.push([message]);
      }

      return groups;
    },
    [] as (typeof chatState.messages)[],
  );

  return (
    <div className={s.messagesContainer}>
      {chatState.messages.length === 0 ? (
        <div className={s.emptyState}>
          <p>{t('layout.yourMessageWillBeSent')}</p>
        </div>
      ) : (
        groupedMessages.map((messageGroup, groupIndex) => (
          <MessageGroup key={`group-${groupIndex}`} messages={messageGroup} />
        ))
      )}

      {chatState.isLoading && (
        <div className={cn(s.messageGroup, s.botGroup)}>
          <ChatAvatar type={EMessageType.BOT} />
          <div className={s.messagesWrapper}>
            <div className={cn(s.message, s.botMessage)}>
              <div className={s.messageContent}>
                <div className={s.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
