import { FC } from 'react';

import { Section } from '../../components';

import s from './s.module.styl';

export const Technical: FC = () => {
  return (
    <Section title="TECHNICAL">
      <div className={s.placeholder}>Tech skills</div>
    </Section>
  );
};
