import { FC } from 'react';

import { COMPANIES } from '@/constants/companies';
import { useTranslation } from '@/hooks';

import { ExpierienceItem } from '../expierienceItem/ExpierienceItem';
import { Section } from '../section/Section';

export const WorkExperience: FC = () => {
  const { t } = useTranslation();

  return (
    <Section title={t('layout.workExperience')} hight="780px">
      {Object.values(COMPANIES).map((company, index) => (
        <ExpierienceItem key={`${company.name}-${index}`} company={company} />
      ))}
    </Section>
  );
};
