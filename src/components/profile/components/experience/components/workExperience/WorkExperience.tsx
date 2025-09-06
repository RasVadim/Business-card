import { FC, useMemo } from 'react';

import { COMPANIES } from '@/constants';
import { useTranslation } from '@/hooks';
import { WorkExperienceIcon } from '@/icons';
import { formatMonthYear } from '@/utils';

import { Section, SectionItem } from '../../..';

export const WorkExperience: FC = () => {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => {
    return Object.values(COMPANIES).map((company) => {
      return {
        title: company.position,
        company: company.name,
        period: `${formatMonthYear(company.startDate)} - ${formatMonthYear(company.endDate)}`,
        location: company.countries?.join(', '),
        description: t(company.descriptionKey),
        projects: company.projects,
        image: company.image,
        colorLess: company.isPM,
      };
    });
  }, [t, i18n.language]);

  return (
    <Section title={t('layout.workExperience')} icon={<WorkExperienceIcon />}>
      {items.map((it) => (
        <SectionItem key={`${it.company}-${it.period}`} {...it} />
      ))}
    </Section>
  );
};
