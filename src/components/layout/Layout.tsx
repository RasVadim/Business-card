import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Header, TabBar } from '@/components';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <TabBar />
    </>
  );
};
