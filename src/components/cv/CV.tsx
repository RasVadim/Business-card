import { FC } from 'react';

import { HeaderCard } from './components/headerCard/HeaderCard';
import { MainGrid } from './components/mainGrid/MainGrid';

import s from './s.module.styl';

export const CV: FC = () => {
  return (
    <div className={s.wrapper}>
      <HeaderCard />
      <MainGrid />
    </div>
  );
};
