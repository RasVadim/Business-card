export type TProject = {
  name: string;
  descriptionKey: string;
  companyId?: string;
  isLead?: boolean;
  icon?: string;
  video?: string;
  technologies?: THardSkill[];
};

export type TCompany = {
  name: string;
  descriptionKey: string;
  countries: string[];
  startDate: string;
  endDate: string;
  position: string;
  technologies: string[];
  projects: TProject[];
  image: string;
  isLead: boolean;
  isPM?: boolean;
};

export type THardSkill = {
  name: string;
  icon: string;
  darkIcon?: string;
  showLabel: boolean;
  descriptionKey: string;
};
