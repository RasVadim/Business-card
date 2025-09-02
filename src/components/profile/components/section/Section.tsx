import { FC, PropsWithChildren, ReactElement } from 'react';

import cn from 'classnames';

import s from './s.module.styl';

type TProps = { title: string; dark?: boolean; icon?: ReactElement };

export const Section: FC<PropsWithChildren<TProps>> = ({ title, children, dark, icon }) => (
  <section className={cn(s.section, { [s.dark]: dark })}>
    <div className={s.header}>
      {icon && <div className={s.icon}>{icon}</div>}
      <h3 className={s.sectionTitle}>{title}</h3>
    </div>
    <div>{children}</div>
  </section>
);
