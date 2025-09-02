import { FC } from 'react';

import { createIconGradient, getGradientUrl } from '@/utils/iconGradient';

type PropsType = {
  size?: string;
  color1?: string;
  color2?: string;
  isActive?: boolean;
};

export const SubscriptionTGBotIcon: FC<PropsType> = ({
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
        d="M2 8.5H13"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16.5H8"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 16.5H14.5"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 11.33V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89001C2 4.38001 2.89 3.5 6.44 3.5H13.28"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 3.25H20.13C20.82 3.25 21.38 3.88 21.38 4.5C21.38 5.19 20.82 5.75 20.13 5.75H17V3.25Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 5.75H20.57C21.36 5.75 22 6.31 22 7C22 7.69 21.36 8.25 20.57 8.25H17V5.75Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.76 8.25V9.5"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.76 2V3.25"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.19 3.25H16"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.19 8.25H16"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
