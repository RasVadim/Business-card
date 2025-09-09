import { FC } from 'react';

import cn from 'classnames';

import { IChatMessage, EMessageType } from '@/types';

import { Message, ChatAvatar } from '../index';

import s from './s.module.styl';

interface IMessageGroupProps {
  messages: IChatMessage[];
}

export const MessageGroup: FC<IMessageGroupProps> = ({ messages }) => {
  const groupType = messages[0].type;
  const isUserGroup = groupType === EMessageType.USER;

  return (
    <div className={cn(s.messageGroup, { [s.userGroup]: isUserGroup })}>
      {!isUserGroup && <ChatAvatar type={groupType} />}

      <div className={s.messagesWrapper}>
        {messages.map((message, messageIndex) => {
          const isFirst = messageIndex === 0;
          const isLast = messageIndex === messages.length - 1;

          return <Message key={message.id} message={message} isFirst={isFirst} isLast={isLast} />;
        })}
      </div>

      {isUserGroup && <ChatAvatar type={groupType} />}
    </div>
  );
};
