import { FC } from 'react';

import { ContactsBlock, HeaderCard, Projects, Resume, Statistic } from './components';

import s from './s.module.styl';

export const Profile: FC = () => {
  return (
    <div className={s.wrapper}>
      <HeaderCard />
      <Statistic />
      <Resume />
      <Projects />
      <ContactsBlock />
    </div>
  );
};
