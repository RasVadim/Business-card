import { FC, useState, useEffect } from 'react';

import cn from 'classnames';

import { useTranslation } from '@/hooks';
import { EditIcon } from '@/icons';
import { useChatState, useUserName, useSetUserName } from '@/store/atoms';

import s from './s.module.styl';

export const ChatHeader: FC = () => {
  const [chatState] = useChatState();
  const { t } = useTranslation();
  const [userName] = useUserName();
  const setUserNameAtom = useSetUserName();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  // Update temp name when userName changes
  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  // Save user name to atom when changed
  const handleNameChange = (newName: string) => {
    const trimmedName = newName.trim() || t('layout.visitor');
    setUserNameAtom(trimmedName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameChange(tempName);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleNameChange(tempName);
    setIsEditing(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.chatHeader}>
        <div className={s.chatStatus}>
          <div className={cn(s.statusDot, { [s.connected]: chatState.isConnected })} />
          <span className={s.statusText}>
            {chatState.isConnected ? t('layout.online') : t('layout.offline')}
          </span>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            className={s.nameInput}
            autoFocus
          />
        ) : (
          <div className={s.userNameContainer}>
            <EditIcon size="14" />
            <h3 className={s.userName} onClick={() => setIsEditing(true)}>
              {userName}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
