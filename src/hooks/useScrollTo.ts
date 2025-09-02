import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollTo = useCallback((elementId: string, offset = 0): Promise<void> => {
    return new Promise((resolve) => {
      const element = document.getElementById(elementId);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });

        // Use scrollend event (modern browsers)
        const handleScrollEnd = () => {
          window.removeEventListener('scrollend', handleScrollEnd);
          resolve();
        };

        window.addEventListener('scrollend', handleScrollEnd);
      } else {
        resolve();
      }
    });
  }, []);

  return { scrollTo };
};
