import { useEffect, useState } from 'react';

export const useScrollDetection = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      setIsScrolling(true);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set scrolling to false after scroll ends
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // 150ms delay after scroll stops
    };

    // Find the scrollable container
    const scrollContainer = document.querySelector('[data-scroll-container="true"]');

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);

      return () => {
        clearTimeout(scrollTimeout);
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }

    return () => clearTimeout(scrollTimeout);
  }, []);

  return { isScrolling };
};
