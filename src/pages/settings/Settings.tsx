import { lazy, FC } from 'react';

import { PAGE_NAMES } from '@/constants/paths';
import { Page } from '@/ui-kit';

const LazyContent = lazy(() => import('./components/content/Content'));

export const Settings: FC = () => {
  return (
    <Page name={PAGE_NAMES.SETTINGS}>
      <LazyContent />
    </Page>
  );
};
