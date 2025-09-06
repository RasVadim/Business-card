import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollTo = useCallback((elementId: string, offset = 0): Promise<void> => {
    return new Promise((resolve) => {
      const element = document.getElementById(elementId);
      const scrollContainer = document.querySelector('[data-scroll-container="true"]');
      
      if (element && scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const y = elementRect.top - containerRect.top + scrollContainer.scrollTop - offset;
        
        scrollContainer.scrollTo({
          top: y,
          behavior: 'smooth',
        });

        // Use scrollend event (modern browsers)
        const handleScrollEnd = () => {
          scrollContainer.removeEventListener('scrollend', handleScrollEnd);
          resolve();
        };

        scrollContainer.addEventListener('scrollend', handleScrollEnd);
      } else {
        resolve();
      }
    });
  }, []);

  return { scrollTo };
};
