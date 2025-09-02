import { FC } from 'react';

import { createIconGradient, getGradientUrl } from '@/utils/iconGradient';

type PropsType = {
  size?: string;
  color1?: string;
  color2?: string;
  isActive?: boolean;
};

export const AutoFillExtensionIcon: FC<PropsType> = ({
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
        d="M12.37 8.87988H17.62"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.38 8.87988L7.13 9.62988L9.38 7.37988"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.37 15.8799H17.62"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.38 15.8799L7.13 16.6299L9.38 14.3799"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke={getGradientUrl(isActive, color1)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
