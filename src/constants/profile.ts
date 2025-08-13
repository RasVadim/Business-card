export const CONTACTS = {
  mail: 'rasstriginv@gmail.com',
  phone: '+7 92777-999-30',
  linkedin: 'linkedin.com/in/vadim-ra',
  github: 'github.com/RasVadim',
};

export const FIRST_JOB_DATE = '2018-08-01';

export const COMPANIES = [
  {
    id: 'c4',
    name: 'Browsec',
    descriptionKey: 'profile.companyDescriptions.c4',
    countries: ['Worldwide', 'USA'],
    startDate: '2024-07-01',
    endDate: '2025-08-01',
    position: 'Software Engineer',
    technologies: ['React', 'TypeScript', 'Electron', 'Cypress', 'Redux'],
    image: '/images/companies/browsec.png',
    isLead: false,
  },
  {
    id: 'c3',
    name: 'ETALON GROUP',
    descriptionKey: 'profile.companyDescriptions.c3',
    countries: ['Russia'],
    startDate: '2023-08-01',
    endDate: '2024-06-01',
    position: 'Lead Frontend Engineer',
    technologies: ['React', 'TypeScript', 'Cypress', 'Tanstack Query', 'Jotai'],
    image: '/images/companies/etalon.png',
    isLead: true,
  },
  {
    id: 'c2',
    name: 'GlassesUSA.com',
    descriptionKey: 'profile.companyDescriptions.c2',
    countries: ['USA', 'Israel', 'Russia'],
    startDate: '2021-01-01',
    endDate: '2023-07-01',
    position: 'Frontend Developer',
    technologies: ['React', 'TypeScript', 'React-testing-library', 'Jest', 'Redux'],
    image: '/images/companies/glassesusa.png',
    isLead: true,
  },
  {
    id: 'c1',
    name: 'Seo-TLT',
    descriptionKey: 'profile.companyDescriptions.c1',
    countries: ['Russia'],
    startDate: '2018-08-01',
    endDate: '2020-12-01',
    position: 'Frontend Web Developer',
    technologies: ['React', 'TypeScript', 'GraphQL', 'Apollo'],
    image: '/images/companies/seo-tlt.png',
    isLead: false,
  },
];

export const PROJECTS = [
  {
    id: 'p1',
    name: 'MegaPlan',
    descriptionKey: 'profile.projectDescriptions.p1',
    companyId: 1,
    isLead: false,
  },
  {
    id: 'p2',
    name: 'Dealer Passport',
    descriptionKey: 'profile.projectDescriptions.p2',
    companyId: 1,
    isLead: true,
  },
  {
    id: 'p3',
    name: 'Glasses Store Desktop',
    descriptionKey: 'profile.projectDescriptions.p3',
    companyId: 2,
    isLead: true,
  },
  {
    id: 'p4',
    name: 'Glasses Store Mobile',
    descriptionKey: 'profile.projectDescriptions.p4',
    companyId: 2,
    isLead: true,
  },
  {
    id: 'p5',
    name: 'Federal Builder Platform',
    descriptionKey: 'profile.projectDescriptions.p5',
    companyId: 3,
    isLead: true,
  },
  {
    id: 'p6',
    name: 'VPN Browser Extension',
    descriptionKey: 'profile.projectDescriptions.p6',
    companyId: 4,
    isLead: false,
  },
  {
    id: 'p7',
    name: 'VPN Desktop App',
    descriptionKey: 'profile.projectDescriptions.p7',
    companyId: 4,
    isLead: false,
  },
];

export const OWN_PROJECTS = [
  {
    id: 'op1',
    name: 'Auto Fill chrome extension',
    descriptionKey: 'profile.ownProjectDescriptions.op1',
  },
  {
    id: 'op2',
    name: 'Subscription Management Telegram Bot',
    descriptionKey: 'profile.ownProjectDescriptions.op2',
  },
  {
    id: 'op3',
    name: 'Life Calendar',
    descriptionKey: 'profile.ownProjectDescriptions.op3',
  },
];
