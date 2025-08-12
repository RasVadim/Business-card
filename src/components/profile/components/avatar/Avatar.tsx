import { FC, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import s from './s.module.styl';

const images = [
  { src: '/images/vest_side.jpg', durationMs: 9000 },
  { src: '/images/vest_up.jpg', durationMs: 250 },
  { src: '/images/vest_smile.jpg', durationMs: 200 },
  { src: '/images/jacket_smile.jpg', durationMs: 150 },
  { src: '/images/jacket_kind.jpg', durationMs: 100 },
  { src: '/images/jacket_active.jpg', durationMs: 200 },
  { src: '/images/jacket_active_close.jpg', durationMs: 250 },
];

export const Avatar: FC = () => {
  // Preload images once for smooth transitions
  useEffect(() => {
    images.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const nextIndex = (currentIndex + 1) % images.length;
  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const delay = images[currentIndex]?.durationMs ?? 3000;
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  return (
    <div className={s.photo}>
      {images.map(({ src }, index) => {
        const className = cx(s.image, {
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
