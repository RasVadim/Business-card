import { FC } from 'react';

import cn from 'classnames';

import { TOOLTIP_DELAY } from '@/constants';
import { useTranslation } from '@/hooks';
import { useThemeMode } from '@/store/atoms';
import { EThemeMode, THardSkill } from '@/types';
import { Tooltip } from '@/ui-kit';

import s from './s.module.styl';

type TProps = {
  skill: THardSkill;
  showLabel?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
};

export const Skill: FC<TProps> = ({ skill, showLabel = true, tooltipPosition = 'top' }) => {
  const { t } = useTranslation();
  const [theme] = useThemeMode();

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
      position={tooltipPosition}
      key={skill.name}
      maxWidth={400}
      delay={TOOLTIP_DELAY.fast}
    >
      <span className={cn(s.skill, { [s.wider]: showLabel && skill.showLabel })} key={skill.name}>
        {skill.icon && <img className={s.icon} src={icon} alt={skill.name} />}
        {showLabel && skill.showLabel && <span>{skill.name}</span>}
      </span>
    </Tooltip>
  );
};
