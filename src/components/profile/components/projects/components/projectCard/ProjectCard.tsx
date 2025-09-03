import { FC, ReactNode, useState } from 'react';

import cn from 'classnames';

import { TOOLTIP_DELAY } from '@/constants';
import { Tooltip } from '@/ui-kit';

import { Skill } from '../../../skill/Skill';
import { TProjectView } from '../../Projects';

import s from './s.module.styl';

type TProps = {
  project: TProjectView;
  video?: string;
  className?: string;
  tooltipMaxWidth?: number;
  tooltipHeader?: ReactNode;
};

export const ProjectCard: FC<TProps> = ({
  project,
  video,
  className,
  tooltipMaxWidth = 520,
  tooltipHeader,
}) => {
  // Local flags to hide media if assets are missing
  const [showVideo, setShowVideo] = useState(Boolean(video));

  const {
    name,
    description,
    fullDescription,
    icon: IconComponent,
    company,
    technologies = [],
  } = project;

  const tooltipContent = (
    <div className={s.tooltipContent}>
      <div className={s.tooltipDescription}>{fullDescription}</div>
    </div>
  );

  return (
    <div className={cn(s.wrapper, className)}>
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
        {technologies.length > 0 && (
          <div className={s.techList}>
            {technologies.map((tech) => (
              <Skill key={tech.name} skill={tech} showLabel={false} />
            ))}
          </div>
        )}
      </div>

      <div className={s.media}>
        <Tooltip
          header={tooltipHeader ?? name}
          content={tooltipContent}
          arrow
          maxWidth={tooltipMaxWidth}
          delay={TOOLTIP_DELAY.slow}
          fillSpaace
        >
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
        </Tooltip>
      </div>
    </div>
  );
};
