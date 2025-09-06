import { FC } from 'react';

import { COMPANIES } from '@/constants/companies';
import { useTranslation } from '@/hooks';

import { ExpierienceItem } from '../expierienceItem/ExpierienceItem';
import { Section } from '../section/Section';

export const WorkExperience: FC = () => {
  const { t } = useTranslation();

  // Sort companies by start date (newest first)
  const sortedCompanies = Object.values(COMPANIES).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <Section title={t('profile.workExperience')} hight="766px">
      {sortedCompanies.map((company, index) => (
        <ExpierienceItem key={`${company.name}-${index}`} company={company} />
      ))}
    </Section>
  );
};
