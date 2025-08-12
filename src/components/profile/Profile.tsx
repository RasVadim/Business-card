import { FC } from 'react';

import { HeaderCard, MainGrid, Statistic } from './components';

import s from './s.module.styl';

export const Profile: FC = () => {
  return (
    <div className={s.wrapper}>
      <HeaderCard />
      <Statistic />
      <MainGrid />
    </div>
  );
};
