import { FC, useMemo } from 'react';

import { FIRST_JOB_DATE, OWN_PROJECTS, PROJECTS, YEAR_MS } from '@/constants';
import { useTranslation } from '@/hooks';

import s from './s.module.styl';

type StatItem = {
  value: string;
  labelTop: string;
  labelBottom?: string;
};

export const Statistic: FC = () => {
  const { t, i18n } = useTranslation();
  const stats = useMemo<StatItem[]>(() => {
    const start = new Date(FIRST_JOB_DATE).getTime();
    const now = new Date().getTime();
    const diffMs = Number.isNaN(start) ? 0 : now - start;
    const experience = '+' + Math.floor(diffMs / YEAR_MS);

    const projectsTotal = '+' + (Object.keys(PROJECTS).length + Object.keys(OWN_PROJECTS).length);
    const leadershipTotal = String(
      Object.values(PROJECTS).filter((project) => project.isLead).length,
    );

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
    <section className={s.wrapper}>
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
