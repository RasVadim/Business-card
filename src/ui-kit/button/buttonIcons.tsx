import { FC } from 'react';

import { BackIcon, HouseIcon, MenuIcon, ProfileIcon } from '@/icons';

type TBaseIconName = 'menu' | 'back' | 'settings' | 'test';
export type TIconName = TBaseIconName;

export type TIconProps = {
  isActive?: boolean;
};

export const BUTTON_ICONS: Record<TIconName, FC<TIconProps>> = {
  menu: MenuIcon,
  back: BackIcon,
  settings: ProfileIcon,
  test: HouseIcon,
};
