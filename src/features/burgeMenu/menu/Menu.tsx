import { FC } from 'react';

import cn from 'classnames';

import { Contacts } from '@/components';
import { ProfileNavigation } from '@/components';
import { useDevice } from '@/hooks';

import s from './s.module.styl';

type PropsType = {
  isOpen: boolean;
};

export const Menu: FC<PropsType> = ({ isOpen }) => {
  const { isMobile } = useDevice();

  return (
    <div className={cn(s.menu, { [s.hidden]: !isOpen })}>
      <div className={s.menuContent}>
        <Contacts tooltipPosition="bottom" />
        {isMobile && (
          <div className={s.navigation}>
            <ProfileNavigation isMobile />
          </div>
        )}
      </div>
    </div>
  );
};
