import { FC } from 'react';

import { GithubIcon, LinkIcon } from '@/icons';
import { useThemeMode } from '@/store/atoms';
import { EThemeMode } from '@/types/settings';

import { Skill } from '../../../skill/Skill';
import { TProjectView } from '../../Projects';

import s from './s.module.styl';

type TProps = {
  project: TProjectView;
};

export const ProjectInfo: FC<TProps> = ({ project }) => {
  const {
    name,
    description,
    icon: IconComponent,
    company,
    technologies = [],
    gitHub,
    link,
  } = project;

  const [theme] = useThemeMode();
  const oppositeColor = theme === EThemeMode.DARK ? '#FFFFFF' : '#000000';

  return (
    <div className={s.info}>
      <div className={s.iconAndTitle}>
        {IconComponent && <IconComponent className={s.icon} size="56" />}
        <div className={s.title}>{name}</div>
      </div>

      {company?.name && (
        <div className={s.companyTitle}>
          {company?.image && <img src={company.image} alt={company.name} />}
          {company?.name}
        </div>
      )}

      {description && <div className={s.description}>{description}</div>}

      {/* Project links */}
      {(gitHub || link) && (
        <div className={s.links}>
          {gitHub && (
            <a href={gitHub} target="_blank" rel="noopener noreferrer" className={s.link}>
              <GithubIcon size="16" color={oppositeColor} />
              <span>{gitHub.replace('https://github.com/', '')}</span>
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className={s.link}>
              <LinkIcon size="16" color={oppositeColor} />
              <span>{link.replace('https://', '')}</span>
            </a>
          )}
        </div>
      )}

      {technologies.length > 0 && (
        <div className={s.techList}>
          {technologies.map((tech) => (
            <Skill key={tech.name} skill={tech} showLabel={false} />
          ))}
        </div>
      )}
    </div>
  );
};
