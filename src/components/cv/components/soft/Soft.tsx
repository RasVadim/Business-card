import { FC } from 'react';

import { Section } from '../../components';

import s from './s.module.styl';

export const Soft: FC = () => {
  return (
    <Section title="SOFT">
      <div className={s.placeholder}>Soft skills</div>
    </Section>
  );
};
