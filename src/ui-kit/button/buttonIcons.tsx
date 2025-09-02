import { FC } from 'react';

import {
  BackIcon,
  DocsIcon,
  HouseIcon,
  LinkIcon,
  MenuIcon,
  ProfileIcon,
  ExperienceIcon,
  ProjectsIcon,
} from '@/icons';

type TBaseIconName =
  | 'menu'
  | 'back'
  | 'profile'
  | 'docs'
  | 'home'
  | 'experience'
  | 'projects'
  | 'contacts';
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
  experience: ExperienceIcon,
  projects: ProjectsIcon,
  contacts: LinkIcon,
};
