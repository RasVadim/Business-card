import { FC } from 'react';

import { createIconGradient, getGradientUrl } from '@/utils/iconGradient';

type PropsType = {
  size?: string;
  color1?: string;
  color2?: string;
  isActive?: boolean;
};

export const VPNDesktopAppIcon: FC<PropsType> = ({
  size = '24',
  color1 = '#ff4c29',
  color2 = '#2f485c',
  isActive = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>{createIconGradient(color1, color2)}</defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 2L12 4V11H22V2Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 22L12 20V13H22V22Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4.30005L2 6.00005V11H10V4.30005Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 19.7L2 18V13H10V19.7Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
