import { FC } from 'react';

import { useTranslation } from '@/hooks';
import { TCompany } from '@/types';

import { SectionItem } from '../sectionItem/SectionItem';

type TProps = {
  company: TCompany;
};

export const ExpierienceItem: FC<TProps> = ({ company }) => {
  const { t } = useTranslation();

  const formatDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    });
    const end =
      endDate === '2025-08-01'
        ? 'Present'
        : new Date(endDate).toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric',
          });
    return `${start} - ${end}`;
  };

  const formatLocation = (countries: string[]) => {
    return countries.join(', ');
  };

  const formatResponsibilities = (company: TCompany) => {
    return company.projects.map((project) => t(project.descriptionKey)).join('\n');
  };

  return (
    <SectionItem
      title={company.position}
      subtitle={company.name}
      dates={formatDates(company.startDate, company.endDate)}
      location={formatLocation(company.countries)}
      companyDescription={t(company.descriptionKey)}
      description={formatResponsibilities(company)}
    />
  );
};
