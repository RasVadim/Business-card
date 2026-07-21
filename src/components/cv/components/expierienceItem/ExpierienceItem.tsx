import { FC } from 'react';

import { COMPANIES } from '@/constants/companies';
import { useTranslation } from '@/hooks';
import { TCompany } from '@/types';

import { SectionItem } from '../sectionItem/SectionItem';

type TProps = {
  company: TCompany;
};

// Present is shown only for the most recent company (by startDate) that has no endDate
const isPresentCompany = (company: TCompany): boolean => {
  if (company.endDate) {
    return false;
  }

  const latestCompany = Object.values(COMPANIES).reduce((latest, current) =>
    new Date(current.startDate) > new Date(latest.startDate) ? current : latest,
  );

  return latestCompany.name === company.name;
};

export const ExpierienceItem: FC<TProps> = ({ company }) => {
  const { t } = useTranslation();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    });

  const formatDates = (company: TCompany) => {
    const start = formatDate(company.startDate);
    const end = isPresentCompany(company)
      ? 'Present'
      : company.endDate
        ? formatDate(company.endDate)
        : '';
    return end ? `${start} - ${end}` : start;
  };

  const formatLocation = (countries: string[]) => {
    return countries.join(', ');
  };

  const formatResponsibilities = (company: TCompany) => {
    return company.projects.map((project) => t(project.descriptionKey));
  };

  return (
    <SectionItem
      title={company.position}
      subtitle={company.name}
      dates={formatDates(company)}
      location={formatLocation(company.countries)}
      companyDescription={t(company.descriptionKey)}
      description={formatResponsibilities(company)}
    />
  );
};
