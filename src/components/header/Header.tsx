import { FC } from 'react';

import cx from 'classnames';
import { useLocation } from 'react-router-dom';

import { BurgerMenu } from '@/features';
import { useTranslation } from '@/hooks';
import { useSyncPending } from '@/store/atoms';
import { SyncingLine } from '@/ui-kit';
import { getDepth } from '@/utils';

import { LifeActions } from './components/lifeActions';

import s from './s.module.styl';

type TProps = {
  preview?: boolean;
};

export const Header: FC<TProps> = ({ preview = false }) => {
  const { t } = useTranslation();
  const [pending] = useSyncPending();
  const { pathname } = useLocation();

  const pathSegments = pathname.split('/').filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1] || '';

  const currentDepth = getDepth(location.pathname);

  const title = t(`layout.${pageName}`);

  return (
    <div className={cx(s.container, { [s.preview]: preview })}>
      <div className={s.header}>
        {pending && <SyncingLine />}
        <div className={s.leftSide}>
          <BurgerMenu backButton={currentDepth > 1} />
        </div>
        <span className={s.title}>{title}</span>
        <div className={s.rightSide}>{<LifeActions />}</div>
      </div>
    </div>
  );
};
