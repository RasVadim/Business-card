import { FC } from 'react';

type PropsType = {
  size?: string;
  color?: string;
  secondaryColor?: string;
  isActive?: boolean;
};

export const LinkIcon: FC<PropsType> = ({
  size = '20',
  color = '#9DB2CE',
  secondaryColor = '#FFFFFF',
  isActive = false,
}) => {
  return isActive ? (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 12C13.5 15.18 10.93 17.75 7.75 17.75C4.57 17.75 2 15.18 2 12C2 8.82 4.57 6.25 7.75 6.25"
        stroke={secondaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12C10 8.69 12.69 6 16 6C19.31 6 22 8.69 22 12C22 15.31 19.31 18 16 18"
        stroke={secondaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 12C13.5 15.18 10.93 17.75 7.75 17.75C4.57 17.75 2 15.18 2 12C2 8.82 4.57 6.25 7.75 6.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12C10 8.69 12.69 6 16 6C19.31 6 22 8.69 22 12C22 15.31 19.31 18 16 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
