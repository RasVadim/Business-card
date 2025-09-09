import { useAtom, useSetAtom } from 'jotai';

import { UserName } from './atom';

export const useUserName = () => useAtom(UserName);

export const useSetUserName = () => useSetAtom(UserName);
