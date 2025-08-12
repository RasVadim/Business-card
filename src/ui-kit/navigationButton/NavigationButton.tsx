import { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useDevice } from '@/hooks';
import { Button, type TIconName } from '@/ui-kit';

import s from './s.module.styl';

type PropsType = {
  icon: TIconName;
  label?: string;
  to: string;
  pathName?: string;
};

/**
 * A navigation button for the tabBar.
 *
 * It receives a position as a prop, which is used to determine the
 * animation of the label shifting.
 *
 * @prop {string} to - The path to redirect to.
 * @prop {TIconName} icon - The icon to display.
 * @prop {string} label - The label to display.
 *
 * @returns A navigation button as a `Link` component.
 */
export const NavigationButton: FC<PropsType> = ({ to, icon, label, pathName: propPathName }) => {
  const { isMedium } = useDevice();

  const { pathname } = useLocation();

  const pathName = propPathName || pathname;
  const isActive = to === '/' ? pathName === to : pathName.startsWith(to);

  return (
    <Link to={to} className={s.wrap}>
      <Button icon={icon} label={label} active={isActive} gost={!isActive} onlyIcon={isMedium} />
    </Link>
  );
};
