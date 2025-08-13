import { atomWithStorage } from 'jotai/utils';

import { ELanguage } from '@/types';

export const Language = atomWithStorage<ELanguage | null>('language', null, undefined, {
  getOnInit: true,
});
