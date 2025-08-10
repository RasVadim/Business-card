import { PATHS } from '@/constants';
import { TIconName } from '@/ui-kit';

type TTab = { icon: TIconName; label: string; to: string };

export const TABS: TTab[] = [
  {
    icon: 'test',
    label: 'test',
    to: PATHS.TEST,
  },
  {
    icon: 'menu',
    label: 'main',
    to: PATHS.MAIN,
  },
  {
    icon: 'settings',
    label: 'settings',
    to: PATHS.SETTINGS,
  },
];
