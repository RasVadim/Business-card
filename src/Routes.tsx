import { memo } from 'react';

import { Routes as OriginalRoutes, Route } from 'react-router-dom';

import { Layout } from './components';

export const Routes = memo(() => {
  return (
    <OriginalRoutes>
      <Route path="/*" element={<Layout />} />
    </OriginalRoutes>
  );
});
