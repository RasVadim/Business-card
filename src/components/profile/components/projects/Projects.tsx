import { FC, useMemo } from 'react';

import { PROJECTS, OWN_PROJECTS, COMPANIES } from '@/constants';
import { useTranslation } from '@/hooks';
import { ESection, TCompany, TProject } from '@/types';

import { ProjectCard } from './components/projectCard/ProjectCard';

import s from './s.module.styl';

export type TProjectView = TProject & {
  description: string;
  fullDescription: string;
  company?: TCompany;
};

export const Projects: FC = () => {
  const { t } = useTranslation();

  const companyProjects: TProjectView[] = useMemo(() => {
    return Object.values(PROJECTS).map((project) => {
      const company = COMPANIES[project.companyId];
      return {
        ...project,
        description: t(project.descriptionKey),
        fullDescription: t(project.fullDescriptionKey),
        company,
      };
    });
  }, [t]);

  const ownProjects: TProjectView[] = useMemo(() => {
    return Object.values(OWN_PROJECTS).map((project) => ({
      ...project,
      description: t(project.descriptionKey),
      fullDescription: t(project.fullDescriptionKey),
    }));
  }, [t]);

  return (
    <div className={s.wrapper} id={ESection.PROJECTS}>
      <div className={s.sectionTitle}>Projects</div>
      <div className={s.list}>
        {companyProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className={`${s.sectionTitle} ${s.secondTitle}`}>Own Projects</div>
      <div className={s.list}>
        {ownProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
};
