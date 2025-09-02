import { FC, useMemo } from 'react';

import { PROJECTS, OWN_PROJECTS, COMPANIES } from '@/constants/profile';
import { useTranslation } from '@/hooks';
import { ESection, TCompany, TProject } from '@/types';

import { ProjectCard } from './components/projectCard/ProjectCard';

import s from './s.module.styl';

type TProps = Record<string, never>;

export const Projects: FC<TProps> = () => {
  const { t } = useTranslation();

  type TProjectView = TProject & { description: string; company?: TCompany };

  const companyProjects: TProjectView[] = useMemo(() => {
    return Object.values(PROJECTS).map((project) => {
      const company = COMPANIES[project.companyId];
      return {
        ...project,
        description: t(project.descriptionKey),
        company,
      };
    });
  }, [t]);

  const ownProjects: TProjectView[] = useMemo(() => {
    return Object.values(OWN_PROJECTS).map((project) => ({
      ...project,
      description: t(project.descriptionKey),
    }));
  }, [t]);

  return (
    <div className={s.wrapper} id={ESection.PROJECTS}>
      <div className={s.sectionTitle}>Projects</div>
      <div className={s.list}>
        {companyProjects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            company={project?.company}
            description={project.description}
            technologies={project.technologies}
          />
        ))}
      </div>

      <div className={`${s.sectionTitle} ${s.secondTitle}`}>Own Projects</div>
      <div className={s.list}>
        {ownProjects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
};
