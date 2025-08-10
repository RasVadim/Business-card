import { FC } from 'react';

import cx from 'classnames';

import { LanguageSwitcher, ThemeSwitcher } from '@/features';

import s from './s.module.styl';

type PropsType = {
  isOpen: boolean;
};

export const Menu: FC<PropsType> = ({ isOpen }) => {
  return (
    <div className={cx(s.menu, { [s.hidden]: !isOpen })}>
      <div className={s.menu__content}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <br />
    </div>
  );
};
