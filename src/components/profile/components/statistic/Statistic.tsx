import { FC, useMemo } from 'react';

import { OWN_PROJECTS, PROJECTS } from '@/constants';
import { useTranslation } from '@/hooks';
import { ESection } from '@/types';
import { getExperienceYears, getLeadedProjects } from '@/utils';

import s from './s.module.styl';

type StatItem = {
  value: string;
  labelTop: string;
  labelBottom?: string;
};

export const Statistic: FC = () => {
  const { t, i18n } = useTranslation();
  const stats = useMemo<StatItem[]>(() => {
    const experience = '+' + getExperienceYears();

    const projectsTotal = '+' + (Object.keys(PROJECTS).length + Object.keys(OWN_PROJECTS).length);
    const leadershipTotal = String(getLeadedProjects());

    return [
      {
        value: experience,
        labelTop: t('profile.experience'),
        labelBottom: t('profile.experienceBottom'),
      },
      {
        value: projectsTotal,
        labelTop: t('profile.projects'),
        labelBottom: t('profile.projectsBottom'),
      },
      {
        value: leadershipTotal,
        labelTop: t('profile.leadership'),
        labelBottom: t('profile.leadershipBottom'),
      },
    ];
  }, [i18n.language]);

  return (
    <section className={s.wrapper} id={ESection.EXPERIENCE}>
      {stats.map((stat) => (
        <div key={stat.value} className={s.card}>
          <div className={s.value}>{stat.value}</div>
          <div className={s.labels}>
            <div>{stat.labelTop}</div>
            {stat.labelBottom && <div>{stat.labelBottom}</div>}
          </div>
        </div>
      ))}
    </section>
  );
};
