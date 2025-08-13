import React from 'react';

import { useTranslation } from '@/hooks';

import s from './s.module.styl';

export const PageLoadingHolder: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <div className={s.center}>
        <div className={s.text}>{t('layout.loading')}</div>
        <div className={s.loader}></div>
      </div>
    </div>
  );
};
