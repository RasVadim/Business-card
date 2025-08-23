import { FC } from 'react';

import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import { BurgerMenu } from '@/features';
import { useDevice, useTranslation } from '@/hooks';
import { useSyncPending } from '@/store/atoms';
import { SyncingLine } from '@/ui-kit';
import { getDepth } from '@/utils';

import { Actions, ProfileNavigation } from './components';

import s from './s.module.styl';

type TProps = {
  preview?: boolean;
};

export const Header: FC<TProps> = ({ preview = false }) => {
  const { t } = useTranslation();
  const [pending] = useSyncPending();
  const { pathname } = useLocation();
  const { isMedium } = useDevice();

  const pathSegments = pathname.split('/').filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1] || '';

  const currentDepth = getDepth(location.pathname);

  const title = t(`layout.${pageName || 'profile'}`);

  return (
    <div className={cn(s.container, { [s.preview]: preview })}>
      <div className={s.header}>
        {!isMedium && <Actions />}
        {pending && <SyncingLine />}
        <div className={s.leftSide}>
          <BurgerMenu backButton={currentDepth > 1} />
        </div>
        <span className={s.title}>{title}</span>
        <div className={s.rightSide}>{isMedium ? <Actions /> : <ProfileNavigation />}</div>
      </div>
    </div>
  );
};
