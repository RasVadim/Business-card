import { FC } from 'react';

import { HARD_SKILL_CATEGORIES, TOOLTIP_DELAY } from '@/constants';
import { useTranslation } from '@/hooks';
import { useThemeMode } from '@/store/atoms';
import { EThemeMode } from '@/types';
import { Tooltip } from '@/ui-kit';

import { Section } from '../../..';

import s from './s.module.styl';

export const Technical: FC = () => {
  const { t } = useTranslation();
  const [theme] = useThemeMode();

  return (
    <Section title="TECHNICAL" dark>
      {HARD_SKILL_CATEGORIES.map((category) => (
        <div className={s.category} key={category.id}>
          <div className={s.categoryTitle}>{t(category.titleKey)}</div>
          <div className={s.skills}>
            {category.items.map((skill) => {
              const isDark = theme === EThemeMode.DARK;
              const icon = isDark ? skill.darkIcon || skill.icon : skill.icon;
              const tooltipIcon = isDark ? skill.icon : skill.darkIcon || skill.icon;

              return (
                <Tooltip
                  header={
                    <div className={s.tooltipTitle}>
                      {skill.icon && <img className={s.icon} src={tooltipIcon} alt={skill.name} />}
                      {skill.name}
                    </div>
                  }
                  content={<div className={s.tooltipDescription}>{t(skill.descriptionKey)}</div>}
                  key={skill.name}
                  maxWidth={400}
                  delay={TOOLTIP_DELAY.fast}
                >
                  <span className={s.skill} key={`${category.id}-${skill.name}`}>
                    {skill.icon && <img className={s.icon} src={icon} alt={skill.name} />}
                    {skill.showLabel && <span>{skill.name}</span>}
                  </span>
                </Tooltip>
              );
            })}
          </div>
        </div>
      ))}
    </Section>
  );
};
