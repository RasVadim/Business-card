import { FC } from 'react';

import { ContactsBlock, HeaderCard, Projects, Experience, Statistic } from './components';

import s from './s.module.styl';

export const Profile: FC = () => {
  return (
    <div className={s.wrapper}>
      <HeaderCard />
      <Statistic />
      <Experience />
      <Projects />
      <ContactsBlock />
    </div>
  );
};
