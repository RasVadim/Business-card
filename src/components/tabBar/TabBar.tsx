import { FC } from 'react';

import cx from 'classnames';

import { TABS } from '@/constants';
import { useTranslation } from '@/hooks';
import { NavigationButton } from '@/ui-kit';

import s from './s.module.styl';

/**
 * A bottom tab bar with navigation buttons.
 * This component renders a bottom tab bar with navigation buttons.
 *
 * @returns A bottom tab bar with navigation buttons.
 */
export const TabBar: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={cx(s.container)}>
      <div className={s.tabBar}>
        {TABS.map(({ icon, label, to }) => {
          return <NavigationButton key={to} icon={icon} label={t(`layout.${label}`)} to={to} />;
        })}
      </div>
    </div>
  );
};
