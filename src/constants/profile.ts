export const CONTACTS = {
  mail: 'rasstriginv@gmail.com',
  phone: '+7 92777-999-30',
  linkedin: 'linkedin.com/in/vadim-ra',
  github: 'github.com/RasVadim',
};

export const FIRST_JOB_DATE = '2018-08-01';

export const COMPANIES = [
  {
    id: 1,
    name: 'Seo-TLT',
    description:
      'Digital studio, one of the main clients is the automobile manufacturer LADA, Volzhsky Automobile Plant',
    countries: ['Russia'],
    startDate: '2018-08-01',
    endDate: '2020-12-01',
    position: 'Frontend Web Developer',
    technologies: ['React', 'TypeScript', 'GraphQL', 'Apollo'],
    isLead: false,
  },
  {
    id: 2,
    name: 'GlassesUSA.com',
    description:
      'An international optics manufacturer (operating in 92 countries) listed in the top 500 internet retailers in the USA.',
    countries: ['USA', 'Israel', 'Russia'],
    startDate: '2021-01-01',
    endDate: '2023-07-01',
    position: 'Frontend Developer',
    technologies: ['React', 'TypeScript', 'React-testing-library', 'Jest', 'Redux'],
    isLead: true,
  },
  {
    id: 3,
    name: 'ETALON GROUP',
    description:
      'One of the largest and oldest companies in the field of development and construction in the Russian market.',
    countries: ['Russia'],
    startDate: '2023-08-01',
    endDate: '2024-06-01',
    position: 'Lead Frontend Engineer',
    technologies: ['React', 'TypeScript', 'Cypress', 'Tanstack Query', 'Jotai'],
    isLead: true,
  },
  {
    id: 4,
    name: 'Browsec',
    description: 'A major international VPN service.',
    countries: ['Worldwide', 'USA'],
    startDate: '2024-07-01',
    endDate: '2025-08-01',
    position: 'Software Engineer',
    technologies: ['React', 'TypeScript', 'Electron', 'Cypress', 'Redux'],
    isLead: false,
  },
];

export const PROJECTS = [
  {
    name: 'MegaPlan',
    description:
      'A large portal similar to a CRM for car dealers, suppliers, and contractors of AvtoVAZ',
    companyId: 1,
    isLead: false,
  },
  {
    name: 'Dealer Passport',
    description:
      'A platform with analytical data in various formats for senior managers and the General Director of AvtoVAZ',
    companyId: 1,
    isLead: true,
  },
  {
    name: 'Glasses Store Desktop',
    description:
      'An international online store with a complex architecture and a high daily user traffic (132,000 unique users per day).',
    companyId: 2,
    isLead: true,
  },
  {
    name: 'Glasses Store Mobile',
    description:
      'Mobile version of the Glasses Store Desktop. An international online store with a complex architecture and a high daily user traffic (132,000 unique users per day).',
    companyId: 2,
    isLead: true,
  },
  {
    name: 'Federal Builder Platform',
    description:
      'A global federal platform for various companies: developers, suppliers, designers, architects, builders, etc.',
    companyId: 3,
    isLead: true,
  },
  {
    name: 'VPN Browser Extension',
    description: 'Cross-browser extension with over 6 million users in the Chrome store.',
    companyId: 4,
    isLead: false,
  },
  {
    name: 'VPN Desktop App',
    description: 'Cross-platform desktop application built on Electron and React.',
    companyId: 4,
    isLead: false,
  },
];

export const OWN_PROJECTS = [
  {
    name: 'Auto Fill chrome extension',
    description:
      'Browser extension to manage application form submissions with submission window tracking and auto-fill.',
  },
  {
    name: 'Subscription Management Telegram Bot',
    description:
      'Telegram bot for managing browser extension subscriptions, including subscription key generation, payments, and more.',
  },
  {
    name: 'Life Calendar',
    description: 'Project based on the popular idea to imagine all your life by weeks.',
  },
];
