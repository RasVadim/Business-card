import { FC } from 'react';

import cn from 'classnames';

import { LanguageSwitcher, ThemeSwitcher } from '@/features';

import s from './s.module.styl';

type PropsType = {
  isOpen: boolean;
};

export const Menu: FC<PropsType> = ({ isOpen }) => {
  return (
    <div className={cn(s.menu, { [s.hidden]: !isOpen })}>
      <div className={s.menu__content}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <br />
    </div>
  );
};
