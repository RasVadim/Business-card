import { FC, useState } from 'react';

import { useTranslation, useTelegramBot } from '@/hooks';
import { useChatState, useAddMessage } from '@/store/atoms';
import { IChatMessage } from '@/types';
import { Button } from '@/ui-kit';

import s from './s.module.styl';

export const ChatInput: FC = () => {
  const [chatState] = useChatState();
  const addMessage = useAddMessage();
  const { sendMessage } = useTelegramBot();
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
  );
};
