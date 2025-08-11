import { PATHS } from '@/constants';
import { TIconName } from '@/ui-kit';

type TTab = { icon: TIconName; label: string; to: string };

export const TABS: TTab[] = [
  {
    icon: 'profile',
    label: 'profile',
    to: PATHS.PROFILE,
  },
  {
    icon: 'docs',
    label: 'cv',
    to: PATHS.CV,
  },
];
