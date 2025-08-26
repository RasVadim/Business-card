import { FC } from 'react';

import cn from 'classnames';

import { Contacts } from '@/components';
// import { LanguageSwitcher, ThemeSwitcher } from '@/features';

import s from './s.module.styl';

type PropsType = {
  isOpen: boolean;
};

export const Menu: FC<PropsType> = ({ isOpen }) => {
  return (
    <div className={cn(s.menu, { [s.hidden]: !isOpen })}>
      <div className={s.menuContent}>
        <Contacts tooltipPosition="bottom" />
        {/* <div className={s.menuContentSwitchers}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div> */}
      </div>
      <br />
    </div>
  );
};
