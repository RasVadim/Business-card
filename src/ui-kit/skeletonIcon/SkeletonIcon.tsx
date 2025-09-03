import { FC, useState, useEffect } from 'react';

import cn from 'classnames';

import { getColorFromName } from './utils';

import s from './s.module.styl';

type TProps = {
  src: string;
  alt: string;
  className?: string;
};

export const SkeletonIcon: FC<TProps> = ({ src, alt, className }) => {
  const [retryCount, setRetryCount] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Reset state when src prop changes (theme switch)
  useEffect(() => {
    setRetryCount(0);
    setShowFallback(false);
    setImageSrc(src);
  }, [src]);

  const handleImageLoad = () => {
    setShowFallback(false);
  };

  const handleImageError = () => {
    if (retryCount < 2) {
      // Retry loading by adding timestamp to force reload
      setRetryCount((prev) => prev + 1);
      setImageSrc(`${src}?retry=${Date.now()}`);
    } else {
      setShowFallback(true);
    }
  };

  if (showFallback) {
    return (
      <div className={cn(s.fallback, className)} style={{ backgroundColor: getColorFromName(alt) }}>
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};
