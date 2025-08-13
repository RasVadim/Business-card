import { FC, PropsWithChildren } from 'react';

import s from './s.module.styl';

export const Tag: FC<PropsWithChildren> = ({ children }) => {
  return <span className={s.tag}>{children}</span>;
};
