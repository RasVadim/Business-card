import { memo } from 'react';

import { Routes as OriginalRoutes, Route } from 'react-router-dom';

import { Layout } from './components';
import { PAGE_NAMES } from './constants';
import { Profile, CV } from './pages';

export const Routes = memo(() => {
  return (
    <OriginalRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Profile />} />
        <Route path={PAGE_NAMES.CV} element={<CV />} />
        <Route path="*" element={<div>Need beautiful page</div>} />
      </Route>
    </OriginalRoutes>
  );
});
