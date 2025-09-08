import { FC, useState, useRef, useEffect } from 'react';

import cn from 'classnames';

import { useTelegramBot, usePolling, useTranslation } from '@/hooks';
import { useChatState, useAddMessage } from '@/store/atoms';
import { IChatMessage } from '@/types';
import { Button } from '@/ui-kit';

import s from './s.module.styl';

export const Chat: FC = () => {
  const [chatState] = useChatState();
  const addMessage = useAddMessage();
  const { sendMessage } = useTelegramBot();
  usePolling(); // Polling automatically handles receiving messages
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: IChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      timestamp: Date.now(),
      isFromUser: true,
    };

    addMessage(userMessage);
    const messageText = inputValue.trim();
    setInputValue('');

    // Send message to Telegram bot
    await sendMessage(messageText);

    // Polling automatically handles receiving responses
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={s.chatContainer}>
      <div className={s.chatHeader}>
        <h3 className={s.chatTitle}>{t('profile.name')}</h3>
        <div className={s.chatStatus}>
          <div className={cn(s.statusDot, { [s.connected]: chatState.isConnected })} />
          <span className={s.statusText}>
            {chatState.isConnected ? t('layout.online') : t('layout.offline')}
          </span>
        </div>
      </div>

      <div className={s.messagesContainer}>
        {chatState.messages.length === 0 ? (
          <div className={s.emptyState}>
            <p>{t('layout.yourMessageWillBeSent')}</p>
          </div>
        ) : (
          chatState.messages.map((message) => (
            <div
              key={message.id}
              className={cn(s.message, { [s.userMessage]: message.isFromUser })}
            >
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

      <div className={s.inputContainer}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('layout.enterYourMessage')}
          className={s.messageInput}
          rows={1}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || chatState.isLoading}
          className={s.sendButton}
          active
          label={t('layout.send')}
          size="large"
        />
      </div>
    </div>
  );
};
