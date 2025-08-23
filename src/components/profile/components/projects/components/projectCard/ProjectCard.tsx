import { FC, ReactNode, useState } from 'react';

import cn from 'classnames';

import { TCompany, THardSkill } from '@/types';
import { Tooltip } from '@/ui-kit';

import s from './s.module.styl';

type TProps = {
  name: string;
  company?: TCompany;
  description: string;
  technologies?: THardSkill[];
  icon?: string;
  video?: string;
  className?: string;
  tooltipMaxWidth?: number;
  tooltipHeader?: ReactNode;
};

export const ProjectCard: FC<TProps> = ({
  name,
  company,
  description,
  technologies = [],
  icon,
  video,
  className,
  tooltipMaxWidth = 520,
  tooltipHeader,
}) => {
  // Local flags to hide media if assets are missing
  const [showIcon, setShowIcon] = useState(Boolean(icon));
  const [showVideo, setShowVideo] = useState(Boolean(video));

  const tooltipContent = (
    <div className={s.tooltipContent}>
      <div className={s.tooltipDescription}>{description}</div>
    </div>
  );

  return (
    <Tooltip
      header={tooltipHeader ?? name}
      content={tooltipContent}
      arrow
      maxWidth={tooltipMaxWidth}
    >
      <div className={cn(s.wrapper, className)}>
        <div className={s.info}>
          <div className={s.iconAndTitle}>
            {showIcon && icon ? (
              <img
                className={s.icon}
                src={icon}
                alt={`${name} icon`}
                onError={() => setShowIcon(false)}
              />
            ) : null}
            <div className={s.title}>{name}</div>
          </div>
          {company?.name && <div className={s.companyTitle}>{company?.name}</div>}
          {technologies.length > 0 && (
            <div className={s.skills}>
              {technologies.map((tech) => (
                <span key={tech.name} className={s.skill}>
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={s.media}>
          {showVideo ? (
            <video
              className={s.video}
              src={video}
              muted
              loop
              playsInline
              autoPlay
              onError={() => setShowVideo(false)}
            />
          ) : (
            <div className={s.videoPlaceholder} />
          )}
        </div>
      </div>
    </Tooltip>
  );
};
