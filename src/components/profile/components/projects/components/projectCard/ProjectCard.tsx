import { FC, ReactNode, useEffect, useState, useRef } from 'react';

import cn from 'classnames';

import { TOOLTIP_DELAY } from '@/constants';
import { useScrollDetection } from '@/hooks';
import { GithubIcon, LinkIcon } from '@/icons';
import { useThemeMode } from '@/store/atoms';
import { EThemeMode } from '@/types/settings';
import { Tooltip } from '@/ui-kit';

import { Skill } from '../../../skill/Skill';
import { TProjectView } from '../../Projects';

import s from './s.module.styl';

enum EMediaState {
  PLACEHOLDER = 'placeholder',
  PHOTO = 'photo',
  VIDEO = 'video',
}

type TProps = {
  project: TProjectView;
  className?: string;
  tooltipMaxWidth?: number;
  tooltipHeader?: ReactNode;
};

export const ProjectCard: FC<TProps> = ({
  project,
  className,
  tooltipMaxWidth = 520,
  tooltipHeader,
}) => {
  const {
    name,
    description,
    fullDescription,
    icon: IconComponent,
    company,
    photo,
    video,
    technologies = [],
    gitHub,
    link,
  } = project;

  const [theme] = useThemeMode();

  // Media loading state - single enum instead of 4 booleans
  const [mediaState, setMediaState] = useState<EMediaState>(EMediaState.PLACEHOLDER);

  // Video control
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isScrolling } = useScrollDetection();

  const oppositeColor = theme === EThemeMode.DARK ? '#FFFFFF' : '#000000';

  // Preload photo first, then video
  useEffect(() => {
    if (!photo) return;

    const img = new Image();
    img.onload = () => {
      setMediaState(EMediaState.PHOTO);
      // Start video preload after photo loads
      if (video) {
        const videoEl = document.createElement('video');
        videoEl.oncanplaythrough = () => setMediaState(EMediaState.VIDEO);
        videoEl.onerror = () => {}; // Stay on photo if video fails
        videoEl.src = video;
        videoEl.load();
      }
    };
    img.onerror = () => {}; // Stay on placeholder if photo fails
    img.src = photo;
  }, [photo, video]);

  // Control video playback based on scroll state
  useEffect(() => {
    if (!videoRef.current || mediaState !== EMediaState.VIDEO) return;

    if (isScrolling) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        // Ignore play errors (e.g., if video is not ready)
      });
    }
  }, [isScrolling, mediaState]);

  // Determine what to render based on current state

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

      <div className={s.media}>
        <Tooltip
          header={tooltipHeader ?? name}
          content={tooltipContent}
          arrow
          maxWidth={tooltipMaxWidth}
          delay={TOOLTIP_DELAY.slow}
          fillSpaace
        >
          {mediaState === EMediaState.VIDEO ? (
            <video
              ref={videoRef}
              className={s.video}
              src={video}
              muted
              loop
              playsInline
              autoPlay
              onError={() => setMediaState(EMediaState.PHOTO)}
            />
          ) : mediaState === EMediaState.PHOTO ? (
            <img
              className={s.photo}
              src={photo}
              alt={name}
              onError={() => setMediaState(EMediaState.PLACEHOLDER)}
            />
          ) : (
            <div className={s.videoPlaceholder} />
          )}
        </Tooltip>
      </div>
    </div>
  );
};
