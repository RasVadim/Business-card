import { FC } from 'react';

import { BackIcon, DocsIcon, HouseIcon, MenuIcon, ProfileIcon } from '@/icons';

type TBaseIconName = 'menu' | 'back' | 'profile' | 'docs' | 'home';
export type TIconName = TBaseIconName;

export type TIconProps = {
  isActive?: boolean;
};

export const BUTTON_ICONS: Record<TIconName, FC<TIconProps>> = {
  menu: MenuIcon,
  back: BackIcon,
  profile: ProfileIcon,
  home: HouseIcon,
  docs: DocsIcon,
};
