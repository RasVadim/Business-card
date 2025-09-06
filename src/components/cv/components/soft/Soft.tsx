import { FC } from 'react';

import { SOFT_SKILLS } from '@/constants';
import { useTranslation } from '@/hooks';

import { Section } from '../../components';

import s from './s.module.styl';

export const Soft: FC = () => {
  const { t } = useTranslation();

  return (
    <Section title="SOFT" dark>
      <div className={s.skillsList}>
        {SOFT_SKILLS.map((skill) => (
          <span key={skill.id} className={s.skillTag}>
            {t(skill.nameKey)}
          </span>
        ))}
      </div>
    </Section>
  );
};
