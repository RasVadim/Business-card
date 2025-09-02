import { FC, ReactNode } from 'react';

interface IconGradientProps {
  children: ReactNode;
  color1?: string;
  color2?: string;
  isActive?: boolean;
}

export const IconGradient: FC<IconGradientProps> = ({ 
  children, 
  color1 = '#ff4c29', 
  color2 = '#2f485c', 
  isActive = false 
}) => {
  const gradientId = `icon-gradient-${Math.random().toString(36).substring(2, 9)}`;
  
  const getGradientUrl = (activeColor?: string) => {
    if (isActive) return activeColor || color1;
    return `url(#${gradientId})`;
  };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
};
