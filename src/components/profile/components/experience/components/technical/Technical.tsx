import { FC } from 'react';

import { HARD_SKILL_CATEGORIES } from '@/constants';
import { useTranslation } from '@/hooks';
import { TechnicalSkillsIcon } from '@/icons';

import { Section, Skill } from '../../..';

import s from './s.module.styl';

export const Technical: FC = () => {
  const { t } = useTranslation();

  return (
    <Section title={t('layout.technical')} dark icon={<TechnicalSkillsIcon />}>
      {HARD_SKILL_CATEGORIES.map((category) => (
        <div className={s.category} key={category.id}>
          <div className={s.categoryTitle}>{t(category.titleKey)}</div>
          <div className={s.skills}>
            {category.items.map((skill) => {
              return <Skill key={skill.name} skill={skill} />;
            })}
          </div>
        </div>
      ))}
    </Section>
  );
};
