/**
 * Get comprehensive user metadata from browser
 * @returns The user metadata with detailed information
 */
export const getUserMetadata = () => {
  const now = Date.now();

  // Device and screen information
  const screen = {
    width: window.screen.width,
    height: window.screen.height,
  };

  // Browser and OS detection
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent);
  const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  // Browser detection
  const getBrowser = () => {
    if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) return 'chrome';
    if (/Firefox/i.test(userAgent)) return 'firefox';
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'safari';
    if (/Edge/i.test(userAgent)) return 'edge';
    if (/Opera|OPR/i.test(userAgent)) return 'opera';
    return 'unknown';
  };

  // OS detection
  const getOS = () => {
    if (/Windows/i.test(userAgent)) return 'windows';
    if (/Macintosh|Mac OS X/i.test(userAgent)) return 'mac';
    if (/Linux/i.test(userAgent)) return 'linux';
    if (/Android/i.test(userAgent)) return 'android';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
    return 'unknown';
  };

  // Hardware information
  const hardwareInfo = {
    cores: navigator.hardwareConcurrency || 0,
    memory: (navigator as any).deviceMemory || 0,
  };

  // Time and date information
  const timeInfo = {
    timestamp: now,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    localTime: new Date().toLocaleString(),
  };

  // URL and navigation information
  const urlInfo = {
    href: window.location.href,
    referrer: document.referrer || 'Direct transition',
  };

  // Language and locale
  const localeInfo = {
    language: navigator.language,
    languages: navigator.languages || [navigator.language],
  };

  // User behavior (if available in localStorage)
  const behaviorInfo = {
    visitCount: parseInt(localStorage.getItem('visitCount') || '0'),
    lastVisit: localStorage.getItem('lastVisit'),
    sessionStart: sessionStorage.getItem('sessionStart') || now.toString(),
  };

  // Update visit count and last visit
  const newVisitCount = behaviorInfo.visitCount + 1;
  localStorage.setItem('visitCount', newVisitCount.toString());
  localStorage.setItem('lastVisit', now.toString());
  if (!sessionStorage.getItem('sessionStart')) {
    sessionStorage.setItem('sessionStart', now.toString());
  }

  return {
    // Basic info
    userAgent,
    timestamp: now,

    // Device info
    device: {
      type: deviceType,
      screen,
      hardware: hardwareInfo,
    },

    // Browser info
    browser: {
      name: getBrowser(),
      version: userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/)?.[0] || 'Unknown',
    },

    // OS info
    os: {
      name: getOS(),
    },

    // Time info
    time: timeInfo,

    // URL info
    url: urlInfo,

    // Locale info
    locale: localeInfo,

    // User behavior
    behavior: {
      ...behaviorInfo,
      visitCount: newVisitCount,
    },
  };
};
