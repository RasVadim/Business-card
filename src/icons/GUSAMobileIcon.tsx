import { FC } from 'react';

import { createIconGradient, getGradientUrl } from '@/utils/iconGradient';

type PropsType = {
  size?: string;
  color1?: string;
  color2?: string;
  isActive?: boolean;
};

export const GUSAMobileIcon: FC<PropsType> = ({
  size = '24',
  color1 = '#ff4c29',
  color2 = '#2f485c',
  isActive = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>{createIconGradient(color1, color2)}</defs>
      <path
        d="M17 6V16C17 20 16 21 12 21H6C2 21 1 20 1 16V6C1 2 2 1 6 1H12C16 1 17 2 17 6Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 4.5H7"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99995 18.1C9.85599 18.1 10.55 17.406 10.55 16.55C10.55 15.694 9.85599 15 8.99995 15C8.14391 15 7.44995 15.694 7.44995 16.55C7.44995 17.406 8.14391 18.1 8.99995 18.1Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
