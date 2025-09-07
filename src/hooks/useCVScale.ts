import { useEffect, useState } from 'react';

export const useCVScale = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      const cvWidth = 880;

      if (screenWidth < cvWidth) {
        const newScale = screenWidth / cvWidth;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    // Initial scale calculation
    updateScale();

    // Add event listener for window resize
    window.addEventListener('resize', updateScale);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return scale;
};
