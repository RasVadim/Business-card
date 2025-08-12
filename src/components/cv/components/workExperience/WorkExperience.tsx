import { FC } from 'react';

import { Section } from '../../components';

import s from './s.module.styl';

export const WorkExperience: FC = () => {
  return (
    <Section title="WORK EXPERIENCE">
      {/* TODO: populate with actual list items styled per PDF */}
      <div className={s.placeholder}>Experience list goes here</div>
    </Section>
  );
};
