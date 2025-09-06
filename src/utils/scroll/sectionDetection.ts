import { ESection } from '@/types';

import { globalScrollManager } from './globalScrollManager';

const DETECTION_SECTION_OFFSET = 500;

/**
 * Finds the currently visible section based on scroll position
 * @param scrollPosition - The current scroll position
 * @param sections - The sections to check
 * @returns The currently visible section
 */
export const findActiveSection = (
  scrollPosition: number,
  sections: string[] = Object.values(ESection),
): string => {
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      const adjustedScrollPosition = scrollPosition + DETECTION_SECTION_OFFSET;

      if (
        adjustedScrollPosition >= offsetTop &&
        adjustedScrollPosition < offsetTop + offsetHeight
      ) {
        return section;
      }
    }
  }

  return '';
};

/**
 * Creates a scroll handler that updates the active section
 * @param onSectionChange - The function to call when the active section changes
 * @param isProgrammaticScroll - Whether the scroll is programmatic
 * @returns A function to handle the scroll event
 */
export const createSectionScrollHandler = (
  onSectionChange: (section: string) => void,
  isProgrammaticScroll: boolean,
) => {
  return () => {
    if (isProgrammaticScroll) {
      return;
    }

    const scrollPosition = globalScrollManager.getScrollPosition();
    const activeSection = findActiveSection(scrollPosition);

    if (activeSection) {
      onSectionChange(activeSection);
    }
  };
};
