import { FC } from 'react';

import { Section } from '../section/Section';

import s from './s.module.styl';

export const Education: FC = () => {
  return (
    <Section title="EDUCATION">
      <div className={s.placeholder}>Education list goes here</div>
    </Section>
  );
};
