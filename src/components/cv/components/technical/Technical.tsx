import { FC } from 'react';

import { HARD_SKILL_CATEGORIES } from '@/constants';
import { useTranslation } from '@/hooks';

import { Section } from '../../components';

import s from './s.module.styl';

export const Technical: FC = () => {
  const { t } = useTranslation();

  return (
    <Section title={t('layout.technical')} dark>
      <div className={s.skillsList}>
        {HARD_SKILL_CATEGORIES.map((category) => (
          <div key={category.id} className={s.skillCategory}>
            <div className={s.categoryTitle}>{t(category.titleKey)}:</div>
            <div className={s.skills}>
              {category.items.map((skill) => (
                <span key={skill.name} className={s.skillTag}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
