import { FC } from 'react';

import { Contacts } from '@/components';
import { ESection } from '@/types';

import s from './s.module.styl';

export const ContactsBlock: FC = () => {
  return (
    <div className={s.wrapper} id={ESection.CONTACTS}>
      <div className={s.title}>Contacts</div>
      <Contacts />
    </div>
  );
};
