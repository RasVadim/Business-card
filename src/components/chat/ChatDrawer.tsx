import { FC } from 'react';

import { useSetOpenDrawerKey } from '@/store/atoms';
import { EModalKeys } from '@/types';
import { Drawer } from '@/ui-kit';

import { Chat } from './Chat';

export const ChatDrawer: FC = () => {
  const setOpenDrawerKey = useSetOpenDrawerKey();

  const handleClose = () => {
    setOpenDrawerKey(null);
  };

  return (
    <Drawer
      keyProp={EModalKeys.CHAT_DRAWER}
      onClose={handleClose}
      title="Чат с владельцем"
      closeButton={true}
    >
      <Chat />
    </Drawer>
  );
};
