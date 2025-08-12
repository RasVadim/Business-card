import { FC } from 'react';

import { Section } from '../../components';

import s from './s.module.styl';

export const Languages: FC = () => {
  return (
    <Section title="LANGUAGES" dark>
      <div className={s.placeholder}>Languages</div>
    </Section>
  );
};
