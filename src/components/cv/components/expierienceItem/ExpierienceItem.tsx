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
    const present = isPresentCompany(company);
    const end = present ? 'Present' : company.endDate ? formatDate(company.endDate) : '';
    // #region agent log
    fetch('http://127.0.0.1:7360/ingest/440c82d2-e822-49d4-884f-3df580880ffc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'109fcf'},body:JSON.stringify({sessionId:'109fcf',runId:'post-fix',hypothesisId:'A',location:'ExpierienceItem.tsx:38',message:'formatDates',data:{name:company.name,endDate:company.endDate,isPresent:present,end},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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
