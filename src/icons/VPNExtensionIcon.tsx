import { FC } from 'react';

import { createIconGradient, getGradientUrl } from '@/utils/iconGradient';

type PropsType = {
  size?: string;
  color1?: string;
  color2?: string;
  isActive?: boolean;
};

export const VPNExtensionIcon: FC<PropsType> = ({
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
        d="M2 4.99992C2 4.99992 12 -1.00008 22 4.99992C22 4.99992 22 15.9999 12 21.9999C12 21.9999 2 16.9999 2 4.99992Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M2.1001 7.10005C5.2001 17.1 12.0001 10 12.0001 10C11.0001 4.00005 16.1001 2.90005 16.1001 2.90005L16.7001 2.80005"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4 18.5C16.4 18.5 19 13 12 10"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
