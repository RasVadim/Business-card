// Utility for managing user site ID

const USER_SITE_ID_KEY = 'userSiteId';

/**
 * Generate or retrieve user site ID from localStorage
 * Each user gets a unique ID that persists across sessions
 */
export const getUserSiteId = (): string => {
  let userSiteId = localStorage.getItem(USER_SITE_ID_KEY);

  if (!userSiteId) {
    // Generate new unique ID
    userSiteId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_SITE_ID_KEY, userSiteId);
  }

  return userSiteId;
};

/**
 * Clear user site ID (for testing purposes)
 */
export const clearUserSiteId = (): void => {
  localStorage.removeItem(USER_SITE_ID_KEY);
};
