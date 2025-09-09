import { PROJECTS } from '@/constants';

/**
 * Calculate number of projects where user was in lead position
 * @returns number of leaded projects
 */
export const getLeadedProjects = (): number => {
  return Object.values(PROJECTS).filter((project) => project.isLead).length;
};
