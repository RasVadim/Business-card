import i18next from 'i18next';
import { atomWithStorage } from 'jotai/utils';

const DEFAULT_USER_NAME = i18next.t('layout.visitor') || 'Visitor';

export const UserName = atomWithStorage<string>('chatUserName', DEFAULT_USER_NAME);
