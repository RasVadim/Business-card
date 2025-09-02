import { FC } from 'react';

import {
  BackIcon,
  DocsIcon,
  HouseIcon,
  LinkIcon,
  MenuIcon,
  ProfileIcon,
  ResumeIcon,
  ProjectsIcon,
} from '@/icons';

type TBaseIconName =
  | 'menu'
  | 'back'
  | 'profile'
  | 'docs'
  | 'home'
  | 'resume'
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
  resume: ResumeIcon,
  projects: ProjectsIcon,
  contacts: LinkIcon,
};
