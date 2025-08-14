import { FC } from 'react';

import { HARD_SKILLS } from '@/constants/skills';
import { useTranslation } from '@/hooks';
import { useThemeMode } from '@/store/atoms';
import { EThemeMode } from '@/types';

import { Section } from '../../components';

import s from './s.module.styl';

export const Technical: FC = () => {
  const { t } = useTranslation();
  const [theme] = useThemeMode();

  return (
    <Section title="TECHNICAL" dark>
      {HARD_SKILLS.map((category) => (
        <div className={s.category} key={category.id}>
          <div className={s.categoryTitle}>{t(category.titleKey)}</div>
          <div className={s.skills}>
            {category.items.map((skill) => {
              const icon = theme === EThemeMode.DARK ? skill.darkIcon || skill.icon : skill.icon;
              return (
                <span className={s.skill} key={`${category.id}-${skill.name}`}>
                  {skill.icon && <img className={s.icon} src={icon} alt={skill.name} />}
                  {skill.showLabel && <span>{skill.name}</span>}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </Section>
  );
};
