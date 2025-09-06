import { FC, PropsWithChildren } from 'react';

import cn from 'classnames';

import s from './s.module.styl';

type SectionProps = { title: string; hight?: string };

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  children,
  hight = 'auto',
}) => (
  <section className={cn(s.section, { [s.hight]: hight !== 'auto' })} style={{ height: hight }}>
    <h3 className={s.sectionTitle}>{title}</h3>
    <div>{children}</div>
  </section>
);
