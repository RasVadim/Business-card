export const PAGE_ANIMATION_VARIANTS = {
  initial: (custom: { direction: number; isFirstEntry: boolean }) =>
    custom.isFirstEntry
      ? { opacity: 0 }
      : { x: custom.direction > 0 ? '100vw' : '-100vw', opacity: 0 },
  animate: (custom: { isFirstEntry: boolean }) =>
    custom.isFirstEntry ? { opacity: 1 } : { x: 0, opacity: 1 },
  exit: (custom: { direction: number; isFirstEntry: boolean }) =>
    custom.isFirstEntry
      ? { opacity: 0 }
      : { x: custom.direction > 0 ? '-100vw' : '100vw', opacity: 0 },
};
