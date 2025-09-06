import { useEffect, useState } from 'react';

import { globalScrollManager } from '@/utils';

export const useScrollDetection = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Add scroll listener to global manager
    globalScrollManager.addScrollListener(handleScroll);

    return () => {
      clearTimeout(scrollTimeout);
      globalScrollManager.removeScrollListener(handleScroll);
    };
  }, []);

  return { isScrolling };
};
