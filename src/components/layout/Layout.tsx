import type { FC } from 'react';

import { Header, TabBar } from '@/components';
import { AnimatedPage } from '@/components/animatedPage/AnimatedPage';

import s from './s.module.styl';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className={s.contentContainer}>
        <AnimatedPage />
      </div>
      <TabBar />
    </>
  );
};
