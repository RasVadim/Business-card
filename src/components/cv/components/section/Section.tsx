import { FC, PropsWithChildren } from 'react';

import s from './s.module.styl';

type SectionProps = { title: string };

export const Section: FC<PropsWithChildren<SectionProps>> = ({ title, children }) => (
  <section className={s.section}>
    <h3 className={s.sectionTitle}>{title}</h3>
    <div>{children}</div>
  </section>
);
