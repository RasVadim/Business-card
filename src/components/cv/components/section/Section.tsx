import { FC, PropsWithChildren } from 'react';

import cn from 'classnames';

import s from './s.module.styl';

type SectionProps = { title: string; hight?: string; dark?: boolean };

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  children,
  hight = 'auto',
  dark = false,
}) => (
  <section
    className={cn(s.section, { [s.hight]: hight !== 'auto', [s.dark]: dark })}
    style={{ height: hight }}
  >
    <h3 className={s.sectionTitle}>{title}</h3>
    <div className={s.sectionContent}>{children}</div>
  </section>
);
