import { FC, ReactNode, useEffect, useState, useRef } from 'react';

import { TOOLTIP_DELAY } from '@/constants';
import { useScrollDetection } from '@/hooks';
import { Tooltip } from '@/ui-kit';

import { TProjectView } from '../../Projects';

import s from './s.module.styl';

enum EMediaState {
  PLACEHOLDER = 'placeholder',
  PHOTO = 'photo',
  VIDEO = 'video',
}

type TProps = {
  project: TProjectView;
  tooltipMaxWidth?: number;
  tooltipHeader?: ReactNode;
};

export const ProjectVideo: FC<TProps> = ({ project, tooltipMaxWidth = 520, tooltipHeader }) => {
  const { name, fullDescription, photo, video } = project;

  // Media loading state - single enum instead of 4 booleans
  const [mediaState, setMediaState] = useState<EMediaState>(EMediaState.PLACEHOLDER);

  // Video control
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isScrolling } = useScrollDetection();

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

  const tooltipContent = (
    <div className={s.tooltipContent}>
      <div className={s.tooltipDescription}>{fullDescription}</div>
    </div>
  );

  return (
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
  );
};
