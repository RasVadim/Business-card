import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { useSetOpenDrawerKey } from '@/store/atoms';
import { EModalKeys } from '@/types';
import { Drawer } from '@/ui-kit';

import { Chat } from './components';

export const ChatDrawer: FC = () => {
  const setOpenDrawerKey = useSetOpenDrawerKey();
  const { t } = useTranslation();
  const handleClose = () => {
    setOpenDrawerKey(null);
  };

  return (
    <Drawer
      keyProp={EModalKeys.CHAT_DRAWER}
      onClose={handleClose}
      title={t('profile.name')}
      closeButton={true}
    >
      <Chat />
    </Drawer>
  );
};
