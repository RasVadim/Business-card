import { FIRST_JOB_DATE, YEAR_MS } from '@/constants';

/**
 * Calculate years of experience from first job date
 * @returns number of years of experience
 */
export const getExperienceYears = (): number => {
  const start = new Date(FIRST_JOB_DATE).getTime();
  const now = new Date().getTime();
  const diffMs = Number.isNaN(start) ? 0 : now - start;
  return Math.floor(diffMs / YEAR_MS);
};
