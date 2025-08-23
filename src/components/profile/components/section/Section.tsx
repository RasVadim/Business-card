import { FC, PropsWithChildren } from 'react';

import cn from 'classnames';

import s from './s.module.styl';

type SectionProps = { title: string; dark?: boolean };

export const Section: FC<PropsWithChildren<SectionProps>> = ({ title, children, dark }) => (
  <section className={cn(s.section, { [s.dark]: dark })}>
    <h3 className={s.sectionTitle}>{title}</h3>
    <div>{children}</div>
  </section>
);
