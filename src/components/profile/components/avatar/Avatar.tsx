import { FC, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { LogoIcon } from '@/icons';

import { IMAGES } from './photos';

import s from './s.module.styl';

export const Avatar: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const nextIndex = (currentIndex + 1) % IMAGES.length;
  const prevIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;

  // Preload images with priority on vest_side.jpg
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = IMAGES.length;

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsLoaded(true);
      }
    };

    // Load vest_side.jpg first (priority image)
    const priorityImg = new Image();
    priorityImg.onload = onImageLoad;
    priorityImg.src = IMAGES[0].src;

    // Load other images after priority
    IMAGES.slice(1).forEach(({ src }) => {
      const img = new Image();
      img.onload = onImageLoad;
      img.src = src;
    });
  }, []);

  // Start animation only after all images are loaded
  useEffect(() => {
    if (!isLoaded) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const delay = IMAGES[currentIndex]?.durationMs ?? 3000;
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isLoaded]);

  return (
    <div className={s.photo}>
      {!isLoaded && <LogoIcon size="250" />}
      {IMAGES.map(({ src }, index) => {
        const className = cn(s.image, {
          [s.active]: index === currentIndex,
          [s.next]: index === nextIndex,
          [s.prev]: index === prevIndex,
          [s.hidden]: index !== currentIndex && index !== nextIndex && index !== prevIndex,
        });
        return (
          <img
            key={src}
            src={src}
            alt="avatar"
            className={className}
            aria-hidden={index !== currentIndex}
          />
        );
      })}
    </div>
  );
};
