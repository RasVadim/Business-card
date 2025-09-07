import type { FC } from 'react';

import { useLocation } from 'react-router-dom';

import { Header, TabBar, ExportButton } from '@/components';
import { AnimatedPage } from '@/components/animatedPage/AnimatedPage';

import s from './s.module.styl';

export const Layout: FC = () => {
  const location = useLocation();
  const isCVPage = location.pathname === '/cv';

  return (
    <>
      <Header />
      <div className={s.contentContainer}>
        <AnimatedPage />
      </div>
      {isCVPage && <ExportButton targetElementId="cv-content" filename="Vadim_Rasstrigin_CV.pdf" />}
      <TabBar />
    </>
  );
};
