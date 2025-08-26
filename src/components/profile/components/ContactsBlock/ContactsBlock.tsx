import { FC } from 'react';

import { Contacts } from '@/components';

import s from './s.module.styl';

export const ContactsBlock: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Contacts</div>
      <Contacts />
    </div>
  );
};
