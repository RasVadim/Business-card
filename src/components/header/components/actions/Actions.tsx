import { FC } from 'react';

import { LanguageSwitcher, ThemeSwitcher } from '@/features';

import s from './s.module.styl';

export const Actions: FC = () => {
  return (
    <div className={s.wrapper}>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
};
