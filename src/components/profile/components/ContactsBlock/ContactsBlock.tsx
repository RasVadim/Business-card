import { FC } from 'react';

import { Contacts } from '@/components';
import { useTranslation } from '@/hooks';
import { ESection } from '@/types';

import s from './s.module.styl';

export const ContactsBlock: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.wrapper} id={ESection.CONTACTS}>
      <div className={s.title}>{t('layout.contacts')}</div>
      <Contacts />
    </div>
  );
};
