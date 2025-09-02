export const ICON_GRADIENT_ID = 'iconGradientId';

export const createIconGradient = (color1: string, color2: string) => (
  <linearGradient
    id={ICON_GRADIENT_ID}
    x1="0"
    y1="0"
    x2="24"
    y2="24"
    gradientUnits="userSpaceOnUse"
  >
    <stop offset="0%" stopColor={color1} />
    <stop offset="100%" stopColor={color2} />
  </linearGradient>
);

export const getGradientUrl = (isActive: boolean, activeColor: string) => {
  if (isActive) return activeColor;
  return `url(#${ICON_GRADIENT_ID})`;
};
