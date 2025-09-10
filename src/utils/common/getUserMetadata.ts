/**
 * Get user metadata from browser
 * @returns The user metadata
 */
export const getUserMetadata = () => {
  return {
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'Direct transition',
    timestamp: Date.now(),
    pageUrl: window.location.href,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
