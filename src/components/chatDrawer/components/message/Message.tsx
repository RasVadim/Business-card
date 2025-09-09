import { FC } from 'react';

import cn from 'classnames';

import { IChatMessage, EMessageType } from '@/types';

import s from './s.module.styl';

interface IMessageProps {
  message: IChatMessage;
  isFirst: boolean;
  isLast: boolean;
}

export const Message: FC<IMessageProps> = ({ message, isFirst, isLast }) => {
  return (
    <div
      className={cn(s.message, {
        [s.userMessage]: message.type === EMessageType.USER,
        [s.botMessage]: message.type === EMessageType.BOT || message.type === EMessageType.OWNER,
        [s.ownerMessage]: message.type === EMessageType.OWNER,
        [s.firstInGroup]: isFirst,
        [s.lastInGroup]: isLast,
      })}
    >
      <div className={s.messageContent}>
        <p className={s.messageText}>{message.text}</p>
        <div className={s.messageMeta}>
          <span className={s.messageTime}>
            {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {(message.type === EMessageType.USER || message.type === EMessageType.OWNER) && (
            <div className={s.messageStatus}>{message.isRead ? '✓✓' : '✓'}</div>
          )}
        </div>
      </div>
    </div>
  );
};
