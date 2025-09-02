import { FC } from 'react';

type PropsType = {
  size?: string;
  color1?: string;
  color2?: string;
  isActive?: boolean;
};

export const LifeCalendarIcon: FC<PropsType> = ({
  size = '24',
  color1 = '#ff4c29',
  color2 = '#2f485c',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="background-gradient"
          x1="0"
          y1="180"
          x2="180"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
        <mask id="calendar-mask">
          <rect width="180" height="180" fill="white" />
          <rect x="25" y="33" width="130" height="8" rx="4" fill="black" />
          <circle cx="90" cy="57" r="6.5" fill="black" />
          <circle cx="110" cy="57" r="6.5" fill="black" />
          <circle cx="130" cy="57" r="6.5" fill="black" />
          <circle cx="90" cy="77" r="6.5" fill="black" />
          <circle cx="110" cy="77" r="6.5" fill="black" />
          <circle cx="130" cy="77" r="6.5" fill="black" />
          <circle cx="90" cy="97" r="6.5" fill="black" />
          <circle cx="110" cy="97" r="6.5" fill="black" />
          <circle cx="130" cy="97" r="6.5" fill="black" />
          <circle cx="90" cy="117" r="6.5" fill="black" />
          <circle cx="110" cy="117" r="6.5" fill="black" />
          <circle cx="130" cy="117" r="6.5" fill="black" />
          <circle cx="50" cy="77" r="6.5" fill="black" />
          <circle cx="70" cy="77" r="6.5" fill="black" />
          <circle cx="50" cy="97" r="6.5" fill="black" />
          <circle cx="70" cy="97" r="6.5" fill="black" />
          <circle cx="50" cy="117" r="6.5" fill="black" />
          <circle cx="70" cy="117" r="6.5" fill="black" />
          <circle cx="50" cy="137" r="6.5" fill="black" />
          <circle cx="70" cy="137" r="6.5" fill="black" />
        </mask>
      </defs>
      <rect
        width="180"
        height="180"
        rx="40"
        fill="url(#background-gradient)"
        mask="url(#calendar-mask)"
      />
    </svg>
  );
};
