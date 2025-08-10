import { memo } from 'react';

import { Routes as OriginalRoutes, Route } from 'react-router-dom';

import { Layout } from './components';
import { PAGE_NAMES } from './constants';
import { Settings, Info } from './pages';

export const Routes = memo(() => {
  return (
    <OriginalRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Info />} />
        <Route path={PAGE_NAMES.SETTINGS} element={<Settings />} />
        <Route path="*" element={<div>Need beautiful page</div>} />
      </Route>
    </OriginalRoutes>
  );
});
