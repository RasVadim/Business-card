import type { FC } from 'react';
import { useRef, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

import { PAGE_NAMES } from '@/constants/paths';
import { Profile, CV } from '@/pages';
import { PAGE_ANIMATION_VARIANTS } from '@/pages/constants/animation';

import s from './s.module.styl';

export const AnimatedPage: FC = () => {
  const location = useLocation();
  const isFirstMountRef = useRef(true);
  const prevPathRef = useRef<string>('');

  useEffect(() => {
    isFirstMountRef.current = false;
  }, []);

  // Determine if this is the first entry
  const isFirstEntry = isFirstMountRef.current;

  // Determine animation direction based on path comparison
  const currentPath = location.pathname;
  const prevPath = prevPathRef.current;

  // Update previous path after calculating direction
  useEffect(() => {
    prevPathRef.current = currentPath;
  }, [currentPath]);

  // Direction logic: Profile (/) -> CV (/cv) = direction 1, CV (/cv) -> Profile (/) = direction -1
  let direction = 0;
  if (prevPath && !isFirstEntry) {
    if (prevPath === '/' && currentPath === '/cv') {
      direction = 1; // Profile -> CV (right to left)
    } else if (prevPath === '/cv' && currentPath === '/') {
      direction = -1; // CV -> Profile (left to right)
    }
  }

  return (
    <AnimatePresence mode="sync" custom={{ direction, isFirstEntry }}>
      <motion.div
        key={location.key || location.pathname}
        custom={{ direction, isFirstEntry }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={PAGE_ANIMATION_VARIANTS}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
        className={s.motionWrap}
        data-scroll-container="true"
      >
        <Routes location={location} key={location.key || location.pathname}>
          <Route index element={<Profile />} />
          <Route path={PAGE_NAMES.CV} element={<CV />} />
          <Route path="*" element={<div>Need beautiful page</div>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};
