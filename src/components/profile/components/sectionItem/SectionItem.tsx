import { FC } from 'react';

import cn from 'classnames';

import { TProject } from '@/types';

import s from './s.module.styl';

type TProps = {
  title: string;
  company: string;
  period?: string;
  location?: string;
  description?: string;
  projects?: TProject[];
  image?: string;
  small?: boolean;
  colorLess?: boolean;
};

export const SectionItem: FC<TProps> = ({
  title,
  company,
  period,
  location,
  description,
  projects = [],
  image,
  small = false,
  colorLess = false,
}) => {
  return (
    <div className={cn(s.wrapper, { [s.small]: small, [s.colorLess]: colorLess })}>
      <div className={s.headerRow}>
        <div className={s.leftSide}>
          {image && (
            <div className={s.image}>
              <img src={image} alt={company} />
            </div>
          )}
          <div className={s.leftTitle}>
            <div className={s.position}>{title}</div>
            <div className={s.company}>{company}</div>
          </div>
        </div>
        <div className={s.rightMeta}>
          <div className={s.location}>{location}</div>
        </div>
      </div>
      <div className={s.subRow}>
        <div className={s.period}>{period}</div>
        {projects.length > 0 && (
          <ul className={s.projects}>
            {projects.map((project) => (
              <li key={project.name}>{project.name}</li>
            ))}
          </ul>
        )}
      </div>

      {description && <div className={s.description}>{description}</div>}
    </div>
  );
};
