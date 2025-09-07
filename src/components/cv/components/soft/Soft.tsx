import { FC } from 'react';

import cn from 'classnames';

import { CV_ICON_COLOR, SOFT_SKILLS } from '@/constants';
import { useTranslation } from '@/hooks';
import { SoftSkillsIcon } from '@/icons';

import { Section } from '../../components';

import s from './s.module.styl';

export const Soft: FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Section
      title={t('layout.soft')}
      dark
      icon={<SoftSkillsIcon isActive color1={CV_ICON_COLOR} />}
    >
      <div className={s.skillsList}>
        {SOFT_SKILLS.map((skill) => (
          <span key={skill.id} className={cn(s.skillTag, { [s.less]: i18n.language === 'ru' })}>
            {t(skill.nameKey)}
          </span>
        ))}
      </div>
    </Section>
  );
};
