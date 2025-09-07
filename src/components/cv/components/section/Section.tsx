import { FC, PropsWithChildren, ReactNode } from 'react';

import cn from 'classnames';

import s from './s.module.styl';

type SectionProps = {
  title: string;
  hight?: string;
  dark?: boolean;
  icon?: ReactNode;
};

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  children,
  hight = 'auto',
  dark = false,
  icon,
}) => (
  <section
    className={cn(s.section, { [s.hight]: hight !== 'auto', [s.dark]: dark })}
    style={{ height: hight }}
  >
    <div className={s.sectionHeader}>
      {icon && <div className={s.sectionIcon}>{icon}</div>}
      <h3 className={s.sectionTitle}>{title}</h3>
    </div>
    <div className={s.sectionContent}>{children}</div>
  </section>
);
