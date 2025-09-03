/**
 * Generate consistent color from skill name using hash function
 *
 * @param name - The name of the skill/technology
 * @returns HSL color string with consistent hue based on name hash
 */
export const getColorFromName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 50%)`;
};
